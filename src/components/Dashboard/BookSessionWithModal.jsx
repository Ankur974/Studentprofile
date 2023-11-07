import { FiX } from "react-icons/fi";
import styled from "styled-components";

import { H3 } from "@common/ui/Headings";
import { Modal } from "@common/Dashboard/Modal";
import ProviderCard from "@common/Dashboard/ProviderCard";
import FlexBox from "@common/ui/FlexBox";

const ModalHeader = styled(FlexBox)`
  padding: 1.5rem;
  justify-content: space-between;
`;

const ModalBody = styled(FlexBox)`
  height: auto;
  width: 100%;
  flex-direction: column;
  display: flex;
  flex: 1 0 0;
  align-self: stretch;
  padding: 0 1.5rem 1.5rem 1.5rem;
`;

const ProvidersList = styled(FlexBox)`
  max-height: 17rem;
  overflow: auto;
`;

const BookSessionWithModal = ({ toggleDropdown }) => {
  return (
    <Modal XS>
      <ModalHeader>
        <H3 bold>Book Session With</H3>
        <FiX cursor="pointer" onClick={toggleDropdown} />
      </ModalHeader>
      <ModalBody>
        <FlexBox column rowGap="1rem">
          <ProvidersList column rowGap="1rem">
            <ProviderCard />
            <ProviderCard />
          </ProvidersList>
        </FlexBox>
      </ModalBody>
    </Modal>
  );
};

export default BookSessionWithModal;
