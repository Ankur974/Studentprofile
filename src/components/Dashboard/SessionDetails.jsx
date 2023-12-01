import { FiDownload, FiX } from "react-icons/fi";
import styled from "styled-components";
import { BooleanParam, StringParam, useQueryParams } from "use-query-params";

import { IconButton } from "@common/Dashboard/Buttons";
import { Body2, H3 } from "@common/ui/Headings";
import { Modal } from "@common/Dashboard/Modal";
import FlexBox from "@common/ui/FlexBox";
import { ACCENT_400, PRIMARY_500, ERROR, SUCCESS } from "@common/ui/colors";

const Section = styled(FlexBox)`
  width: 100%;
`;

const Content = styled(FlexBox)`
  padding: 1.5rem 1.5rem 0 1.5rem;
  width: 100%;
`;

const Title = styled(FlexBox)`
  padding: 1.5rem;
  border-bottom: 1px solid ${ACCENT_400};
`;

const ActionCTAWrapper = styled(FlexBox)`
  width: 100%;
  padding: 1rem;
  justify-content: center;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 0.875rem 0;
  background-color: ${ACCENT_400};
`;

const SessionDetails = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, setQueryParams] = useQueryParams({
    showSessionDetailsModal: BooleanParam,
    bookingId: StringParam,
  });

  const handleClick = () => {
    alert("Download");
  };

  const handleOnClose = () => {
    const params = {
      showSessionDetailsModal: null,
      bookingId: null,
    };
    setQueryParams(params, "replaceIn");
  };

  return (
    <Modal M2>
      <FlexBox column align="center">
        <Section column>
          <Title justify="space-between" align="center">
            <H3 bold>Session Details</H3>
            <FiX cursor="pointer" onClick={handleOnClose} />
          </Title>
          <Content column rowGap="1rem">
            <FlexBox column rowGap="0.5rem">
              <Body2 margin="0 0 0.5rem 0" bold>
                Booking Details
              </Body2>
              <FlexBox justify="space-between" align="center">
                <Body2>Booking created on</Body2>
                <Body2 bold>01 Jan 2023, 11:48 AM</Body2>
              </FlexBox>
              <FlexBox justify="space-between" align="center">
                <Body2>Booking ID</Body2>
                <Body2 bold>#234567</Body2>
              </FlexBox>
              <FlexBox justify="space-between" align="center">
                <Body2>Session rescheduled on</Body2>
                <Body2 bold>07 Jan 2023, 07:16 PM</Body2>
              </FlexBox>
              <FlexBox justify="space-between" align="center">
                <Body2>Session mode changed on</Body2>
                <Body2 bold>07 Jan 2023, 07:16 PM</Body2>
              </FlexBox>
              <FlexBox justify="space-between" align="center">
                <Body2 color={ERROR}>Cancelled on</Body2>
                <Body2 color={ERROR} bold>
                  10 Jan 2023, 07:16 PM
                </Body2>
              </FlexBox>
            </FlexBox>

            <FlexBox column rowGap="0.5rem">
              <Body2 margin="0 0 0.5rem 0" bold>
                Payment Details
              </Body2>
              <FlexBox justify="space-between" align="center">
                <Body2>Transaction ID</Body2>
                <Body2 bold>123456789</Body2>
              </FlexBox>
              <FlexBox justify="space-between" align="center">
                <Body2>Booking Amount</Body2>
                <Body2 bold>₹1500</Body2>
              </FlexBox>
              <FlexBox justify="space-between" align="center">
                <Body2>Credits used</Body2>
                <Body2 bold>1</Body2>
              </FlexBox>
              <FlexBox justify="space-between" align="center">
                <Body2>Coupon discount (FIRSTSESSION50)</Body2>
                <Body2 bold>-₹750</Body2>
              </FlexBox>
              <Divider />
              <FlexBox justify="space-between" align="center">
                <Body2 bold>Amount Paid</Body2>
                <Body2 bold>₹0</Body2>
              </FlexBox>
              <FlexBox justify="space-between" align="center">
                <Body2>Refund amount</Body2>
                <Body2 bold>₹750</Body2>
              </FlexBox>
              <FlexBox justify="space-between" align="center">
                <Body2>Refund status</Body2>
                <Body2 bold color={PRIMARY_500}>
                  pending
                </Body2>
              </FlexBox>
              <FlexBox justify="space-between" align="center">
                <Body2>Session credit refund</Body2>
                <Body2 color={SUCCESS} bold>
                  completed
                </Body2>
              </FlexBox>
            </FlexBox>

            <ActionCTAWrapper>
              <IconButton outline Icon={FiDownload} onClick={handleClick}>
                DOWNLOAD INVOICE
              </IconButton>
            </ActionCTAWrapper>
          </Content>
        </Section>
      </FlexBox>
    </Modal>
  );
};

export default SessionDetails;
