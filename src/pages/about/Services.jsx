import React, { useState } from "react";
import styled from "styled-components";
import { Body2 } from "../../components/common/ui/Headings";
import FlexBox from "../../components/common/ui/FlexBox";
import { device } from "../../components/common/ui/Resposive";
import { ServiceCard } from "./ServiceCard";

const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width: 23.75rem;
`;
const Catogories = styled(FlexBox)`
  column-gap: 3rem;
  overflow-x: scroll;

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
      id: 4,
      pathdark: "/assets/dark-catogories-avatar.svg",
      active: false,
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
      id: 5,
      pathdark: "/assets/dark-catogories-avatar.svg",
      active: false,
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
              <Body2>{category?.pathdark}</Body2> //todo - render banner here
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
