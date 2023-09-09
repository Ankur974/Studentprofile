import React from "react";
import styled from "styled-components";
import { boxShadowDs1 } from "../../../components/common/UI/styles";
import ClientsList from "../../components/Clients/ClientsList";
import FlexBox from "../../../components/common/FlexBox";
import {
  DAVYS_GREY_100,
  DAVYS_GREY_300,
} from "../../../components/common/colors";

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  column-gap: 1.5rem;
  background-color: ${DAVYS_GREY_300};
`;

const LeftSection = styled.div`
  width: 30%;
  min-width: 15rem;
  background-color: ${DAVYS_GREY_100};
  border-radius: 1rem;
  ${boxShadowDs1}
`;

const RightSection = styled.div`
  width: 70%;
  min-width: 42rem;
  background-color: ${DAVYS_GREY_100};
  border-radius: 1rem;
  overflow-y: auto;
  ${boxShadowDs1}
`;

const WithoutHeader = ({ children }) => {
  return (
    <Container>
      <LeftSection>
        <ClientsList />
      </LeftSection>
      <RightSection className="hide-scrollbar">{children}</RightSection>
    </Container>
  );
};

export default WithoutHeader;
