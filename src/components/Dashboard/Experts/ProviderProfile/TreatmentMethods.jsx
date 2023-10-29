import React, { memo } from "react";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { SECONDARY_700, ACCENT_500 } from "@common/ui/colors";
import { H3, H4 } from "@common/Dashboard/Headings";

const TreatmentMethods = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  gap: 1.5rem;
`;

const MethodCapsule = styled.div`
  border-radius: 0.75rem;
  padding-block: 0.5rem;
  padding-inline: 1rem;
  cursor: pointer;
  border: 1px solid ${ACCENT_500};
`;

const TreatmentMethod = ({ providerData }) => {
  return (
    <TreatmentMethods>
      <FlexBox align="center" columnGap="0.5rem">
        <img
          src="/assets/images/profile/treatment-methods.svg"
          height="48px"
          width="48px"
          alt="treatment methods icon"
        />
        <H3 bold>I specialize in</H3>
      </FlexBox>

      {providerData?.treatment_areas?.length > 0 && (
        <FlexBox wrap="wrap" columnGap="1rem" rowGap="1rem" align="center">
          {providerData?.treatment_areas?.map((method, index) => (
            <MethodCapsule key={index}>
              <H4 bold color={SECONDARY_700}>
                {method.name}
              </H4>
            </MethodCapsule>
          ))}
        </FlexBox>
      )}
    </TreatmentMethods>
  );
};

export default memo(TreatmentMethod);
