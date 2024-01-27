import React, { useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { useRouter } from "next/router";

import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { H2, Body2 } from "@common/ui/Headings";
import {
  SECONDARY_0,
  SECONDARY_200,
  SECONDARY_500,
  SECONDARY_700,PRIMARY_900
} from "@common/ui/colors";
import { H5 } from "@common/ui/Headings";
import { device } from "@common/ui/Resposive";

const eventList = [
  {
    id: 1,
    title: "Gurunanak Jayanti",
    imgSrc: "/assets/images/barber-cloud.svg",
    startDate: "23 March 2023",
    endDate: "24 March 2023",
    description:
      "happy birthday to you , this is just the description of the event you clicked",
  },
  {
    id: 2,
    title: "Gurunanak Jayanti",
    imgSrc: "/assets/images/barber-cloud.svg",
    startDate: "21 March 2023",
    endDate: "22 March 2023",
    description:
      "happy birthday to you , this is just the description of the event you clicked",
  },
  {
    id: 3,
    title: "Gurunanak Jayanti",
    imgSrc: "/assets/images/barber-cloud.svg",
    startDate: "25 March 2023",
    endDate: "28 March 2023",
    description:
      "happy birthday to you , this is just the description of the event you clicked",
  },
  {
    id: 4,
    title: "Gurunanak Jayanti",
    imgSrc: "/assets/images/barber-cloud.svg",
    startDate: "23 March 2023",
    endDate: "24 March 2023",
    description:
      "happy birthday to you , this is just the description of the event you clicked",
  },
  {
    id: 5,
    title: "Gurunanak Jayanti",
    imgSrc: "/assets/images/barber-cloud.svg",
    startDate: "21 March 2023",
    endDate: "22 March 2023",
    description:
      "happy birthday to you , this is just the description of the event you clicked",
  },
  {
    id: 6,
    title: "Gurunanak Jayanti",
    imgSrc: "/assets/images/barber-cloud.svg",
    startDate: "25 March 2023",
    endDate: "28 March 2023",
    description:
      "happy birthday to you , this is just the description of the event you clicked",
  },
  {
    id: 7,
    title: "Gurunanak Jayanti",
    imgSrc: "/assets/images/barber-cloud.svg",
    startDate: "23 March 2023",
    endDate: "24 March 2023",
    description:
      "happy birthday to you , this is just the description of the event you clicked",
  },
  {
    id: 8,
    title: "Gurunanak Jayanti",
    imgSrc: "/assets/images/barber-cloud.svg",
    startDate: "21 March 2023",
    endDate: "22 March 2023",
    description:
      "happy birthday to you , this is just the description of the event you clicked",
  },
];

const compareDates = (eventA, eventB) => {
  const parseDate = dateString => {
    const [day, month, year] = dateString.split(" ");
    return new Date(`${month} ${day}, ${year}`);
  };

  const dateA = parseDate(eventA.startDate);
  const dateB = parseDate(eventB.startDate);

  return dateA - dateB;
};

const calculateDayCount = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end - start;
  const dayCount = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return dayCount;
};

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 65vh;
  padding: 1rem;
  position: relative;
  margin: auto;
  row-gap: 1rem;
  background-color: ${SECONDARY_0};
`;

const CloseIcon = styled(FlexBox)`
  position: absolute;
  top: 1.5rem;
  left: 90%;
  cursor: pointer;

  @media ${device.laptop} {
    left: 95%;
    top: 1rem;
  }
`;

const Container = styled(FlexBox)`
  width: 100%;
  align-items: center;
  border-top: 2px solid ${SECONDARY_200};
  padding: 1rem;
  flex-direction: column;
  row-gap: 1rem;
  overflow-y: auto;
`;

const SingleEventBox = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
`;

const EventOverViewBox = styled(FlexBox)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  cursor: pointer;
`;

const ImgBox = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const EventInfoContainer = styled(FlexBox)`
  flex-direction: Column;
  width: 100%;
  color: ${SECONDARY_200};
`;

const EventTimeDesc = styled(FlexBox)`
  justify-content: space-between;
`;

const DescContainer = styled(FlexBox)`
  padding: 0 3rem;
`;

const HolidayList = () => {
  const router = useRouter();
  const [descBoxOpen, setDescBoxOpen] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const sortedEventList = [...eventList].sort(compareDates);

  return (
    <Wrapper>
      <H2 textAlign="center" color={PRIMARY_900} bold>
        Holiday List
      </H2>
      <CloseIcon onClick={handleGoBack}>
        <TfiClose />
      </CloseIcon>
      <Container>
        {sortedEventList.map(event => (
          <SingleEventBox
            key={event.id}
            onClick={() =>
              setDescBoxOpen(prevState => ({
                ...prevState,
                [event.id]: !prevState[event.id],
              }))
            }
          >
            <EventOverViewBox>
              {event.imgSrc ? (
                <ImgBox src={event.imgSrc} alt="pic" />
              ) : (
                <ImgBox src="/assets/images/Avatar.svg" alt="pic" />
              )}
              <EventInfoContainer>
                <H5 color={PRIMARY_900} bold>
                  {event.title}
                </H5>
                <EventTimeDesc>
                  <Body2 color={SECONDARY_500}>
                    {event.startDate} - {event.endDate}
                  </Body2>
                  <Body2 color={SECONDARY_500}>
                    {calculateDayCount(event.startDate, event.endDate) + 1}days
                  </Body2>
                </EventTimeDesc>
              </EventInfoContainer>
            </EventOverViewBox>
            {descBoxOpen[event.id] && (
              <DescContainer>
                <Body2 color={SECONDARY_700}>{event.description}</Body2>
              </DescContainer>
            )}
          </SingleEventBox>
        ))}
      </Container>
    </Wrapper>
  );
};

export default HolidayList;
