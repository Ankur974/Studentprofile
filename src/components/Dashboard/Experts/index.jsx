import styled from "styled-components";
import { NumberParam, StringParam, useQueryParams } from "use-query-params";

import FlexBox from "@common/ui/FlexBox";
import { ACCENT_300 } from "@common/ui/colors";
import useMobileView from "@hooks/useMobileView";
import ProviderCard from "./ProviderCard";
import About from "@components/ShopDetailPage/About";
import Services from "../../ShopDetailPage/Services";
import { device } from "../../common/ui/Resposive";

const Container = styled(FlexBox)`
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  column-gap: 0;
  background-color: ${ACCENT_300};
  transform: ${({ showLeftSection }) =>
    showLeftSection ? "translateX(0)" : "translateX(-100vw)"};
  transition: all 0.2s ease-in-out;
  overflow-x: visible;
  position: fixed;

  @media ${device.laptop} {
    width: 100%;
    padding: 1.5rem;
    column-gap: 1.5rem;
    transform: none;
    overflow-x: none;
    position: static;
  }
`;

const Card = styled(FlexBox)`
  background-color: #ffffff;
  box-shadow: unset;
  border-radius: 0;
  width: 50%;
  flex-direction: column;
  overflow: hidden;

  @media ${device.laptop} {
    box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.04);
    border-radius: 1rem;
    width: 49%;
  }
`;

const Left = styled(Card)`
  width: 100vw;
  flex: none;

  @media ${device.laptop} {
    flex: 1;
    padding: 1.5rem;
  }
`;

const Right = styled(Card)`
  flex: none;
  width: 100vw;

  @media ${device.laptop} {
    flex: 1;
  }
`;

const RightWrapper = styled(FlexBox)`
  width: 100%;
  padding: 1rem;
  overflow-y: scroll;
`;

const Experts = () => {
  const isMobile = useMobileView();

  const [queryParams, setQueryParams] = useQueryParams({
    selected: StringParam,
    saloonId: NumberParam,
  });

  const { selected } = queryParams || {};

  const openProfile = saloonId =>
    setQueryParams({
      selected: "profile",
      saloonId: saloonId,
    });

  const openServices = saloonId =>
    setQueryParams({
      selected: "services",
      saloonId: saloonId || 20772,
    });

  const openSessions = saloonId =>
    setQueryParams({
      selected: "sessions",
      saloonId,
    });

  const showLeftSection = !selected;

  return (
    <Container showLeftSection={showLeftSection}>
      <Left>
        <ProviderCard
          saloonId={1234}
          openProfile={openProfile}
          openSessions={openSessions}
          openServices={openServices}
        />
      </Left>
      <Right>
        <RightWrapper>
          {selected === "profile" ? (
            <About />
          ) : selected === "sessions" ? (
            <div>Show </div>
          ) : selected === "services" ? (
            <Services />
          ) : !isMobile ? (
            <About />
          ) : null}
        </RightWrapper>
      </Right>
    </Container>
  );
};

export default Experts;
