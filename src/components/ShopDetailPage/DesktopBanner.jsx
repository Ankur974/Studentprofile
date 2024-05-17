import React from "react";
import styled from "styled-components";
// import { useRouter } from "next/router";

import FlexBox from "@common/ui/FlexBox";
import { device } from "@common/ui/Responsive";
// import { ACCENT_300, ACCENT_800 } from "@common/ui/colors";
import SalonInfo from "./SalonInfo";

const Wrapper = styled(FlexBox)`
  display: none;
  @media ${device.laptop} {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
`;

const Container = styled(FlexBox)`
  display: none;
  @media ${device.laptop} {
    max-height: 63vh;
    display: flex;
    column-gap: 0.5rem;
    flex-direction: row;
    position: relative;
  }
`;

const GroupImage = styled(FlexBox)`
  width: 60%;
  max-height: 62vh;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const GrpImg = styled.img`
  width: 47%;
  height: 50%;
  object-fit: cover;
`;

const NullImg = styled.img`
  width: 47%;
  height: 50%;
`;

// const ShowMoreCta = styled.div`
//   background-color: ${ACCENT_300};
//   color: ${ACCENT_800};
//   width: fit-content;
//   position: absolute;
//   bottom: 2%;
//   right: 3%;
//   align-items: center;
//   justify-content: center;
//   padding: 0.5rem;
//   border-radius: 0.5rem;
//   cursor: pointer;
//   font-weight: 600;
// `;

const DesktopBanner = ({ shopData, scrollToElement }) => {
  // const router = useRouter();

  const thumbnail = shopData?.storeImages?.filter(
    image => image?.isThumbnail
  )?.[0];

  return (
    <Wrapper>
      <SalonInfo shopData={shopData} scrollToElement={scrollToElement} />
      <Container>
        <FlexBox width="65%" height="63vh">
          {thumbnail?.imageUrl ? (
            <Img src={thumbnail?.imageUrl} alt="thumbnail image" />
          ) : (
            <img
              src={thumbnail?.imageUrl ?? "/assets/shopThumbNailDefault.webp"}
              alt="thumbnail image"
              width="100%"
            />
          )}
        </FlexBox>
        <GroupImage>
          {shopData?.storeImages
            ?.slice(1)
            ?.map((image, index) =>
              image?.imageUrl ? (
                <GrpImg key={index} src={image?.imageUrl} alt="store images" />
              ) : (
                <NullImg
                  key={index}
                  src="/assets/shopThumbNailDefault.webp"
                  alt="store images"
                />
              )
            )}
        </GroupImage>
        {/* TODO: to be implemented later */}
        {/* <ShowMoreCta onClick={() => router.push("/shop-details/images")}>
          Show More
        </ShowMoreCta> */}
      </Container>
    </Wrapper>
  );
};

export default DesktopBanner;
