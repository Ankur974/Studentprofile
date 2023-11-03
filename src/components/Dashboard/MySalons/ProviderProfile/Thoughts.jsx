/* eslint-disable quotes */
import React from "react";
import styled from "styled-components";
import "react-multi-carousel/lib/styles.css";

import FlexBox from "@common/ui/FlexBox";
import { H3, H4 } from "@common/ui/Headings";
import { ACCENT_500 } from "@common/ui/colors";

const Thought = styled(FlexBox)`
  padding: 0.75rem;
  column-gap: 0.75rem;
  align-items: flex-start;
  width: max-content;
  border-radius: 0.5rem;
  border: 1px solid ${ACCENT_500};

  img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const Thoughts = ({ providerData }) => {
  return (
    <FlexBox column rowGap="1.5rem">
      <FlexBox align="center" columnGap="0.5rem">
        <img
          src="/assets/images/profile/concerns.svg"
          height="48px"
          width="48px"
        />
        <H3 bold>Concerns my clients have</H3>
      </FlexBox>
      <FlexBox width="100%" wrap="wrap" columnGap="1rem" rowGap="1rem">
        {providerData?.user_phrases?.map(thought => (
          <Thought key={thought}>
            <img alt="Quote" draggable={false} src="/assets/images/comma.svg" />
            <H4 bold>{thought?.replaceAll('"', "")}</H4>
          </Thought>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

export default Thoughts;
