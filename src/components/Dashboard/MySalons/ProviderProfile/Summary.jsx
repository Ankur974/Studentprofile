import { useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import ReactHtmlParser from "react-html-parser";

import FlexBox from "@common/ui/FlexBox";
import { Body2, TextCTA } from "@common/ui/Headings";
import { currentFlow, trackEvent } from "@utils/helpers";
import { ACCENT_400, PRIMARY_800 } from "@common/ui/colors";

const Container = styled(FlexBox)`
  width: 100%;
  row-gap: 0.5rem;
  flex-direction: column;
  align-items: flex-start;
`;

const SummaryWrapper = styled(Body2)`
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

const SeeMoreWrapper = styled(FlexBox)`
  width: 100%;
`;

const Divider = styled.div`
  height: 1px;
  border-bottom: 1px solid ${ACCENT_400};
  flex: 1;
`;

const TextCta = styled(TextCTA)`
  text-transform: none;
  letter-spacing: 0;
`;

const Summary = ({ providerData, providerType, sessionType = "single" }) => {
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
    if (summaryRef?.current) {
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
    <Container>
      <SummaryWrapper ref={summaryRef} expanded={showExpanded}>
        {ReactHtmlParser(summary)}
      </SummaryWrapper>
      {isExceeding && (
        <SeeMoreWrapper align="center" columnGap="0.5rem">
          <Divider />
          <TextCta onClick={handleSeeMore} color={PRIMARY_800}>
            {showExpanded ? "Show less" : "Read more"}
          </TextCta>
        </SeeMoreWrapper>
      )}
    </Container>
  );
};

export default Summary;
