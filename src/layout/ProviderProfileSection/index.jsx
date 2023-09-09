import React from "react";
import styled from "styled-components";
import { boxShadowDs1 } from "../../../components/common/UI/styles";
import {
  DAVYS_GREY_100,
  DAVYS_GREY_300,
} from "../../../components/common/colors";
import ProfileSidebar from "../../components/ProviderProfile/ProfileSidebar";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${DAVYS_GREY_300};
  padding: 1.5rem;
  overflow-x: hidden;
`;

const Main = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: calc(30% - 0.75rem) calc(70% - 0.75rem) calc(
      40% - 0.75rem
    );
  grid-template-rows: 100%;
  column-gap: 1.5rem;
  transform: translateX(0%);
  transition: all 500ms ease-in-out;
`;

const LeftSection = styled.div`
  min-width: 15rem;
  background-color: ${DAVYS_GREY_100};
  border-radius: 1rem;
  overflow: hidden;
  transition: all 500ms ease-in-out;
  ${boxShadowDs1}
`;

const CenterSection = styled.div`
  min-width: 42rem;
  background-color: ${DAVYS_GREY_100};
  border-radius: 1rem;
  ${boxShadowDs1}
  overflow: auto;
`;

const ProviderProfileLayout = ({ component: Component }) => {
  return (
    <Container>
      <Main>
        <LeftSection>
          <ProfileSidebar />
        </LeftSection>
        <CenterSection className="hide-scrollbar">
          <Component />
        </CenterSection>
      </Main>
    </Container>
  );
};

export default ProviderProfileLayout;
