import React from "react";

import Experts from "@components/Dashboard/Experts";
import DashboardLayout from "@components/Dashboard/Layout";
import { useQueryParams, StringParam, NumberParam } from "use-query-params";
import useMobileView from "../../../hooks/useMobileView";

const UserDashboard = () => {
  const isMobile = useMobileView();

  const [queryParams] = useQueryParams({
    selected: StringParam,
    providerId: NumberParam,
  });

  const { selected } = queryParams || {};

  const showLeftSection = !selected;

  return (
    <DashboardLayout
      hideHeader={isMobile && !showLeftSection}
      hideFooter={!showLeftSection}
      hideChat
      title="My Salons"
    >
      <Experts />
    </DashboardLayout>
  );
};
export default UserDashboard;
