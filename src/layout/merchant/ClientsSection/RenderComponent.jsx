import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../../components/common/UI/Loader";
import FlexBox from "../../../components/common/FlexBox";
import ProfileHeader from "../../components/Clients/ProfileHeader";

const RenderComponent = ({
  component: Component,
  showProfileHeader,
  isChatOpen,
  openChat,
}) => {
  const { client } = useParams();

  const isClientProfileLoading = useSelector(
    state => state.client.clientProfileLoading
  );

  const showLoader = !client || isClientProfileLoading;
  if (showLoader) return <Loader />;
  if (showProfileHeader)
    return (
      <FlexBox column height="100%">
        <ProfileHeader isChatOpen={isChatOpen} openChat={openChat} />
        <Component />
      </FlexBox>
    );
  return <Component />;
};

export default RenderComponent;
