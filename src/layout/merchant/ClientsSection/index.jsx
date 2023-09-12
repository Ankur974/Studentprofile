import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { boxShadowDs1 } from "../../../components/common/UI/styles";
import ClientsList from "../../components/Clients/ClientsList";
import ProfileChat from "../../components/Clients/ProfileChat";
import { ACCENT_100, ACCENT_300 } from "../../../components/common/colors";
import { useDispatch } from "react-redux";
import { fetchProfileData } from "../../../Store/Actions";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${ACCENT_300};
  padding: 1.5rem;
  overflow: hidden;
`;

const Main = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: calc(30% - 0.75rem) calc(70% - 0.75rem) calc(
      40% - 0.75rem
    );
  grid-template-rows: 100%;
  column-gap: 1.5rem;
  transform: translateX(0%);
  transition: all 500ms ease-in-out;

  ${({ isChatOpen }) =>
    isChatOpen &&
    css`
      grid-template-columns: calc(30% - 0.75rem) calc(60% - 0.75rem) calc(
          40% - 0.75rem
        );
      transform: translateX(calc(-30% - 0.75rem));
    `}
`;

const LeftSection = styled.div`
  min-width: 15rem;
  background-color: ${ACCENT_100};
  border-radius: 1rem;
  overflow: hidden;
  transition: all 500ms ease-in-out;
  ${boxShadowDs1}

  ${({ isChatOpen }) =>
    isChatOpen &&
    css`
      opacity: 0;
      visibility: 0;
      box-shadow: none;
    `}
`;

const CenterSection = styled.div`
  min-width: 42rem;
  background-color: ${ACCENT_100};
  border-radius: 1rem;
  ${boxShadowDs1}
`;

const RightSection = styled.div`
  display: ${({ hideChat }) => (hideChat ? "none" : "block")};
  opacity: 0;
  box-shadow: none;
  min-width: 20rem;
  z-index: 1;
  background-color: ${ACCENT_100};
  border-radius: 1rem;
  overflow: hidden;
  transition: all 500ms ease-in-out;

  ${({ isChatOpen }) =>
    isChatOpen &&
    css`
      opacity: 1;
      ${boxShadowDs1}
    `}
`;

const ClientsLayout = ({ isChatOpen, closeChat, children }) => {
  const [hideChat, setHideChat] = useState(true);

  const dispatch = useDispatch();

  // hide chat when not in view to prevent layout issue
  useEffect(() => {
    if (isChatOpen) setHideChat(false);
    else if (!isChatOpen)
      setTimeout(() => {
        setHideChat(true);
      }, 500);
  }, [isChatOpen]);

  useEffect(() => {
    dispatch(fetchProfileData(true));
  }, []);

  return (
    <Container className="hide-scrollbar">
      <Main isChatOpen={isChatOpen}>
        <LeftSection isChatOpen={isChatOpen}>
          <ClientsList />
        </LeftSection>
        <CenterSection>{children}</CenterSection>
        <RightSection isChatOpen={isChatOpen} hideChat={hideChat}>
          <ProfileChat isChatOpen={isChatOpen} closeChat={closeChat} />
        </RightSection>
      </Main>
    </Container>
  );
};

export default ClientsLayout;
