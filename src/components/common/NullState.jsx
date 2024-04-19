import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { ACCENT_700 } from "@common/ui/colors";
import { H3, H5 } from "@common/ui/Headings";
import { device } from "@common/ui/Responsive";

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  padding: 1.5rem 2.5rem;
  justify-content: center;
  align-items: center;

  @media ${device.tablet} {
    padding: 1.5rem 1rem;
  }
`;

const NullStateImg = styled.img`
  width: ${({ width }) => width || "7.5rem"};
  height: ${({ height }) => height || "7.5rem"};
`;

const NullState = ({
  imgSrc,
  imgWidth,
  imgHeight,
  text,
  contentWidth = "auto",
  subtext = "",
  Button = null,
}) => {
  return (
    <Container>
      <FlexBox column rowGap="1rem" align="center">
        {imgSrc && (
          <NullStateImg
            src={imgSrc}
            width={imgWidth}
            height={imgHeight}
            alt="Null State"
            draggable={false}
          />
        )}
        <FlexBox column width={contentWidth} rowGap="0.5rem" align="center">
          <H3 bold textAlign="center">
            {text}
          </H3>
          {subtext && (
            <H5 color={ACCENT_700} textAlign="center">
              {ReactHtmlParser(subtext)}
            </H5>
          )}
        </FlexBox>
        {Button && Button}
      </FlexBox>
    </Container>
  );
};

export default NullState;
