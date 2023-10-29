import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { Case, Default, Switch } from "@common/ConditionalRendering";
import { H2 } from "@common/ui/Headings";
import { boxShadowDs1 } from "@common/Dashboard/boxShadowStyles";
import FlexBox from "@common/ui/FlexBox";
import Loader from "@common/ui/Loader";
import {
  ACCENT_800,
  DARK_MOSS_GREEN_800,
  DAVYS_GRAY_400,
  ACCENT_100,
} from "@common/ui/colors";
import { journeyDummyData } from "@metadata/dashboard/journey";
import CollapsedState from "./CollapsedState";
import JourneyItem from "./JourneyItem";

const providersList = [
  {
    id: "101",
    fullname: "Pratistha Trivedi Mirza",
  },
  {
    id: "102",
    fullname: "Dr. Divya G Nallur",
  },
  {
    id: "103",
    fullname: "Dr. Divya G Nallur",
  },
  {
    id: "104",
    fullname: "Dr. Divya G Nallur",
  },
  {
    id: "105",
    fullname: "Dr. Divya G Nallur",
  },
];

const Desktop = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: calc(50% - 0.75rem) calc(50% - 0.75rem);
  grid-template-rows: 100%;
  column-gap: 1.5rem;
  transform: translateX(0%);
  transition: all 500ms ease-in-out;
`;

const LeftSection = styled.div`
  background-color: ${ACCENT_100};
  border-radius: 1rem;
  transition: all 500ms ease-in-out;
  ${boxShadowDs1}
  overflow: auto;
`;

const RightSection = styled.div`
  background-color: ${ACCENT_100};
  border-radius: 1rem;
  ${boxShadowDs1}
  overflow: auto;
`;

const JourneyList = styled(FlexBox)`
  padding: 0 1.5rem 1.5rem;
`;

const Header = styled(FlexBox)`
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 1.5rem;
  overflow: auto;
  background-color: white;
`;

const ProviderChip = styled(FlexBox)`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  white-space: nowrap;

  ${({ isSelected }) =>
    isSelected
      ? css`
          color: white;
          background-color: ${DARK_MOSS_GREEN_800};
          border: 1px solid ${DARK_MOSS_GREEN_800};
        `
      : css`
          color: ${ACCENT_800};
          border: 1px solid ${DAVYS_GRAY_400};
        `}
`;

const LoaderContainer = styled(FlexBox)`
  height: 60%;
  justify-content: center;
  align-items: center;
`;

const JourneyDesktop = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedProvider, setSelectedProvider] = useState(providersList[0].id);

  useEffect(() => {
    //TODO PK: API handling
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleSelectProvider = id => {
    setSelectedProvider(id);
  };

  return (
    <Desktop data-testid="journey-desktop">
      <LeftSection>
        <Header>
          <H2 bold>Your mental health journey with us</H2>
        </Header>
        <Switch>
          <Case condition={isLoading}>
            <LoaderContainer>
              <Loader />
            </LoaderContainer>
          </Case>
          <Case condition={!isLoading}>
            <JourneyList column>
              {journeyDummyData.map((journeyObject, index) => {
                const isSecondary = journeyObject.event_type === "secondary";
                return (
                  <Switch key={index}>
                    <Case condition={isSecondary}>
                      <CollapsedState journeyObject={journeyObject} />
                    </Case>
                    <Default>
                      <JourneyItem
                        key={"primary" + journeyObject?.id}
                        title={
                          journeyObject?.datetime
                            ? dayjs(journeyObject?.datetime).format(
                                "DD MMMM YYYY, hh:mm a"
                              )
                            : ""
                        }
                        content={journeyObject?.description}
                        isPrimary={true}
                        isFirstChild={index === 0}
                        redirectionLink={journeyObject?.redirectionLink}
                      />
                    </Default>
                  </Switch>
                );
              })}
            </JourneyList>
          </Case>
        </Switch>
      </LeftSection>
      <RightSection className="hide-scrollbar">
        <Header columnGap="1rem">
          {providersList.map(provider => {
            const isSelected = selectedProvider === provider.id;
            return (
              <ProviderChip
                key={provider.id}
                isSelected={isSelected}
                onClick={() => handleSelectProvider(provider.id)}
              >
                with {provider.fullname}
              </ProviderChip>
            );
          })}
        </Header>
        <Switch>
          <Case condition={isLoading}>
            <LoaderContainer>
              <Loader />
            </LoaderContainer>
          </Case>
          <Case condition={!isLoading}>
            <JourneyList column>
              {journeyDummyData.map((journeyObject, index) => {
                const isSecondary = journeyObject.event_type === "secondary";
                return (
                  <Switch key={index}>
                    <Case condition={isSecondary}>
                      <CollapsedState journeyObject={journeyObject} />
                    </Case>
                    <Default>
                      <JourneyItem
                        key={"primary" + journeyObject?.id}
                        title={
                          journeyObject?.datetime
                            ? dayjs(journeyObject?.datetime).format(
                                "DD MMMM YYYY, hh:mm a"
                              )
                            : ""
                        }
                        content={journeyObject?.description}
                        isPrimary={true}
                        isFirstChild={index === 0}
                        redirectionLink={journeyObject?.redirectionLink}
                      />
                    </Default>
                  </Switch>
                );
              })}
            </JourneyList>
          </Case>
        </Switch>
      </RightSection>
    </Desktop>
  );
};

export default JourneyDesktop;
