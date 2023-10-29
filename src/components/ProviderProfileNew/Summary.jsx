import { useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { H4, TextCTA } from "@common/Headings";

import { WHITE, PRIMARY_800 } from "@common/ui/colors";
import { currentFlow, trackEvent } from "@utils/helpers";

const Wrapper = styled(FlexBox)`
  padding: 2.5rem 0;
  box-sizing: border-box;
  justify-content: center;
  background-color: ${PRIMARY_800};

  * {
    box-sizing: border-box;
  }
`;

const Container = styled(FlexBox)`
  width: 83.35%;
  row-gap: 1rem;
  max-width: 75rem;
  flex-direction: column;
  align-items: flex-start;

  ${TextCTA} {
    align-self: flex-end;
  }

  @media only screen and (max-width: 768px) {
    width: 86.67%;
    row-gap: 0.5rem;
  }
`;

const Summary = styled(H4)`
  line-clamp: 3;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;

  @media only screen and (max-width: 768px) {
    line-clamp: 6;
    line-height: 1.5;
    font-size: 0.875rem;
    -webkit-line-clamp: 6;
  }

  ${({ expanded }) =>
    expanded &&
    css`
      line-clamp: 20 !important;
      -webkit-line-clamp: 20 !important;
    `}
`;

const ProviderSummary = ({
  providerData,
  providerType,
  sessionType = "single",
}) => {
  const summaryRef = useRef(null);
  const [isExceeding, setIsExceeding] = useState(false);
  const [showExpanded, setShowExpanded] = useState(false);

  const type = providerType?.toLowerCase();
  const flow = currentFlow(type, sessionType);
  const fullName = useMemo(() => {
    if (providerData?.uuid === "a9c7f59f-13ed-4e6e-a665-3ad7b601e722") {
      return "Dr Divya Ganesh Nallur";
    }
    return `${providerData?.firstname || ""} ${
      providerData?.lastname || ""
    }`.trim();
  }, [providerData?.uuid]);

  const payload = {
    flow,
    [`${type}_name`]: fullName,
    [`${type}_uuid`]: providerData?.uuid,
    expt_variant: "new_page",
  };

  const summary = (function () {
    // conditional about info rendering for select providers (currently for Dr Divya)
    if (sessionType === "couple") {
      return providerData?.couple_about;
    } else if (providerData?.uuid === "a9c7f59f-13ed-4e6e-a665-3ad7b601e722") {
      return providerData?.about?.replace("Dr Divya", "Dr Divya Ganesh Nallur");
    }
    return providerData?.about;
  })();

  useEffect(() => {
    if (!!summaryRef?.current) {
      setIsExceeding(
        summaryRef?.current?.clientHeight < summaryRef?.current?.scrollHeight
      );
    }
  }, [summaryRef?.current]);

  const handleSeeMore = () => {
    if (!showExpanded) {
      trackEvent({
        event: "therapy_psychiatry_bio_read_more",
        payload,
      });
    }
    setShowExpanded(prev => !prev);
  };

  if (!summary) return null;

  return (
    <Wrapper>
      <Container>
        <Summary
          color={WHITE}
          ref={summaryRef}
          expanded={showExpanded}
          dangerouslySetInnerHTML={{ __html: summary }}
        />

        {isExceeding && (
          <TextCTA color={WHITE} onClick={handleSeeMore}>
            {showExpanded ? "SEE LESS" : "SEE MORE"}
          </TextCTA>
        )}
      </Container>
    </Wrapper>
  );
};

export default ProviderSummary;
