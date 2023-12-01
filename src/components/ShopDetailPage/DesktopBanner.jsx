import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Body1 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import { ACCENT_0, ACCENT_200 } from "@common/ui/colors";
import SalonInfo from "./SalonInfo";

const Wrapper = styled(FlexBox)`
  width: calc(100% - 0.5rem);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const GroupImage = styled(FlexBox)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  position: relative;
`;

const GrpImg = styled.img`
  width: ${({ numOfImages, index }) =>
    numOfImages % 2 === 1 && index === numOfImages - 1
      ? "100%"
      : numOfImages === 1
      ? "100%"
      : "calc(50% - 0.5rem)"};
  margin-bottom: ${({ numOfImages, index }) =>
    numOfImages === 1 || (numOfImages % 2 === 1 && index === numOfImages - 1)
      ? "0.5rem"
      : "unset"};
`;

const ViewMoreButton = styled.div`
  position: absolute;
  bottom: 10px;
  right: 8%;
  transform: translateX(-50%);
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
  background-color: ${ACCENT_0};
  cursor: pointer;

  :hover {
    background-color: ${ACCENT_200};
  }
`;

const images = [
  "/assets/salon-image1.jpg",
  "/assets/salon-image2.jpg",
  "/assets/salon-image3.jpg",
  "/assets/images/banner-new.svg",
  "/assets/images/banner-new.svg",
];

const DesktopBanner = () => {
  const router = useRouter();
  const numOfImages = images.length;

  return (
    <Wrapper>
      <SalonInfo />
      <GroupImage>
        {images.map((item, index) => (
          <GrpImg key={index} src={item} alt="" numOfImages={numOfImages} />
        ))}
        <ViewMoreButton onClick={() => router.push("/shop-details/carousel")}>
          <Body1 bold>Show more</Body1>
        </ViewMoreButton>
      </GroupImage>
    </Wrapper>
  );
};

export default DesktopBanner;
