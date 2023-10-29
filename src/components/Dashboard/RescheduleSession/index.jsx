import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Bugsnag from "@bugsnag/js";
import styled from "styled-components";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FiX } from "react-icons/fi";

import axiosInstance from "@axiosInstance";
import urls from "@urls";
import { Modal } from "@common/Dashboard/Modal";
import FlexBox from "@common/ui/FlexBox";
import { DAVYS_GREY_400, WHITE } from "@common/ui/colors";
import { formatSlotTime } from "@utils/helpers";
import { Button } from "@common/Dashboard/Buttons";
import { Body2, H3 } from "@common/Dashboard/Headings";
import { Loader } from "@common/Loader";

const CheckAvailableSlots = dynamic(() => import("../Availability"), {
  loading: () => <Loader />,
  ssr: false,
});

const ClientInfo = dynamic(() => import("./ClientInfo"), {
  loading: () => <Loader />,
  ssr: false,
});

const ReasonSelector = dynamic(() => import("./ReasonSelector"), {
  loading: () => <Loader />,
  ssr: false,
});

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
`;

const ModalHeader = styled(FlexBox)`
  padding: 1rem 1rem 1rem 1.5rem;
  justify-content: space-between;
  border-bottom: 1px solid ${DAVYS_GREY_400};
`;

const CloseIconWrapper = styled(FlexBox)`
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ModalBody = styled(FlexBox)`
  height: calc(100% - 4rem);
  @media screen and (max-width: 768px) {
    flex-direction: column;
    overflow-y: scroll;
  }
`;

const HideDesktop = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 1.5rem 7rem;
    gap: 2rem;
  }
`;

const HideMobile = styled.div`
  width: 100%;
  display: flex;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const ModalFooter = styled(FlexBox)`
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  align-self: flex-end;
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid ${DAVYS_GREY_400};
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  z-index: 5;
  background-color: ${WHITE};
  height: 5rem;
`;

