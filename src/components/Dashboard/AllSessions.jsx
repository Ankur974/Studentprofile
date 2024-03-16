import { useEffect, useState } from "react";
import styled from "styled-components";

import SessionCard from "@common/SessionCard";
import { device } from "@common/ui/Resposive";
import FlexBox from "@common/ui/FlexBox";
import { WHITE } from "@common/ui/colors";
import { Body2 } from "@common/ui/Headings";
import Chip from "@common/ui/Chips";

const Container = styled(FlexBox)`
  width: 100%;
  padding: 1.5rem;
  flex-direction: row;
  column-gap: 1.5rem;
  row-gap: 0;

  @media ${device.laptop} {
    padding: 0;
    flex-direction: column;
    row-gap: 2rem;
    column-gap: 0;
  }
`;

const Wrapper = styled.div`
  @media ${device.tablet} {
    max-height: 68vh;
    overflow: auto;
  }
`;

const tabs = [
  {
    label: "All",
    slug: "all",
  },
  {
    label: "Upcoming",
    slug: "upcoming",
  },
  {
    label: "Completed",
    slug: "completed",
  },
  {
    label: "Cancelled",
    slug: "cancelled",
  },
  {
    label: "Unattended",
    slug: "unattended",
  },
];

const AllSessions = () => {
  const [selectedTab, setSelectedTab] = useState("");

  useEffect(() => fetchData(selectedTab), [selectedTab]);

  const fetchData = selectedTab => console.log(`fetch ${selectedTab}`);

  return (
    <Container>
      <Wrapper>
        <FlexBox wrap="wrap" columnGap="1rem" rowGap="1rem">
          {tabs?.map(tab => (
            <Chip
              width="fit-content"
              selected={tab?.slug === selectedTab}
              onClick={() => setSelectedTab(tab?.slug)}
              key={tab?.slug}
            >
              <Body2 bold color={tab?.slug === selectedTab && WHITE}>
                {tab?.label}
              </Body2>
            </Chip>
          ))}
        </FlexBox>
        <FlexBox column rowGap="1rem" padding="1.5rem 0">
          <SessionCard />
          <SessionCard />
          <SessionCard isNsp />
        </FlexBox>
      </Wrapper>
    </Container>
  );
};

export default AllSessions;
