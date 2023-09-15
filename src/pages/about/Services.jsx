import React from "react";
import styled from "styled-components";
import { Body2, H2, H3 } from "../../components/common/ui/Headings";
import FlexBox from "../../components/common/ui/FlexBox";
import { PRIMARY_800, SECONDARY_800 } from "../../components/common/ui/colors";
import { SlClock, SlStar } from "react-icons/sl";
import { Button } from "../../components/common/ui/Buttons";

const Wrapper = styled(FlexBox)`
  width: 100%;
`;
const Card = styled(FlexBox)`
  border-radius: 5px;
  padding-bottom: 20px;
  row-gap: 3px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${SECONDARY_800};
`;
const BorderBox = styled(FlexBox)`
  width: 2rem;
  height: 100%;
  background-color: ${PRIMARY_800};
`;
const Catogories = styled(FlexBox)`
  column-gap: 3rem;
`;
const Services = () => {
    const services = [
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
            label: "Facial Makeup",
            desc: "This is line that talks about the details abbout the services.",
            time: 45,
            ratings: 4,
            reviews: 198,
            prize: 500,
        },
        {
            id: 4,
            label: "Bridal Makeup",
            desc: "This is line that talks about the details abbout the services.",
            time: 45,
            ratings: 4,
            reviews: 198,
            prize: 500,
        },
    ];
    const catogories = [
        {
            id: 1,
            label: "HairCut",
            path: "/assets/catogories-avatar.svg",
        },

        {
            id: 2,
            label: "HairCut",
            path: "/assets/catogories-avatar.svg",
        },

        {
            id: 3,
            label: "HairCut",
            path: "/assets/catogories-avatar.svg",
        },
    ];
    return (
        <Wrapper rowGap="10px" column>
            <Catogories>
                {catogories.map(item => (
                    <FlexBox column key={item.id} align="center">
                        <img src={item.path} width="80px" height="80px" />
                        <Body2>{item.label}</Body2>
                    </FlexBox>
                ))}
            </Catogories>
            <FlexBox column width="100%">
                {services.map(item => (
                    <Card key={item.id}>
                        <BorderBox />
                        <FlexBox
                            row
                            width="100%"
                            justify="space-between"
                            padding="2rem"
                            align="center"
                        >
                            <FlexBox column>
                                <H2 bold>{item.label}</H2>
                                <H3>{item.desc}</H3>
                                <FlexBox columnGap="1rem" align="center">
                                    <FlexBox columnGap="0.4rem" align="center">
                                        <SlClock />
                                        <H3>{item.time} mins</H3>
                                    </FlexBox>
                                    <FlexBox columnGap="0.4rem" align="center">
                                        <SlStar />
                                        <H3>({item.ratings})</H3>
                                        <H3>{item.reviews}</H3>
                                    </FlexBox>
                                </FlexBox>
                                <H3 bold>₹ {item.prize}</H3>
                            </FlexBox>
                            <Button
                                color={SECONDARY_800}
                                width="5.5rem"
                                height="2.5rem"
                                align="center"
                                justify="center"
                                borderRadius="0.6rem"
                            >
                                Add
                            </Button>
                        </FlexBox>
                    </Card>
                ))}
            </FlexBox>
        </Wrapper>
    );
};
export default Services;
