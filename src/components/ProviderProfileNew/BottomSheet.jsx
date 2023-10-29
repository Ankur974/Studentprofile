import React from "react";
import { FiX } from "react-icons/fi";
import styled, { keyframes } from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { H4, H5 } from "@common/Headings";
import { ACCENT_800, WHITE } from "../../constants/colors";

const MethodImg = styled.img`
  height: 5rem;
  width: 5rem;
`;

const Container = styled.div``;

const MethodWrapper = styled.div`
  overflow-y: scroll;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const openAnimation = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const closeAnimation = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2899;
`;

const BottomSheetContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80vh;
  background-color: ${WHITE};
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  z-index: 3000;
  /* animation: ${({ isOpen }) =>
    isOpen ? openAnimation : closeAnimation} 0.3s
    ease-in-out; */
`;

const CloseButton = styled(FlexBox)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 4000;
`;

const BottomSheet = ({ isOpen, toggleModal, selectedMethod }) => {
  const toggleBottomSheet = () => {
    toggleModal();
  };

  return (
    <>
      {isOpen && <Overlay onClick={toggleBottomSheet} />}
      <BottomSheetContainer isOpen={isOpen}>
        <CloseButton onClick={toggleBottomSheet}>
          <FiX color={ACCENT_800} />
        </CloseButton>
        <MethodWrapper>
          <FlexBox margin="0 0 2.5rem">
            <MethodImg src={selectedMethod?.img} />
          </FlexBox>
          <FlexBox column rowGap="1.5rem">
            <H4 bold>What is {selectedMethod?.name}?</H4>
            <Container>
              <H5
                textAlign="justify"
                dangerouslySetInnerHTML={{
                  __html: selectedMethod?.description,
                }}
              />
            </Container>
          </FlexBox>
        </MethodWrapper>
      </BottomSheetContainer>
    </>
  );
};

export default BottomSheet;
