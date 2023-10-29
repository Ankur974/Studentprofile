import styled from "styled-components";
import { IoPlaySharp } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";

import FlexBox from "@common/ui/FlexBox";

const VideoWrapper = styled(FlexBox)`
  width: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 1rem;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    border-radius: unset;
  }
`;

const Video = styled.video`
  width: 100%;
  object-fit: cover;
`;

const PlayPause = styled(FlexBox)`
  top: 50%;
  left: 50%;
  width: 5.5rem;
  height: 5.5rem;
  padding: 0.5rem;
  cursor: pointer;
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--accent-100);
  box-shadow: 0px 0px 8px 8px rgba(0, 0, 0, 0.08);

  svg {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-40%, -45%);
  }
`;

const dummyURL =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const PlayIcon = styled(FlexBox)`
  width: 5.5rem;
  height: 5.5rem;
  background-color: rgba(255, 255, 255, 0.4);
  position: absolute;
  z-index: 10;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  place-content: center;
  border-radius: 50%;
  cursor: pointer;
`;

const VideoPlayer = ({ src, newPlayIcon = false }) => {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  const togglePlay = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    if (videoRef?.current) {
      if (isPlaying && !isBuffering) {
        videoRef?.current?.play();
      } else videoRef.current.pause();
    }
  }, [isPlaying, videoRef, isBuffering]);

  return (
    <VideoWrapper>
      <Video
        controls
        playsInline
        ref={videoRef}
        noPlayBackRate
        src={src || dummyURL}
        disablePictureInPicture
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedData={() => setIsBuffering(false)}
        controlsList="nodownload noremoteplayback noplaybackrate"
      />

      {!isBuffering && !isPlaying && (
        <>
          {newPlayIcon ? (
            <PlayIcon onClick={togglePlay}>
              <FaPlay size="2rem" color="white" />
            </PlayIcon>
          ) : (
            <PlayPause onClick={togglePlay}>
              <IoPlaySharp size="2.75rem" color="var(--primary)" />
            </PlayPause>
          )}
        </>
      )}
    </VideoWrapper>
  );
};

export default VideoPlayer;
