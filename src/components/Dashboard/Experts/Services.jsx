import { FiChevronRight } from "react-icons/fi";
import styled from "styled-components";

import { IconButton } from "@common/Dashboard/Buttons";
import { Body1, Body2, Support } from "@common/Dashboard/Headings";
import FlexBox from "@common/ui/FlexBox";
import LazyImage from "@common/LazyImage";
import { DAVYS_GREY_400, DAVYS_GREY_700 } from "@common/ui/colors";
import { services } from "@metadata/dashboard/services";

const Container = styled(FlexBox)`
  padding: 1.5rem;
  box-sizing: border-box;
`;

const Card = styled(FlexBox)`
  border: 1px solid ${DAVYS_GREY_400};
  border-radius: 1rem;
  overflow: hidden;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
`;

const Img = styled(LazyImage)`
  height: 3rem;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 50%;
`;

const Services = () => {
  return (
    <Container width="100%" column rowGap="1.5rem">
      <Body1 bold>Other Services</Body1>
      {services.map(service => (
        <Card key={service.slug} column>
          <FlexBox columnGap="1rem">
            <Img src={service.image} />
            <FlexBox column>
              <Body2 bold>{service.title}</Body2>
              <Support color={DAVYS_GREY_700}>{service.subtitle}</Support>
            </FlexBox>
          </FlexBox>
          <Support color={DAVYS_GREY_700} margin="0.5rem 0">
            {service.description}
          </Support>
          <FlexBox justify="end">
            <IconButton Icon={FiChevronRight} iconPosition="right" textCta>
              LEARN MORE
            </IconButton>
          </FlexBox>
        </Card>
      ))}
    </Container>
  );
};

export default Services;