const Left = styled(FlexBox)`
  height: 100%;
  padding: 1rem 1.5rem 6rem;
  flex: 1;
  max-width: 18rem;
  border-right: 1px solid ${DAVYS_GREY_400};
  overflow-y: scroll;

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

const Right = styled(FlexBox)`
  width: 100%;
  height: 100%;
  max-width: 27rem;
  padding: 1.5rem 1.5rem 6.5rem;
  flex: 1;

  @media screen and (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

// Constants
const PROVIDER_UUID = "3aec3bc9-6da6-4097-a095-08bb2a682446"; // Replace with the correct UUID
const selectedDuration_duration = 3000;

const RescheduleSession = ({
  bookingDetails,
  toggleModal,
  reloadSessionList,
}) => {
  const initialReason = {
    value: "--not selected--",
    label: "--Not Selected--",
  };

  const [schedules, setSchedules] = useState(null);
  const [cancellationReasonText, setCancellationReasonText] = useState(null);
  const [reasonValue, setReasonValue] = useState(initialReason);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [fetchingSchedules, setFetchingSchedules] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [timeSlotsForDate, setTimeSlotsForDate] = useState(null);
  const [fetchingTimeSlots, setFetchingTimeSlots] = useState(false);

  useEffect(() => {
    fetchSchedulesForDuration();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setSelectedTimeSlot(null);
      fetchTimeSlotsForDate();
    }
  }, [selectedDate]);

  const fetchSchedulesForDuration = async () => {
    if (!PROVIDER_UUID || !selectedDuration_duration) return;

    try {
      setFetchingSchedules(true);
      const payload = {
        end_date: null,
        start_date: null,
        duration: selectedDuration_duration,
      };

      // if (isBookingTypeOffline && !!clinic_id) payload.ih_clinic_id = clinic_id;

      const res = await axiosInstance.post(
        `${urls.api}/customers/schedules/${PROVIDER_UUID}/schedules_count`,
        payload
      ); // Todo : update with actual api

      const schedules = res.data?.data;

      if (!selectedDate) {
        let latestAvailableDate = new Date();
        const latestAvailableSchedule = schedules?.find(
          schedule => schedule.available_slots > 0
        );

        if (latestAvailableSchedule) {
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
    if (!PROVIDER_UUID || !selectedDuration_duration || !selectedDate) return;

    try {
      setFetchingTimeSlots(true);
      const payload = {
        duration: selectedDuration_duration,
        date: dayjs(selectedDate).format("YYYY-MM-DD"),
      };

      // if (isBookingTypeOffline && !!clinic_id) payload.ih_clinic_id = clinic_id;

      const res = await axiosInstance.post(
        `${urls.api}/customers/schedules/${PROVIDER_UUID}/schedules_date`,
        payload
      ); // Todo : update with actual api

      const timeSlots = res?.data?.data?.slots;
      setTimeSlotsForDate(timeSlots || []);
    } catch (err) {
      Bugsnag.notify(err);
    } finally {
      setFetchingTimeSlots(false);
    }
  };

  const handleRescheduleSession = () => {
    // dispatch(
    //   SessionReschedule({
    //     bookingId: bookingId,
    //     payload,
    //     analyticPayload: {
    //       event: "session_reschedule_success",
    //       payload: {
    //         [`${userType}_name`]: userName,
    //         [`${userType}_uuid`]: userUUID,
    //       },
    //     },
    //   })
    // );
    setTimeout(() => {
      reloadSessionList();
    }, 1000);

    toggleModal?.();
  };

  const isCTADisabled = !(
    selectedDate &&
    selectedTimeSlot &&
    reasonValue?.value !== initialReason?.value
  );

  return (
    <Modal M1 borderRadius="1rem" togglePopup={toggleModal}>
      <Wrapper>
        <ModalHeader>
          <H3 bold>Reschedule Session</H3>
          <CloseIconWrapper onClick={toggleModal}>
            <FiX />
          </CloseIconWrapper>
        </ModalHeader>
        <ModalBody>
          <HideMobile>
            <Left column rowGap="1.5rem" className="hide-scrollbar">
              <ClientInfo bookingDetails={bookingDetails} />
              <ReasonSelector
                cancellationReasonText={cancellationReasonText}
                setCancellationReasonText={setCancellationReasonText}
                reasonValue={reasonValue}
                setReasonValue={setReasonValue}
              />
            </Left>
            <Right column rowGap="1.5rem">
              <CheckAvailableSlots
                sectionTitle="Reschedule to"
                schedules={schedules}
                selectedDate={selectedDate}
                commonAnalyticsPayload={null}
                setSelectedDate={setSelectedDate}
                selectedTimeSlot={selectedTimeSlot}
                timeSlotsForDate={timeSlotsForDate}
                fetchingSchedules={fetchingSchedules}
                fetchingTimeSlots={fetchingTimeSlots}
                setSelectedTimeSlot={setSelectedTimeSlot}
              />
            </Right>
          </HideMobile>
          <HideDesktop>
            <ClientInfo bookingDetails={bookingDetails} />
            <CheckAvailableSlots
              sectionTitle="Reschedule to"
              schedules={schedules}
              selectedDate={selectedDate}
              commonAnalyticsPayload={null}
              setSelectedDate={setSelectedDate}
              selectedTimeSlot={selectedTimeSlot}
              timeSlotsForDate={timeSlotsForDate}
              fetchingSchedules={fetchingSchedules}
              fetchingTimeSlots={fetchingTimeSlots}
              setSelectedTimeSlot={setSelectedTimeSlot}
            />
            <ReasonSelector
              cancellationReasonText={cancellationReasonText}
              setCancellationReasonText={setCancellationReasonText}
              reasonValue={reasonValue}
              setReasonValue={setReasonValue}
            />
          </HideDesktop>
        </ModalBody>
        <ModalFooter>
          {selectedTimeSlot && (
            <Body2 bold>
              Reschedule to {dayjs(selectedDate).format("DD MMM YYYY")},{" "}
              {formatSlotTime(selectedTimeSlot)}
            </Body2>
          )}
          <Button
            primary
            onClick={handleRescheduleSession}
            disabled={isCTADisabled}
          >
            CONFIRM CHANGES
          </Button>
        </ModalFooter>
      </Wrapper>
    </Modal>
  );
};

export default RescheduleSession;
