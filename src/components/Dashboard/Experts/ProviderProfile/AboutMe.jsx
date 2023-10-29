import React, { memo } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { ACCENT_800 } from "@common/ui/colors";
import { H3, H4 } from "@common/Dashboard/Headings";

const Dot = styled.div`
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 1rem;
  background-color: ${ACCENT_800};
`;

const SectionTitle = styled(FlexBox)`
  align-items: center;
  gap: 0.5rem;
`;

const AboutMe = ({ providerData }) => {
  const { languages, otherinterests, affiliations } = providerData || {};
  return (
    <FlexBox column rowGap="1.5rem">
      {languages?.length > 0 && (
        <FlexBox column rowGap="1rem">
          <SectionTitle>
            <img
              src="/assets/images/profile/my-languages.svg"
              height="36px"
              width="36px"
            />
            <H3 bold>Languages I speak</H3>
          </SectionTitle>
          <H4>{languages?.map(lang => lang?.name)?.join(", ")}</H4>
        </FlexBox>
      )}

      {otherinterests?.length > 0 && (
        <FlexBox column rowGap="1rem">
          <SectionTitle>
            <img
              src="/assets/images/profile/my-expertise.svg"
              height="36px"
              width="36px"
            />
            <H3 bold>I can help you with</H3>
          </SectionTitle>
          <H4>
            {Array.isArray(otherinterests)
              ? otherinterests.join(", ")
              : otherinterests}
          </H4>
        </FlexBox>
      )}

      {affiliations?.length > 0 && (
        <FlexBox column rowGap="1rem">
          <SectionTitle>
            <img
              src="/assets/images/profile/my-affiliations.svg"
              height="36px"
              width="36px"
            />
            <H3 bold>My affiliations</H3>
          </SectionTitle>

          {affiliations.map((aff, index) => (
            <FlexBox
              key={index}
              align="center"
              columnGap="1rem"
              paddingBlock="0.1rem"
            >
              <Dot />
              <H4>
                {aff.designation} at {aff.organisation} from{" "}
                {dayjs(aff.startdate).format("MMM YYYY")} to{" "}
                {aff.iscurrent
                  ? "present"
                  : dayjs(aff.enddate).format("MMM YYYY")}
              </H4>
            </FlexBox>
          ))}
        </FlexBox>
      )}
    </FlexBox>
  );
};

export default memo(AboutMe);
