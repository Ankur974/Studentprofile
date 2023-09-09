import Bugsnag from "@bugsnag/js";
import { useEffect, useState } from "react";
import URL from "../urls";
import axiosInstance from "../axiosInstance";

const useToolTypes = () => {
  const [toolTypes, setToolTypes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get(URL.toolTypes);
        setToolTypes(res?.data?.data || []);
      } catch (err) {
        Bugsnag.notify(err);
      }
    })();

    return () => {};
  }, []);

  return toolTypes;
};

export default useToolTypes;
