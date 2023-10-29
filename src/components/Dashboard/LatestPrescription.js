import React from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { Text } from "@common/Text";
import { ACCENT_600, ACCENT_200, SECONDARY_700 } from "@common/ui/colors";
import { FiDownload } from "react-icons/fi";

const Container = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const PrescriptionCard = styled.div`
  background-color: ${ACCENT_200};
  border: 1px solid ${SECONDARY_700};
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 768px) {
    width: auto;
  }
`;

const PrescriptionText = styled.div``;

const Image = styled.img`
  width: 1.4rem;
  margin-left: auto;
  cursor: pointer;
`;

const LatestPrescription = ({ prescription, onClick, handleDownload }) => {
  const prescriptionName = `P${prescription?.user_prescription_id} - ${prescription?.global_prescription_id}`;
  return (
    <Container>
      <Text fontSize="1rem" bold margin="0 0 1.5rem" block>
        Latest Prescription
      </Text>
      <Wrapper>
        <PrescriptionCard>
          <PrescriptionText>
            <Text fontSize="0.75rem" block color={ACCENT_600}>
              {dayjs(prescription?.created_at)?.format("DD/MM/YYYY")}
            </Text>
            <Text fontSize="1rem" bold block margin="0.75rem 0 0 0">
              {prescriptionName}
            </Text>
          </PrescriptionText>
          <div onClick={() => handleDownload(prescription?.file)}>
            <FiDownload
              color={SECONDARY_700}
              size="1.5rem"
              cursor="pointer"
              onClick={onClick}
            />
          </div>
        </PrescriptionCard>
      </Wrapper>
    </Container>
  );
};

export default LatestPrescription;
