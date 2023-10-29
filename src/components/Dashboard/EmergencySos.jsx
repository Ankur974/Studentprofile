import { FiX } from "react-icons/fi";
import styled from "styled-components";
import { BooleanParam, useQueryParams } from "use-query-params";

import { Button } from "@common/Dashboard/Buttons";
import { Body2, H1 } from "@common/ui/Headings";
import { Modal } from "@common/Dashboard/Modal";
import FlexBox from "@common/ui/FlexBox";
import {
  BRICK_TERRACOTA_200,
  DARK_MOSS_GREEN_800,
  DAVYS_GRAY_400,
} from "@common/ui/colors";

const Section = styled(FlexBox)`
  width: 100%;
`;

const Content = styled(FlexBox)`
  padding: 1.5rem;
  width: 100%;
`;

const Title = styled(FlexBox)`
  padding: 1.5rem;
  border-bottom: 1px solid ${DAVYS_GRAY_400};
`;

const Link = styled.a`
  color: ${DARK_MOSS_GREEN_800};
  font-weight: 700;
  text-decoration: none;
`;

const ActionCTAWrapper = styled(FlexBox)`
  width: 100%;
  padding: 1rem;
  background: ${BRICK_TERRACOTA_200};
  border-radius: 1rem;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 768px) {
    padding: 1.5rem;
    flex-direction: column;
    row-gap: 2rem;
    ${Body2} {
      text-align: center;
    }
  }
`;

const EmergencySos = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, setQueryParams] = useQueryParams({
    showEmergencySosModal: BooleanParam,
  });

  const handleOnClose = () => {
    const params = {
      showEmergencySosModal: null,
    };
    setQueryParams(params, "replaceIn");
  };

  return (
    <Modal S width="36rem" height="34rem">
      <FlexBox column align="center">
        <img src="/assets/images/dashboard/sos-banner.png" width="100%" />
        <Section column>
          <Title justify="space-between" align="center">
            <H1 bold>Reach out for help.</H1>
            <FiX cursor="pointer" onClick={handleOnClose} />
          </Title>
          <Content column rowGap="1.5rem">
            <Body2>
              Hi there — thank you for reaching out. At the moment, Amaha is not
              equipped to provide you with support in crisis situations.
            </Body2>
            <Body2>
              If you need immediate assistance, please reach out to a medical
              professional at your nearest hospital as soon as possible. If you
              have any further concerns, kindly contact{" "}
              <Link href="mailto:support@amahahealth.com">
                support@amahahealth.com
              </Link>
              . We will respond to you between 10 am and 7 pm on weekdays.
            </Body2>
            <ActionCTAWrapper>
              <Body2 bold>
                You can also reach out to helplines for emergency support.
              </Body2>
              <Button>CHECK HELPLINES</Button>
            </ActionCTAWrapper>
          </Content>
        </Section>
      </FlexBox>
    </Modal>
  );
};

export default EmergencySos;
