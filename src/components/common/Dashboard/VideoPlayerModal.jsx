import React from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";

import FlexBox from "@common/ui/FlexBox";
import { WHITE } from "@common/ui/colors";
import VideoPlayer from "./VideoPlayer";
import ClientOnlyPortal from "./ClientOnlyPortal";

const VideoContainer = styled(FlexBox)`
  width: 66.67%;
  max-width: 68.5%;
  aspect-ratio: 1.78;

  @media only screen and (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
`;

const VideoWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  @media only screen and (max-width: 768px) {
    background-color: rgba(0, 0, 0);
  }
`;

const CloseIcon = styled(FlexBox)`
  top: 2.5rem;
  right: 2.5rem;
  width: 2.75rem;
  height: 2.75rem;
  z-index: 101;
  cursor: pointer;
  position: absolute;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${WHITE};

  @media only screen and (max-width: 768px) {
    top: 1.5rem;
    right: 1.5rem;
    width: 2rem;
    height: 2rem;
  }
`;

const VideoPlayerModal = ({ toggleVideoPlayer, videoUrl }) => {
  return (
    <ClientOnlyPortal selector="#modalPortal">
      <VideoWrapper>
        <CloseIcon onClick={toggleVideoPlayer}>
          <FiX size="1.25rem" strokeWidth="2.5" color="var(--primary)" />
        </CloseIcon>
        <VideoContainer>
          <VideoPlayer src={videoUrl} newPlayIcon />
        </VideoContainer>
      </VideoWrapper>
    </ClientOnlyPortal>
  );
};

export default VideoPlayerModal;
