import React from "react";
import ClientDetails from "@components/ClientDetails";
import DashboardLayout from "@components/Dashboard/Layout";
import styled from "styled-components";
import { ACCENT_0 } from "@components/common/ui/colors";
import FlexBox from "@components/common/ui/FlexBox";
import { device } from "@components/common/ui/Responsive";

const Container = styled(FlexBox)`
  width: 100%;
  padding: 1rem 0rem 0rem 1rem;
  border-radius: 5rem;
  background-color: ${ACCENT_0};
  @media ${device.laptop} {
    padding: 1.5rem;
  }
`;

const ClientProfile = () => {
  return (
    <DashboardLayout>
      <Container>
        <ClientDetails />
      </Container>
    </DashboardLayout>
  );
};
export default ClientProfile;
