import dayjs from "dayjs";
import Bugsnag from "@bugsnag/js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../axiosInstance";
import { addToast } from "../Store/Actions";
import { saveBseMetaInfo } from "../Store/Actions/bseActions";
import { StringParam, NumberParam, useQueryParam } from "use-query-params";
import URL from "../urls";
import { useParams } from "react-router-dom";
import { trackEvent } from "../helperFunctions";

const useBseMetaInfo = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [client_id] = useQueryParam("client_id", NumberParam);
  const [requested_date] = useQueryParam("requested_date", StringParam);
  const { id } = useParams();

  const usertype = useSelector(state => state.auth.user?.usertype);
  const provider = useSelector(state => state?.provider?.providerProfile);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const params = {};
        if (id) {
          params.booking_id = id;
        } else if (client_id) {
          params.client_id = client_id;
        } else if (requested_date) {
          params.requested_date = requested_date;
        } else {
          throw new Error("No params found for BSE Modal");
        }
        const res = await axiosInstance.get(URL.bseMetaInfo, { params });
        dispatch(saveBseMetaInfo(res?.data?.data));

        /**
         * requested_date will come from notification only, hence added this event here,
         * instead of fetch meta info in notifications.
         */
        if (requested_date) {
          trackEvent({
            event: "tools_notif_click",
            payload: {
              provider_type: usertype,
              provider_uuid: provider?.uuid,
              no_of_clients: res?.data?.data?.length || 0,
              date: dayjs(requested_date).format("YYYY-MM-DD"),
              provider_name: `${provider?.firstname || ""} ${
                provider?.lastname || ""
              }`?.trim(),
            },
          });
        }
      } catch (err) {
        Bugsnag.notify(err);
        dispatch(
          addToast({
            msg: "Error fetching information for BSE Tools",
            appearance: "error",
            autoDismiss: false,
          })
        );
      } finally {
        setLoading(false);
      }
    })();

    return () => {};
  }, []);

  return { loading };
};

export default useBseMetaInfo;
