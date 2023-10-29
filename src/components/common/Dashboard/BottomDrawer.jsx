import { useRef } from "react";
import styled from "styled-components";

import { boxShadowDs1 } from "@common/Dashboard/boxShadowStyles";
import FlexBox from "@common/ui/FlexBox";
import { DAVYS_GREY_400, WHITE } from "@common/ui/colors";
import useOutsideAlert from "@hooks/useOutsideAlert";
import { Body2 } from "./Headings";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  border-radius: 1rem 1rem 0rem 0rem;
  border: 1px solid ${DAVYS_GREY_400};
  background: ${WHITE};
  ${boxShadowDs1}
  z-index: 5;
`;

const DrawerContent = styled(FlexBox)`
  max-height: 42vh;
  overflow: auto;
`;

const Title = styled.div`
  margin-bottom: 1rem;
`;

const BottomDrawer = ({ title, children, toggleBottomDrawer }) => {
  const containerRef = useRef(null);
  useOutsideAlert(containerRef, toggleBottomDrawer);

  return (
    <Container>
      <Wrapper ref={containerRef}>
        {title && (
          <Title>
            <Body2 bold>{title}</Body2>
          </Title>
        )}
        <DrawerContent column justify="space-around" rowGap="1rem">
          {children}
        </DrawerContent>
      </Wrapper>
    </Container>
  );
};

export default BottomDrawer;
