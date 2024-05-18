import React from "react";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { device } from "@common/ui/Responsive";
import SalonInfo from "./SalonInfo";
import ImageWithFallback from "@common/ImageWithFallback";

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

const Img = styled(ImageWithFallback)`
  width: 100%;
  object-fit: cover;
`;

const GrpImg = styled(ImageWithFallback)`
  width: 47%;
  height: 50%;
  object-fit: cover;
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
          <Img
            width="100%"
            fallbackSrc="/assets/images/fallback.webp"
            src={thumbnail?.imageUrl}
            alt="thumbnail image"
          />
        </FlexBox>
        <GroupImage>
          {shopData?.storeImages?.slice(1)?.map((image, index) => (
            <GrpImg
              key={index}
              src={image?.imageUrl}
              fallbackSrc="/assets/images/fallback.webp"
              alt="store images"
            />
          ))}
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
