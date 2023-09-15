import React from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";

import { Modal } from "@common/Modal";
import { FlexBox } from "@common/FlexBox";
import { H4, H5 } from "@common/Headings";

const MethodImg = styled.img`
  height: 5rem;
  width: 5rem;
  @media screen and (max-width: 768px) {
    height: 5.75rem;
    width: 5.75rem;
  }
`;

const Container = styled.div`
  /* max-width: 25rem; */
  /* margin: auto; */
  @media screen and (max-width: 768px) {
    max-height: 15rem;
    padding-right: 0.75rem;
  }
`;

const MethodWrapper = styled.div`
  overflow: auto;
  margin: 0.5rem 1rem 1.5rem;
  max-height: 30rem;
  width: 30rem;
`;

const ModalBody = styled(FlexBox)`
  /* padding: 0 2rem 6rem; */
  @media screen and (max-width: 768px) {
    /* padding: 0 0 2rem; */
  }
`;

const SelectedMethodModal = ({ isMobile, toggleModal, selectedMethod }) => {
  return (
    <Modal
      scrollbar={false}
      togglePopup={toggleModal}
      isMobile={isMobile}
      showFooter={false}
    >
      <MethodWrapper className="custom-scrollbar">
        <FlexBox margin="0 0 2.5rem">
          <MethodImg src={selectedMethod?.img} />
        </FlexBox>
        <ModalBody column rowGap="1.5rem">
          <H4 bold>What is {selectedMethod?.name}?</H4>
          <Container>
            <H5 textAlign="justify">
              {ReactHtmlParser(selectedMethod?.description)}
            </H5>
            {/* <H5
              textAlign="justify"
              dangerouslySetInnerHTML={{ __html: selectedMethod?.description }}
            /> */}
          </Container>
        </ModalBody>
      </MethodWrapper>
    </Modal>
  );
};

export default SelectedMethodModal;
