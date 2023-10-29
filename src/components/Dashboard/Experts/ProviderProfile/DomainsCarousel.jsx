import React, { memo } from "react";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { PSYCHIATRIST } from "@constants";
import { domainareas_images } from "@metadata/domainareas_images";
import { H3, H6 } from "@common/ui/Headings";

const CarouselBody = styled(FlexBox)`
  width: calc(100% + 3rem);
  gap: 1rem;
  overflow-x: scroll;
  margin-left: -1.5rem;
  padding-inline: 1.5rem;
`;

const OfferingBox = styled(FlexBox)`
  height: fit-content;
`;

const OfferingVisual = styled.img`
  width: 4.5rem;
  border-radius: 0.75rem;
`;

const DomainsCarousel = ({ providerData, providerType }) => {
  return (
    <FlexBox column justify="center" rowGap="1rem">
      <FlexBox align="center" columnGap="0.5rem">
        <img
          src="/assets/images/profile/domains-icon.svg"
          height="48px"
          width="48px"
          alt="Domains Icon"
        />
        <H3 bold>
          I offer {providerType === PSYCHIATRIST ? "psychiatry" : "therapy"} for
        </H3>
      </FlexBox>
      <CarouselBody className="hide-scrollbar">
        {providerData?.domainareas?.map((item, index) => {
          const imageIndex = domainareas_images.findIndex(
            image => image.slug === item.slug
          );
          if (imageIndex > -1)
            return (
              <OfferingBox
                key={index}
                align="center"
                column
                rowGap="1rem"
                justify="start"
              >
                <OfferingVisual
                  src={domainareas_images[imageIndex]?.image_path}
                  alt={item.name}
                />
                <H6 bold textAlign="center">
                  {domainareas_images[index]?.slug ===
                  "bipolar-affective-disorder"
                    ? domainareas_images[index].name
                        .split(" ")
                        .map((text, id) => (
                          <div key={`${id}text`} textAlign="center">
                            {text}
                          </div>
                        ))
                    : item.name}
                </H6>
              </OfferingBox>
            );
        })}
      </CarouselBody>
    </FlexBox>
  );
};

export default memo(DomainsCarousel);
