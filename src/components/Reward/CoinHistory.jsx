import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";
import dayjs from "dayjs";

import FlexBox from "../common/ui/FlexBox";
import { H3, H2, Body2 } from "../common/ui/Headings";
import { device } from "../common/ui/Resposive";
import { SECONDARY_901, LOSS } from "../common/ui/colors";
import { BalanceCard } from "./BalanceCard";

const transactions = [
  {
    name: "Looks Saloon",
    time: "2023-05-04T10:45:00",
    debit: 5,
    credit: 0,
  },
  {
    name: "Looks Saloon",
    time: "2023-05-04T11:30:00",
    debit: 0,
    credit: 20,
  },
  {
    name: "Looks Saloon",
    time: "2023-05-04T13:15:00",
    debit: 10,
    credit: 0,
  },
];

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  max-width: 75rem;
  margin: auto;
  gap: 1.2rem;
  padding-block: 2rem;
  padding-inline: 1rem;

  @media ${device.laptop} {
    padding-inline: 0;
  }
`;

const CareTitle = styled(FlexBox)`
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: center;

  @media ${device.laptop} {
    justify-content: center;
  }
`;

const Backbutton = styled(FlexBox)`
  border-radius: 0.25rem;
  border: 0.1rem solid ${SECONDARY_901};
  padding: 0.5rem 0.5rem;
  cursor: pointer;
  position: absolute;
  left: 0;
`;

const Title = styled(FlexBox)`
  position: absolute;
`;

const Passbook = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
  column-gap: 5rem;

  @media ${device.laptop} {
    justify-content: space-evenly;
  }
`;
const Lost = styled(FlexBox)`
  border-radius: 2.5rem;
  padding: 0.8rem 1rem;
  background-color: ${LOSS};
  color: #d90000;
`;

const Earned = styled(FlexBox)`
  border-radius: 2.5rem;
  padding: 1rem;
  background-color: rgba(32, 158, 11, 0.05);
  color: green;
`;

const CoinHistory = () => {
  return (
    <Wrapper>
      <CareTitle>
        <Backbutton>
          <IoIosArrowBack
            onClick={() => {
              alert("back button clicked");
            }}
          />
        </Backbutton>
        <Title>
          <H2 bold>Care Coins History</H2>
        </Title>
      </CareTitle>

      <BalanceCard />

      <FlexBox column rowGap="1rem">
        {transactions.map(item => (
          <Passbook row>
            <FlexBox column>
              <H3 bold>{item.name}</H3>
              <Body2>{dayjs(item.time).format("DD/MM/YYYY")}</Body2>
            </FlexBox>
            <FlexBox>
              {item.credit ? (
                <Earned>+ {item.credit}</Earned>
              ) : (
                <Lost>- {item.debit}</Lost>
              )}
            </FlexBox>
          </Passbook>
        ))}
      </FlexBox>
    </Wrapper>
  );
};
export default CoinHistory;
