import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { SlSymbolFemale } from "react-icons/sl";
import { AiFillStar } from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";
// import { useRouter } from "next/router";
import { Body2, H1 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import { ACCENT_800 } from "@common/ui/colors";
import Favourite from "@common/ui/Favourite";
import Modal from "../common/ui/Modal";
import ShareModal from "./ShareModal";
import { device } from "../common/ui/Resposive";

const BannerContent = styled(FlexBox)`
  width: 100%;
  padding-inline: 1rem;

  @media ${device.laptop} {
    max-width: 75rem;
    padding-block: 0.5rem;
  }
`;

const ContentWrapper = styled(FlexBox)`
  gap: 0.25rem;
  flex-direction: column;

  @media ${device.laptop} {
    gap: 1rem;
    flex-direction: row;
  }
`;

const Icons = styled(FlexBox)`
  column-gap: 0.5rem;
`;

const SalonInfo = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [Clicked, setClicked] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      const mobileWidthThreshold = 1024;
      setIsMobile(window.innerWidth < mobileWidthThreshold);
    };

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleShareFallback = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("URL copied to clipboard");
      })
      .catch(error => {
        console.error("Failed to copy URL to clipboard:", error);
      });
  };
  const handleShare = async () => {
    console.log(navigator.share);
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Gigis Salon",
          text: "Check out Gigis Salon!",
          // url: window.location.href,
          url: "this is ",
        });
      } catch (error) {
        console.error("Error sharing:", error);
        handleShareFallback();
      }
    } else {
      console.log("Native sharing not supported.");
      handleShareFallback();
    }
  };

  return (
    <BannerContent column rowGap="0.25rem">
      <FlexBox align="center" justify="space-between">
        <H1 bold>Gigis Salon</H1>
        <Icons>
          <FaRegShareSquare
            color={ACCENT_800}
            size="20px"
            onClick={() => {
              if (!isMobile) {
                setOpenModal(!openModal);
              } else {
                handleShare();
              }
            }}
          />
          {openModal && (
            <Modal
              M1
              height="20%"
              width="40%"
              togglePopup={openModal}
              children={<ShareModal setOpenModal={setOpenModal} />}
            />
          )}
          <Favourite clicked={Clicked} setclicked={setClicked} />
        </Icons>
      </FlexBox>
      <ContentWrapper>
        <FlexBox columnGap="0.25rem" align="center">
          <Body2>Salon for Men</Body2>
          {/* <SlSymbolFemale /> */}
        </FlexBox>
        <FlexBox columnGap="0.5rem">
          <FlexBox columnGap="0.25rem" align="center">
            <AiFillStar color="black" />
            <Body2 bold>4.2</Body2>
          </FlexBox>
          <Body2 bold>|</Body2>
          <Body2 bold textDecoration="underline">
            23 Reviews
          </Body2>
          <Body2 bold textDecoration="underline">
            Kolkata, West Bengal India
          </Body2>
        </FlexBox>
      </ContentWrapper>
    </BannerContent>
  );
};

export default SalonInfo;
