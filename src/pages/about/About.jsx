import React from "react";
import { Body1, Body2, H2 } from "../../components/common/ui/Headings";
import styled from "styled-components";
import FlexBox from "../../components/common/ui/FlexBox"
import Chip from "../../components/common/ui/Chips";
import Ratings from "../../components/common/ui/Ratings";
import { GiCircle } from "react-icons/gi";
import { RiArrowDownSLine } from "react-icons/ri";
const Wrapper = styled(FlexBox)`
  width:100%;
  max-width:75rem;
  margin:auto;
  gap:0.3rem;
`;

const About = () => {
    const aminities = [
        {
            id: 1,
            name: "Pet Friendly",
        },
        {
            id: 2,
            name: "Air Conditioner",
        },
        {
            id: 3,
            name: "Hyegine Assurance",
        }
    ]
    const reviews = [
        {
            id: 1,
            date: "2023-09-12",
            name: "John Doe",
            review: "I had a great experience with the pet-friendly amenities. My dog loved it!",
            path: "/assets/Avatar.svg"
        },
        {
            id: 2,
            date: "2023-09-11",
            name: "Jane Smith",
            review: "The air conditioner was a lifesaver during the hot summer days.",
            path: "/assets/Avatar.svg"
        },
        {
            id: 3,
            date: "2023-09-10",
            name: "Alice Johnson",
            review: "I appreciated the hygiene assurance measures in place. It made me feel safe.",
            path: "/assets/Avatar.svg"
        },
    ];

    return (
        <Wrapper column>
            <Body2>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa iste
                dignissimos voluptates at corporis, aut doloremque vel perferendis,
                repellendus quae corrupti dolores pariatur, consequatur facilis rem quos
                deserunt commodi. A ratione necessitatibus ea excepturi porro.
            </Body2>
            <FlexBox columnGap="1.5rem">
                {
                    aminities.map((item) => <Chip key={item.id} width="7.3rem" >
                        <Body2>{item.name}</Body2>
                    </Chip>
                    )
                }
            </FlexBox>

            <H2 bold>Timimgs</H2>
            <FlexBox align="center" columnGap="0.4rem">
                <GiCircle color="green" background-color="green" />
                <Body2>Open today at 9am - 7pm</Body2>
                <RiArrowDownSLine width="2rem" height="2rem" />

            </FlexBox>
            <H2 bold>Ratings</H2>
            <FlexBox border="1px dashed #533A71" borderRadius="10px" justify="center" align="center" column height="9.375rem">
                <H2>4.2</H2>
                <Ratings />
                <Body2>20 visitor Ratings</Body2>

            </FlexBox>
            <H2 bold>Reviews(20)</H2>
            <FlexBox column>
                {
                    reviews.map(item =>
                        <FlexBox column key={item.id}>
                            <FlexBox row justify="space-between">
                                <FlexBox columnGap="0.5rem">
                                    <img src={item.path} />
                                    <FlexBox column>
                                        <H2 bold>{item.name}</H2>
                                        <Body2>{item.date}</Body2>
                                    </FlexBox>
                                </FlexBox>
                                <Ratings />
                            </FlexBox>
                            <Body2>{item.review}</Body2>
                        </FlexBox>
                    )
                }
            </FlexBox>
        </Wrapper>
    )
}
export default About;
