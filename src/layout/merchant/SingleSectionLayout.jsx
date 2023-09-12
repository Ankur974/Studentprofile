import React from "react";
import styled from "styled-components";
import FlexBox from "../../components/common/FlexBox";
import { ACCENT_100, ACCENT_300 } from "../../components/common/colors";
import { boxShadowDs1 } from "../../components/common/UI/styles";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  background-color: ${ACCENT_300};
`;

const Main = styled(FlexBox)`
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: ${ACCENT_100};
  border-radius: 1rem;
  ${boxShadowDs1}
`;

const SingleSectionLayout = ({ children }) => {
  return (
    <Container>
      <Main>{children}</Main>
    </Container>
  );
};

export default SingleSectionLayout;
