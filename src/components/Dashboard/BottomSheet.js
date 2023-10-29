import React, { useState } from "react";
import styled from "styled-components";
import { WHITE, PRIMARY_800 } from "@common/ui/colors";

const Container = styled.div`
  background-color: ${WHITE};
  margin-top: 2rem;
  padding-bottom: 0.25rem;
  height: fit-content;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  animation-fill-mode: forwards;
  width: 100vw;
`;

const BarContainer = styled.div`
  width: 100%;
  height: 20px;
  position: sticky;
  top: 0;
  background-color: ${WHITE};
  display: grid;
  place-items: center;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const DraggingBar = styled.div`
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background-color: ${PRIMARY_800};
`;

const BottomSheet = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const [initialPosition, setInitialPosition] = useState(45);
  const [openedPosition, setOpenedPosition] = useState(10);

  return (
    <Container>
      <BarContainer>
        <DraggingBar onClick={() => setOpened(!opened)} />
      </BarContainer>
      {children}
    </Container>
  );
};

export default BottomSheet;
