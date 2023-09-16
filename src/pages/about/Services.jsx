import React, { useState } from "react";
import styled from "styled-components";
import { Body2, H2, H3, H4 } from "../../components/common/ui/Headings";
import FlexBox from "../../components/common/ui/FlexBox";
import { ACCENT_0, PRIMARY_800, SECONDARY_800 } from "../../components/common/ui/colors";
import { SlClock, SlStar } from "react-icons/sl";
import { Button } from "../../components/common/ui/Buttons";
import { device } from "../../components/common/ui/Resposive";

const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width:23.75rem;
  
`;
const Card = styled(FlexBox)`
  border-radius: 5px;
  padding-bottom: 20px;
  row-gap: 3px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${SECONDARY_800};
`;
const BorderBox = styled.div`
  width: 0.5rem;
  height: 9.4rem;
  background-color: ${PRIMARY_800};
  border-radius:5px;
`;
const Catogories = styled(FlexBox)`
  column-gap: 3rem;
  overflow-x:scroll;

  /* @media ${device.laptop}{
    overflow:hidden;
  } */
`;

const Services = () => {
    const [clicked, setClicked] = useState(false);
    const catogories = [
        {
            id: 1,
            pathdark: "/assets/dark-catogories-avatar.svg",
            active: true,
            pathlight: "/assets/dark-catogories.svg"
        },
        {
            id: 2,
            pathdark: "/assets/dark-catogories-avatar.svg",
            active: false,
            pathlight: "/assets/light-catogories-avatar.svg",
        },
        {
            id: 3,
            pathdark: "/assets/dark-catogories-avatar.svg",
            active: false,
            pathlight: "/assets/light-catogories-avatar.svg",
        },
        {
            id: 4,
            pathdark: "/assets/dark-catogories-avatar.svg",
            active: false,
            pathlight: "/assets/light-catogories-avatar.svg",
        },
        {
            id: 5,
            pathdark: "/assets/dark-catogories-avatar.svg",
            active: false,
            pathlight: "/assets/light-catogories-avatar.svg",
        },
    ]
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
            label: "Shoulder Length Hair Cut",
            desc: "This is line that talks about the details abbout the services.",
            time: 45,
            ratings: 4,
            reviews: 198,
            prize: 500,

        },


    ];
    function add() {
        console.log("Hello World");
        setClicked(true);
    }
    return (
        <Wrapper rowGap="10px" column>
            <Catogories>
                {catogories.map(item => (

                    <FlexBox column key={item.id} align="center">
                        {item.active ? <img src={item.pathdark} width="80px" height="80px" /> : <img src={item.pathlight} width="100px" height="100px" />}
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
                                onClick={add}
                                hoverColor="none"
                            >
                                {clicked ?
                                    <FlexBox columnGap="0.7rem" >
                                        <H3 bold color={ACCENT_0}>+</H3>
                                        <H3 bold color={ACCENT_0}>1</H3>
                                        <H3 bold color={ACCENT_0}>-</H3>
                                    </FlexBox>
                                    : <Body2 bold color={ACCENT_0}>Add</Body2>}
                            </Button>
                        </FlexBox>
                    </Card>

                ))}
            </FlexBox>
        </Wrapper>
    );
};
export default Services;
