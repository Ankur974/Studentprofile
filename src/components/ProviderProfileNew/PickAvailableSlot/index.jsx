import dayjs from "dayjs";
import Link from "next/link";
import Bugsnag from "@bugsnag/js";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Button } from "@common/Buttons";
import FlexBox from "@common/ui/FlexBox";
import CheckAvailableSlots from "./CheckAvailableSlots";
import SelectSessionDuration from "./SelectSessionDuration";

import urls from "@urls";
import axiosInstance from "@axiosInstance";

import * as storage from "@utils/storageFactory";
import { trackEvent, currentFlow, isStringNullable } from "@utils/helpers";
import {
  THERAPIST,
  THERAPIST_KEY,
  PSYCHIATRIST_KEY,
  CF_PROVIDER_ROLE,
} from "../../../constants";

const Wrapper = styled(FlexBox)`
  width: 100%;
  row-gap: 1.75rem;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;

  * {
    box-sizing: border-box;
  }

  @media only screen and (max-width: 768px) {
    row-gap: 2.5rem;

    ${Button} {
      width: 100%;
    }
  }
`;

const PickAvailableSlot = ({
  sessionMode,
  providerData,
  providerType,
  clinicId,
}) => {
  const router = useRouter();
  const bookingData = JSON.parse(storage.session.getItem("bookingData"));
  const packageData = JSON.parse(
    storage.session.getItem("suggestedSessionPackage")
  );
  const firebaseUser = useSelector(state => state.auth?.firebaseUser);
  const user = useSelector(state => state.auth?.user);
  const isSameProvider = bookingData?.providerUuid === providerData?.uuid;

  const [allowStateChange, setAllowStateChange] = useState(false);
  const [offeredDurations, setOfferedDurations] = useState(null);
  const [fetchingOfferedDurations, setFetchingOfferedDurations] =
    useState(false);
  const [selectedDuration, setSelectedDuration] = useState(() => {
    if (!!bookingData?.duration && isSameProvider) {
      return bookingData?.duration;
    }
    return null;
  });

  const [fetchingAvailablePackages, setFetchingAvailablePackages] =
    useState(false);
  const [selectedPackage, setSelectedPackage] = useState(packageData || null);

  const [schedules, setSchedules] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    if (!!bookingData?.date && isSameProvider) {
      return bookingData?.date;
    }
    return null;
  });
  const [fetchingSchedules, setFetchingSchedules] = useState(false);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [timeSlotsForDate, setTimeSlotsForDate] = useState(null);
  const [fetchingTimeSlots, setFetchingTimeSlots] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState(null);

  const { sessionType, journey } = router.query || {};
  const clinic_id = clinicId || providerData?.offline_offering?.[0]?.clinic?.id;
  const isCoupleSession = sessionType === "couple";
  const isBookingTypeOffline = sessionMode?.bookingType === "offline";

  const type = providerType?.toLowerCase();
  const flow = currentFlow(type, sessionType || "single");
  const payload = {
    flow,
    view: "profile_section",
    expt_variant: "new_page",
    [`${type}_uuid`]: providerData?.uuid,
    [`${type}_name`]: `${providerData?.firstname || ""} ${
      providerData?.lastname || ""
    }`.trim(),
  };

  const providerKey =
    providerType === THERAPIST ? THERAPIST_KEY : PSYCHIATRIST_KEY;
  const isCfProvider = providerData?.roles?.includes(CF_PROVIDER_ROLE);

  // Checks if a CF provider is already assigned and the user is trying to book a session again from profile page
  const isCfRepeatBooking =
    isCfProvider && user?.[providerKey] === providerData?.id;

  useEffect(() => {
    if (router.isReady) getSelectedLocation();
  }, [router.isReady, sessionMode?.bookingType]);

  useEffect(() => {
    if (router.isReady && !!sessionMode?.bookingType) {
      fetchOfferedDurations();
    }
  }, [router.isReady, sessionMode?.bookingType, clinicId]);

  useEffect(() => {
    if (!!selectedDuration?.duration && !!sessionMode?.bookingType) {
      fetchPackagesForDuration();
      fetchSchedulesForDuration();
    }
  }, [selectedDuration, sessionMode?.bookingType, clinicId]);

  useEffect(() => {
    if (
      !!selectedDate &&
      !!sessionMode?.bookingType &&
      !!selectedDuration?.duration
    ) {
      setSelectedTimeSlot(null);
      fetchTimeSlotsForDate();
    }
  }, [selectedDate, selectedDuration, sessionMode?.bookingType, clinicId]);

  useEffect(() => {
    if (!!bookingData && bookingData?.providerUuid !== providerData?.uuid) {
      storage.session.removeItem("bookingData");
      storage.session.removeItem("suggestedSessionPackage");
    }
  }, []);

  useEffect(() => {
    if (!!sessionMode?.bookingType) {
      // hacky solution to prevent state change first time on mount
      if (!!allowStateChange) {
        setSelectedDate(null);
        setSelectedDuration(null);
      }
      setAllowStateChange(true);
    }
  }, [sessionMode?.bookingType]);

  const fetchOfferedDurations = async () => {
    if (!providerData?.uuid) return;

    try {
      setFetchingOfferedDurations(true);
      const params = { for_couple: isCoupleSession };

      if (isBookingTypeOffline && !!clinic_id) params.ih_clinic_id = clinic_id;

      const res = await axiosInstance.get(
        `${urls.api}/customers/providers/${providerData.uuid}/offered_durations`,
        { params }
      );

      let offeredDurations = res?.data?.data || [];
      setOfferedDurations(offeredDurations);
    } catch (err) {
      Bugsnag.notify(err);
    } finally {
      setFetchingOfferedDurations(false);
    }
  };

  const fetchPackagesForDuration = async () => {
    if (!providerData?.uuid || !selectedDuration) return;

    try {
      setFetchingAvailablePackages(true);
      const params = {
        for_couple: isCoupleSession,
        duration: selectedDuration?.duration,
        coupon_code: "FIRSTSESSION",
      };

      if (isBookingTypeOffline && !!clinic_id) params.ih_clinic_id = clinic_id;

      const res = await axiosInstance.get(
        `${urls.api}/customers/providers/${providerData.uuid}/offered_packages`,
        { params }
      );

      const packages = res.data?.data || [];
      const OneSessionPackage = packages?.find(
        ({ livesessions }) => livesessions === 1
      );

      setSelectedPackage(OneSessionPackage);
    } catch (err) {
      Bugsnag.notify(err);
    } finally {
      setFetchingAvailablePackages(false);
    }
  };

  const fetchSchedulesForDuration = async () => {
    if (!providerData?.uuid || !selectedDuration?.duration) return;

    try {
      setFetchingSchedules(true);
      const payload = {
        end_date: null,
        start_date: null,
        duration: selectedDuration?.duration,
      };

      if (isBookingTypeOffline && !!clinic_id) payload.ih_clinic_id = clinic_id;

      const res = await axiosInstance.post(
        `${urls.api}/customers/schedules/${providerData?.uuid}/schedules_count`,
        payload
      );

      const schedules = res.data?.data;

      if (!selectedDate) {
        let latestAvailableDate = new Date();
        const latestAvailableSchedule = schedules?.find(
          schedule => schedule.available_slots > 0
        );

        if (!!latestAvailableSchedule) {
          const latestScheduleTime = latestAvailableSchedule.epoch_time;
          latestAvailableDate = new Date(latestScheduleTime);
        }

        setSelectedDate(latestAvailableDate);
      }

      setSchedules(schedules || []);
    } catch (err) {
      Bugsnag.notify(err);
    } finally {
      setFetchingSchedules(false);
    }
  };

  const fetchTimeSlotsForDate = async () => {
    if (!providerData?.uuid || !selectedDuration?.duration || !selectedDate)
      return;

    try {
      setFetchingTimeSlots(true);
      const payload = {
        duration: selectedDuration?.duration,
        date: dayjs(selectedDate).format("YYYY-MM-DD"),
      };

      if (isBookingTypeOffline && !!clinic_id) payload.ih_clinic_id = clinic_id;

      const res = await axiosInstance.post(
        `${urls.api}/customers/schedules/${providerData?.uuid}/schedules_date`,
        payload
      );

      const timeSlots = res?.data?.data?.slots;
      setTimeSlotsForDate(timeSlots || []);
    } catch (err) {
      Bugsnag.notify(err);
    } finally {
      setFetchingTimeSlots(false);
    }
  };

  const getSelectedLocation = () => {
    try {
      if (isBookingTypeOffline && !!clinic_id && !!providerData) {
        const selectedLocation = providerData?.offline_offering?.filter(
          object => object?.clinic?.id == clinic_id
        )?.[0]?.clinic?.location?.city;
        setSelectedLocation(selectedLocation);
      } else {
        setSelectedLocation("null");
      }
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const saveDataOnClick = () => {
    try {
      const bookingData = {
        date: selectedDate,
        slot: selectedTimeSlot,
        duration: selectedDuration,
        mode: sessionMode?.bookingSlug,
        providerUuid: providerData?.uuid,
      };

      const stringifiedData = JSON.stringify(bookingData);
      const stringifiedPackage = JSON.stringify(selectedPackage);

      if (!isStringNullable(stringifiedData)) {
        storage.session.setItem("bookingData", stringifiedData);
      }
      if (!isStringNullable(stringifiedPackage)) {
        storage.session.setItem("suggestedSessionPackage", stringifiedPackage);
      }
    } catch (err) {
      Bugsnag.notify(err);
    }
  };

  const packageProceedTracker = () => {
    trackEvent({
      event: `${type}_package_proceed`,
      payload: {
        ...payload,
        expt_variant: "new_page",
        journey: journey || "new",
        package_type: selectedPackage?.title,
        course: firebaseUser?.currentCourseName || "null",
        package_duration: selectedPackage?.sessionduration / 60,
        tab_selected: isBookingTypeOffline ? "in-person" : "virtual",
        session_mode: isBookingTypeOffline
          ? "offline"
          : sessionMode?.bookingSlug,
        selected_location: selectedLocation,
      },
    });
  };

  return (
    <Wrapper>
      <SelectSessionDuration
        selectedPackage={selectedPackage}
        offeredDurations={offeredDurations}
        selectedDuration={selectedDuration}
        setSelectedPackage={setSelectedPackage}
        setSelectedDuration={setSelectedDuration}
        fetchingOfferedDurations={fetchingOfferedDurations}
        fetchingAvailablePackages={fetchingAvailablePackages}
      />

      <CheckAvailableSlots
        schedules={schedules}
        selectedDate={selectedDate}
        commonAnalyticsPayload={payload}
        setSelectedDate={setSelectedDate}
        selectedTimeSlot={selectedTimeSlot}
        timeSlotsForDate={timeSlotsForDate}
        fetchingSchedules={fetchingSchedules}
        fetchingTimeSlots={fetchingTimeSlots}
        setSelectedTimeSlot={setSelectedTimeSlot}
      />

      <Link
        href={{
          pathname: `/booking/${providerData?.uuid}/${providerType}/${
            sessionType || "single"
          }`,
          query: {
            slot: selectedTimeSlot,
            mode: sessionMode?.bookingSlug,
            date: dayjs(selectedDate).format("DD-MM-YYYY"),
            ...(isBookingTypeOffline && !!clinic_id && { clinic_id }),
          },
        }}
      >
        <Button
          disabled={
            !selectedDate ||
            !selectedTimeSlot ||
            !providerData?.uuid ||
            !selectedDuration?.duration ||
            isCfRepeatBooking // CF user can't book another session with their assigned CF provider
          }
          onClick={() => {
            saveDataOnClick();
            packageProceedTracker();
          }}
        >
          PROCEED
        </Button>
      </Link>
    </Wrapper>
  );
};

export default PickAvailableSlot;
