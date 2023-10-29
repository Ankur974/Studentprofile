import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styled from "styled-components";
import { NumberParam, StringParam, useQueryParams } from "use-query-params";

import FlexBox from "@common/ui/FlexBox";
import { Loader } from "@common/Loader";
import DashboardLayout from "@components/Dashboard/Layout";
import { DAVYS_GREY_300 } from "@common/ui/colors";
import useMobileView from "@hooks/useMobileView";
import ProviderCard from "./ProviderCard";

const Services = dynamic(() => import("./Services"), {
  loading: () => <Loader />,
  ssr: false,
});

const Chat = dynamic(() => import("./Chat"), {
  loading: () => <Loader />,
  ssr: false,
});

const ProviderProfile = dynamic(() => import("./ProviderProfile"), {
  loading: () => <Loader />,
  ssr: false,
});

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 1.5rem;
  column-gap: 1.5rem;
  background-color: ${DAVYS_GREY_300};
  @media screen and (max-width: 768px) {
    width: 100vw;
    padding: 0;
    position: fixed;
    column-gap: 0;
    transform: ${({ showLeftSection }) =>
      showLeftSection ? "translateX(0)" : "translateX(-100vw)"};
    transition: all 0.2s ease-in-out;
    overflow-x: visible;
  }
`;

const Card = styled(FlexBox)`
  background-color: #ffffff;
  box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.04);
  border-radius: 1rem;
  width: 49%;
  flex-direction: column;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    box-shadow: unset;
    border-radius: 0;
    width: 50%;
  }
`;

const Left = styled(Card)`
  flex: 1;
  padding: 1.5rem;

  @media screen and (max-width: 768px) {
    width: 100vw;
    flex: none;
  }
`;

const Right = styled(Card)`
  flex: 1;

  @media screen and (max-width: 768px) {
    flex: none;
    width: 100vw;
  }
`;

const Experts = () => {
  const isMobile = useMobileView();
  const router = useRouter();

  const [queryParams, setQueryParams] = useQueryParams({
    selected: StringParam,
    providerId: NumberParam,
  });

  const { selected } = queryParams || {};

  const openChat = providerId =>
    setQueryParams({
      selected: "chat",
      providerId: providerId || 20772,
      pFbId: "ndqzVxrgog6EACxRq-_YTRUrP5xz",
    });

  const openProfile = providerId =>
    setQueryParams({
      selected: "profile",
      providerId,
    });

  const openSessionsAndTools = providerId =>
    setQueryParams({
      selected: "session-tools",
      providerId,
    });

  const showLeftSection = !selected;

  return (
    <DashboardLayout
      hideHeader={isMobile && !showLeftSection}
      hideFooter={!showLeftSection}
      hideChat
      title="Experts"
    >
      <Container showLeftSection={showLeftSection}>
        <Left>
          <ProviderCard
            providerId={1234}
            openChat={openChat}
            openProfile={openProfile}
            openSessionsAndTools={openSessionsAndTools}
          />
        </Left>
        <Right>
          {selected === "chat" ? (
            <Chat closeChat={router.back} />
          ) : selected === "profile" ? (
            <ProviderProfile />
          ) : selected === "session-tools" ? (
            <div>Show Sessions, tools, prescriptions</div>
          ) : !isMobile ? (
            <Services />
          ) : null}
        </Right>
      </Container>
    </DashboardLayout>
  );
};

export default Experts;
