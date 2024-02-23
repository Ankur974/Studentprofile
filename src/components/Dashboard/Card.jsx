import { FiChevronRight } from "react-icons/fi";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { ACCENT_300, WHITE, PRIMARY_800 } from "@common/ui/colors";
import { H2 } from "@common/ui/Headings";
import { IconButton } from "@common/ui/Buttons";

const Wrapper = styled(FlexBox)`
  background: ${WHITE};
  border-radius: 1rem;
  width: 100%;
  height: 100%;
  @media screen and (min-width: 768px) {
    border-bottom: 1px solid ${ACCENT_300};
    overflow: hidden;
  }
`;

const Title = styled(FlexBox)`
  @media screen and (min-width: 768px) {
    border-bottom: 1px solid ${ACCENT_300};
    padding: 1.5rem;
  }
  padding: 0 1.5rem;
`;

const Content = styled.div`
  padding: ${({ padding }) => padding || "1.5rem"};
`;

const Card = ({
  padding,
  title,
  children,
  hasDashboardRedirection = false,
  showViewAllCTA = true,
  toggleScreens = () => {},
}) => {
  return (
    <Wrapper column>
      <Title justify="space-between" align="center" width="100%">
        {hasDashboardRedirection ? (
          <FlexBox align="center" columnGap="0.5rem">
            <H2
              bold
              onClick={toggleScreens}
              color={PRIMARY_800}
              cursor="pointer"
            >
              Dashboard
            </H2>{" "}
            <FiChevronRight color={PRIMARY_800} /> <H2 bold>{title}</H2>
          </FlexBox>
        ) : (
          <H2 bold>{title}</H2>
        )}
        {showViewAllCTA && (
          <IconButton textCta Icon={FiChevronRight} iconPosition="right">
            VIEW ALL
          </IconButton>
        )}
      </Title>
      <Content padding={padding}>{children}</Content>
    </Wrapper>
  );
};

export default Card;