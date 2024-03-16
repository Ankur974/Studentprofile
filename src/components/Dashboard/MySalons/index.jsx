import styled from "styled-components";
import { NumberParam, StringParam, useQueryParams } from "use-query-params";
import { useRouter } from "next/router";
import { FiX } from "react-icons/fi";

import FlexBox from "@common/ui/FlexBox";
import { device } from "@common/ui/Resposive";
import { ACCENT_300, WHITE } from "@common/ui/colors";
import useMobileView from "@hooks/useMobileView";
import SalonCard from "./SalonCard";
import About from "@components/ShopDetailPage/About";
import Services from "@components/ShopDetailPage/Services";
import { H2 } from "@common/ui/Headings";

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
  background-color: ${WHITE};
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
  padding: 0 1.5rem 1.5rem 1.5rem;
  overflow-y: scroll;
`;

const Title = styled(FlexBox)`
  @media screen and (min-width: 768px) {
    border-bottom: 1px solid ${ACCENT_300};
    padding: 1.5rem;
  }
  padding: 0 1.5rem;
`;

const MySalons = () => {
  const isMobile = useMobileView();
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const [queryParams, setQueryParams] = useQueryParams({
    selected: StringParam,
    salonId: NumberParam,
  });

  const { selected } = queryParams || {};

  const openProfile = salonId =>
    setQueryParams({
      selected: "profile",
      salonId: salonId,
    });

  const openServices = salonId =>
    setQueryParams({
      selected: "services",
      salonId: salonId || 20772,
    });

  const openSessions = salonId =>
    setQueryParams({
      selected: "sessions",
      salonId,
    });

  return (
    <Container showLeftSection={!selected}>
      <Left>
        <SalonCard
          salonId={1234}
          openProfile={openProfile}
          openSessions={openSessions}
          openServices={openServices}
        />
      </Left>
      <Right>
        <Title justify="space-between" align="center" width="100%">
          <H2 bold>{"Gigi's Salon"}</H2>
          <FlexBox onClick={goBack}>
            <FiX />
          </FlexBox>
        </Title>
        <RightWrapper>
          {(() => {
            switch (selected) {
              case "profile":
                return <About />;
              case "sessions":
                return <div>Show</div>;
              case "services":
                return <Services />;
              case !isMobile && !selected:
                return <About />;
              default:
                return null;
            }
          })()}
        </RightWrapper>
      </Right>
    </Container>
  );
};

export default MySalons;
