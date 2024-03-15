import styled from "styled-components";

import { ACCENT_500 } from "@common/ui/colors";
import FlexBox from "@common/ui/FlexBox";

const CalendarWrapper = styled.div`
  width: 100%;
  height: 16.75rem;
  border-radius: 0.25rem;
  background-color: ${ACCENT_500};
`;

const SessionDurationButton = styled.div`
  flex: 1;
  color: transparent;
  padding: 0.75rem 0;
  border-radius: 0.25rem;
  background-color: ${ACCENT_500};
`;

const PackageName = styled.div`
  width: 3.5rem;
  height: 1.25rem;
  border-radius: 0.25rem;
  background-color: ${ACCENT_500};
`;

const PackagePrice = styled.div`
  width: 4.75rem;
  height: 1.125rem;
  border-radius: 0.25rem;
  background-color: ${ACCENT_500};
`;

const SchedulesFlex = styled(FlexBox)`
  width: 100%;
  column-gap: 1.5rem;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const ScheduleText = styled.div`
  height: 1rem;
  width: 1.75rem;
  border-radius: 0.25rem;
  background-color: ${ACCENT_500};
`;

const Schedule = styled.div`
  width: 6.3rem;
  height: 3.375rem;
  border-radius: 0.25rem;
  background-color: ${ACCENT_500};
`;

const SlotTitle = styled.div`
  height: 1rem;
  width: 3.5rem;
  border-radius: 0.25rem;
  background-color: ${ACCENT_500};
`;

const SlotText = styled.div`
  height: 1rem;
  width: 7.125rem;
  border-radius: 0.25rem;
  background-color: ${ACCENT_500};

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const SlotsContainer = styled(FlexBox)`
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem 0.75rem;

  @media only screen and (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const SlotPill = styled(FlexBox)`
  width: 4.25rem;
  height: 1.75rem;
  border-radius: 0.25rem;
  background-color: ${ACCENT_500};
`;

export const CalendarLoader = () => <CalendarWrapper className="blink" />;

export const SessionDurationLoader = () => (
  <FlexBox width="100%" align="center" columnGap="1.5rem" className="blink">
    <SessionDurationButton>1</SessionDurationButton>
    <SessionDurationButton>2</SessionDurationButton>
  </FlexBox>
);

export const PackagesLoader = () => (
  <FlexBox
    width="100%"
    align="center"
    className="blink"
    justify="space-between"
  >
    <PackageName />
    <PackagePrice />
  </FlexBox>
);

export const SchedulesLoader = () => (
  <SchedulesFlex className="blink">
    {new Array(3).fill(1).map((o, i) => (
      <FlexBox key={o + i} column align="center" rowGap="0.5rem">
        <ScheduleText />
        <Schedule />
      </FlexBox>
    ))}
  </SchedulesFlex>
);

export const SlotsLoader = () => (
  <>
    <FlexBox column rowGap="1rem" className="blink">
      <FlexBox padding="0.25rem" align="center" justify="space-between">
        <SlotTitle bold textTransform="uppercase" />
        <SlotText bold />
      </FlexBox>
      <SlotsContainer>
        {new Array(12).fill(1)?.map((slot, i) => (
          <SlotPill key={slot + i} />
        ))}
      </SlotsContainer>
    </FlexBox>
    <div className="divider" />
  </>
);
