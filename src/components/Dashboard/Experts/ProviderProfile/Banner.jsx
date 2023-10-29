import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FiX } from "react-icons/fi";
import { IoPlay } from "react-icons/io5";

import FlexBox from "@common/ui/FlexBox";
import {
  ACCENT_800,
  WHITE,
  LIGHT_YELLOW,
  ACCENT_200,
  ACCENT_100,
} from "@common/ui/colors";
import { H2, H3, H6 } from "@common/ui/Headings";
import VideoPlayerModal from "@common/Dashboard/VideoPlayerModal";

const BannerContainer = styled(FlexBox)`
  width: 100%;
  min-height: 15rem;
  height: 15rem;

  ${({ bgUrl }) =>
    bgUrl &&
    css`
      background-image: url(${bgUrl});
      background-size: cover;
    `}

  * {
    box-sizing: border-box;
  }

  @media only screen and (max-width: 768px) {
    min-height: 11.25rem;
    height: 11.25rem;
    aspect-ratio: 0.56;
  }
`;

const GradientOverlay = styled(FlexBox)`
  top: 0;
  left: 0;
  height: 100%;
  position: absolute;

  ${({ hasVideoThumb }) =>
    hasVideoThumb &&
    css`
      background: rgba(0, 0, 0, 0.4) !important;
      background-blend-mode: multiply;
    `}
`;

const PlayButton = styled(FlexBox)`
  top: 50%;
  left: 50%;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  transition: transform 200ms ease-in-out;
  transform: translate(-50%, -50%) scale(1);
  z-index: 20;
  align-items: center;
  justify-content: center;

  :hover {
    transform: translate(-50%, -50%) scale(1.1);
  }

  @media only screen and (max-width: 768px) {
    top: 40%;
  }
`;

const ProfileWrapper = styled.div`
  position: absolute;
  top: 43%;

  @media only screen and (max-width: 768px) {
    top: 36%;
  }
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const CloseButton = styled(FlexBox)`
  height: 2rem;
  aspect-ratio: 1;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  color: ${ACCENT_800};
  :hover {
    background-color: ${ACCENT_200};
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 10rem;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 24rem;
  overflow: hidden;
  border: 0.25rem solid ${WHITE};
`;

const CfTag = styled(FlexBox)`
  background-color: ${LIGHT_YELLOW};
  width: fit-content;
  padding: 0.25rem 0.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border-radius: 1rem;
  height: fit-content;
  cursor: pointer;
`;

const Banner = ({ fullName, providerData, designation, closeProfile }) => {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const isCfProvider = true; //TODO - to be update while api integration
  const hasVideoThumb = !!providerData?.video_thumb;

  const fixedEncodeURIComponent = str => {
    return encodeURI(str).replaceAll(/[!'()*]/g, function (c) {
      return "%" + c.charCodeAt(0).toString(16);
    });
  };

  const toggleVideoPlayer = () => setShowVideoPlayer(prev => !prev);

  return (
    <BannerContent>
      {showVideoPlayer && (
        <VideoPlayerModal
          toggleVideoPlayer={toggleVideoPlayer}
          videoUrl={providerData?.video || ""}
        />
      )}
      <FlexBox
        width="100%"
        padding="1.5rem"
        align="center"
        justify="space-between"
      >
        <H2 bold>{fullName}</H2>
        <CloseButton onClick={closeProfile}>
          <FiX strokeWidth={2} size="1.25rem" data-testid="close-profile-btn" />
        </CloseButton>
      </FlexBox>
      <BannerContainer
        bgUrl={
          providerData?.video_thumb
            ? fixedEncodeURIComponent(providerData?.video_thumb)
            : "/assets/images/profile/no-video.png"
        }
      >
        <GradientOverlay hasVideoThumb={hasVideoThumb} />
        {providerData?.video && (
          <PlayButton onClick={toggleVideoPlayer}>
            <IoPlay color={ACCENT_100} />
          </PlayButton>
        )}
      </BannerContainer>
      <ProfileWrapper>
        <ProfileImage
          alt={fullName}
          draggable="false"
          src={`https:${providerData?.image}`}
        />
      </ProfileWrapper>
      <FlexBox
        column
        width="100%"
        padding="1rem 1.5rem"
        margin="5rem auto 0"
        rowGap="0.5rem"
        align="center"
      >
        {isCfProvider && (
          <CfTag>
            <img src="/assets/images/cf-logo.svg" alt="children's first logo" />
            <H6
              textTransform="uppercase"
              bold
              spacing="0.1rem"
              textAlign="center"
            >
              Children First Expert
            </H6>
          </CfTag>
        )}

        <H3 bold>
          {providerData?.registration_number
            ? `Reg. No.: ${providerData?.registration_number}`
            : designation}
        </H3>
        <H3 bold>M.A, M.Phil, M.Sc</H3>
        <H3 bold>Starts at ₹ 500 for 30 mins</H3>
      </FlexBox>
    </BannerContent>
  );
};

export default Banner;
