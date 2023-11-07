import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { journeyDummyData } from "@metadata/dashboard/journey";
import { ACCENT_800, DARK_MOSS_GREEN_800, ACCENT_400 } from "@common/ui/colors";
import { Case, Default, Switch } from "@common/ConditionalRendering";
import FlexBox from "@common/ui/FlexBox";
import { H2 } from "@common/ui/Headings";
import Loader from "@common/ui/Loader";
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

const Mobile = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 1rem 1.5rem;
`;

const Header = styled(FlexBox)`
  position: sticky;
  top: 0;
  z-index: 1;
  gap: 1rem;
  overflow: auto;
  padding: 1rem 0;
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
          border: 1px solid ${ACCENT_400};
        `}
`;

const LoaderContainer = styled(FlexBox)`
  height: 60%;
  justify-content: center;
  align-items: center;
`;

const JourneyList = styled(FlexBox)`
  padding: 0 0 1.5rem;
  height: auto;
`;

const JourneyMobile = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedProvider, setSelectedProvider] = useState(null);

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
    <Mobile>
      <H2 bold>Your Journey</H2>
      <Header>
        <ProviderChip
          isSelected={!selectedProvider}
          onClick={() => handleSelectProvider(null)}
        >
          At Amaha
        </ProviderChip>
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
    </Mobile>
  );
};

export default JourneyMobile;
