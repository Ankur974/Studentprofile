import React, { useState } from "react";
import styled from "styled-components";
import { Body2 } from "../../components/common/ui/Headings";
import FlexBox from "../../components/common/ui/FlexBox";
import { ServiceCard } from "./ServiceCard";
import { PRIMARY_800 } from "../../components/common/ui/colors";

const Wrapper = styled(FlexBox)`
  width: 100%;
`;
const Catogories = styled(FlexBox)`
  column-gap: 3rem;
  overflow-x: scroll;
`;
const CatogoryBanner = styled(FlexBox)`
  background-color: #eeebf1;
  padding: 1rem;
  justify-content:space-around;
`;
const OfferBox = styled(FlexBox)`
  background-color: ${PRIMARY_800};
  border-radius: 1.25rem;
  padding: 0.18em;
`;

const Services = () => {
    const [clicked, setClicked] = useState(false);
    const catogories = [
        {
            id: 1,
            pathdark: "/assets/dark-catogories-avatar.svg",
            active: true,
            bannerimg: "/assets/haircut.svg",
            bannerdesc: "Get a glowing skin!",
            offerDesc: "earn 5 care coins on each appointment",
            name: "Haircut",
            pathlight: "/assets/dark-catogories.svg",
            services: [
                {
                    id: 1,

                    label: "Shoulder Length Hair Cut",
                    desc: "This is line that talks about the details abbout the services.",
                    time: 45,
                    ratings: 4,
                    reviews: 198,
                    prize: 500,
                },
                {
                    id: 2,
                    label: "Shoulder Length Hair Cut",
                    desc: "This is line that talks about the details abbout the services.",
                    time: 45,
                    ratings: 4,
                    reviews: 198,
                    prize: 500,
                },
                {
                    id: 3,
                    label: "Shoulder Length Hair Cut",
                    desc: "This is line that talks about the details abbout the services.",
                    time: 45,
                    ratings: 4,
                    reviews: 198,
                    prize: 500,
                },
            ],
        },
        {
            id: 2,
            pathdark: "/assets/dark-catogories-avatar.svg",
            active: false,
            name: "facial",
            bannerdesc: "Get a glowing skin!",
            offerDesc: "earn 5 care coins on each appointment",
            bannerimg: "/assets/makeup.svg",
            pathlight: "/assets/light-catogories-avatar.svg",
            services: [
                {
                    id: 1,
                    label: "Shoulder Length Hair Cut",
                    desc: "This is line that talks about the details abbout the services.",
                    time: 45,
                    ratings: 4,
                    reviews: 198,
                    prize: 500,
                },
            ],
        },
        {
            id: 3,
            pathdark: "/assets/dark-catogories-avatar.svg",
            active: false,
            bannerimg: "/assets/others.svg",
            bannerdesc: "Get a glowing skin!",
            offerDesc: "earn 5 care coins on each appointment",
            name: "others",
            pathlight: "/assets/light-catogories-avatar.svg",
            services: [
                {
                    id: 1,
                    label: "Shoulder Length Hair Cut",
                    desc: "This is line that talks about the details abbout the services.",
                    time: 45,
                    ratings: 4,
                    reviews: 198,
                    prize: 500,
                },
            ],
        },
    ];

    return (
        <Wrapper rowGap="10px" column>
            <Catogories>
                {catogories.map(item => (
                    <FlexBox column key={item.id} align="center">
                        {item.active ? (
                            <img src={item.pathdark} width="80px" height="80px" />
                        ) : (
                            <img src={item.pathlight} width="100px" height="100px" />
                        )}
                        <Body2>{item.label}</Body2>
                    </FlexBox>
                ))}
            </Catogories>
            <FlexBox column width="100%">
                {catogories?.map(category => {
                    return (
                        <>
                            <CatogoryBanner>
                                <img src={category?.bannerimg} />
                                <FlexBox column align="center">
                                    <Body2>{category?.bannerdesc}</Body2>
                                    <OfferBox>
                                        <Body2>{category?.offerDesc}</Body2>
                                    </OfferBox>
                                </FlexBox>
                            </CatogoryBanner>
                            {category?.services?.map(item => (
                                <ServiceCard key={item.id} clicked={clicked} item={item} />
                            ))}
                        </>
                    );
                })}
            </FlexBox>
        </Wrapper>
    );
};
export default Services;
