import React, { useState } from "react";
import styled from "styled-components";

import FlexBox from "../common/ui/FlexBox";
import Filter from "../common/ui/Filter";
import Card from "./Card";
import { Display, H1, H3 } from "../common/ui/Headings";
import { ACCENT_500, PRIMARY_200 } from "../common/ui/colors";
import Approach from "../common/ApproachFaq";
import Chip from "../common/ui/Chips";
import FilterModal from "./FilterModal";
import SecondaryNav from "./SecondaryNav";
import { device } from "../common/ui/Resposive";

const metadata = [
  {
    id: 1,
    title: "Haircut For Man",
  },
  {
    id: 2,
    title: "Haircut For Woman",
  },
  {
    id: 3,
    title: "Makeup",
  },
  {
    id: 4,
    title: "Nails",
  },
  {
    id: 5,
    title: "Mainicure & Pedicure",
  },
  {
    id: 6,
    title: "Message Therapy",
  },
  {
    id: 7,
    title: "Hair Styling",
  },
  {
    id: 8,
    title: "Hair Coloring",
  },
];

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  max-width: 75rem;
  margin: auto;
  gap: 1.5rem;
  padding-block: 2rem;
  padding-inline: 1rem;

  @media ${device.laptop} {
    padding-inline: 0;
  }
`;

const ListWrapper = styled(FlexBox)`
  gap: 1rem;
  width: 100%;
  flex-wrap: wrap;
`;

const Banner = styled(FlexBox)`
  width: 100%;
  height: 12rem;
  align-items: center;
  justify-content: center;
  background-color: ${PRIMARY_200};
`;

const VR = styled.div`
  height: 100%;
  width: 1px;
  background-color: ${ACCENT_500};
`;

const Showappliedfilter = styled(FlexBox)`
  flex-direction: row;
  column-gap: 0.2rem;
  width: fit-content;
  align-self: end;

  @media ${device.laptop} {
    flex-direction: row;
    column-gap: 1rem;
  }
`;

const Filtercontainer = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  margin: auto;

  @media ${device.laptop} {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Toptitle = styled(FlexBox)`
  max-width: 75rem;
  padding: 0 2rem;
  align-items: center;
  justify-content: center;
`;

const ShopListingPage = () => {
  const [showFilter, setShowFilter] = useState(false);

  const toggleModal = () => setShowFilter(!showFilter);
  const Arr = [
    {
      name: "Gigis Salon",
      image: "/assets/salon-image1.jpg",
      popularity: "Popular",
      rating: 4.5,
      discount: 15,
      category: "Salon for Men",
      distance: 2,
      startingPrice: 350,
      amenities: [
        {
          id: 1,
          label: "Air conditioning",
        },
        {
          id: 12,
          label: "Parking",
        },
        {
          id: 2,
          label: "Kids Friendly",
        },
      ],
    },
    {
      name: "Chic Spa",
      image: "/assets/salon-image2.jpg",
      popularity: "New",
      rating: 4.0,
      discount: 20,
      category: "Spa",
      distance: 5,
      startingPrice: 500,
      amenities: [
        {
          id: 3,
          label: "Free Wi-Fi",
        },
        {
          id: 8,
          label: "Wheelchair Accessible",
        },
        {
          id: 6,
          label: "Refreshments",
        },
      ],
    },
    {
      name: "Elegance Beauty",
      image: "/assets/salon-image3.jpg",
      popularity: "Top Rated",
      rating: 4.8,
      category: "Beauty Salon",
      distance: 1,
      startingPrice: 250,
      amenities: [
        {
          id: 5,
          label: "Free Parking",
        },
        {
          id: 9,
          label: "Facial Treatments",
        },
        {
          id: 4,
          label: "Hair Styling",
        },
      ],
    },
    {
      name: "Relax Haven",
      image: "/assets/salon-image4.jpg",
      popularity: "New",
      rating: 4.2,
      discount: 10,
      category: "Relaxation Spa",
      distance: 3,
      startingPrice: 450,
      amenities: [
        {
          id: 7,
          label: "Sauna",
        },
        {
          id: 10,
          label: "Massage Therapy",
        },
        {
          id: 11,
          label: "Couples Packages",
        },
      ],
    },
    {
      name: "Trendy Cuts",
      image: "/assets/salon-image4.jpg",
      popularity: "Popular",
      rating: 4.7,
      category: "Hair Salon",
      distance: 4,
      startingPrice: 300,
      amenities: [
        {
          id: 13,
          label: "Coloring Services",
        },
        {
          id: 14,
          label: "Barber Services",
        },
        {
          id: 15,
          label: "Styling Consultation",
        },
      ],
    },
    {
      name: "Gigis Salon",
      image: "/assets/salon-image1.jpg",
      popularity: "Popular",
      rating: 4.5,
      discount: 15,
      category: "Salon for Men",
      distance: 2,
      startingPrice: 350,
      amenities: [
        {
          id: 1,
          label: "Air conditioning",
        },
        {
          id: 12,
          label: "Parking",
        },
        {
          id: 2,
          label: "Kids Friendly",
        },
      ],
    },
    {
      name: "Chic Spa",
      image: "/assets/salon-image2.jpg",
      popularity: "New",
      rating: 4.0,
      discount: 20,
      category: "Spa",
      distance: 5,
      startingPrice: 500,
      amenities: [
        {
          id: 3,
          label: "Free Wi-Fi",
        },
        {
          id: 8,
          label: "Wheelchair Accessible",
        },
        {
          id: 6,
          label: "Refreshments",
        },
      ],
    },
    {
      name: "Elegance Beauty",
      image: "/assets/salon-image3.jpg",
      popularity: "Top Rated",
      rating: 4.8,
      category: "Beauty Salon",
      distance: 1,
      startingPrice: 250,
      amenities: [
        {
          id: 5,
          label: "Free Parking",
        },
        {
          id: 9,
          label: "Facial Treatments",
        },
        {
          id: 4,
          label: "Hair Styling",
        },
      ],
    },
    {
      name: "Relax Haven",
      image: "/assets/salon-image4.jpg",
      popularity: "New",
      rating: 4.2,
      discount: 10,
      category: "Relaxation Spa",
      distance: 3,
      startingPrice: 450,
      amenities: [
        {
          id: 7,
          label: "Sauna",
        },
        {
          id: 10,
          label: "Massage Therapy",
        },
        {
          id: 11,
          label: "Couples Packages",
        },
      ],
    },
    {
      name: "Trendy Cuts",
      image: "/assets/salon-image4.jpg",
      popularity: "Popular",
      rating: 4.7,
      category: "Hair Salon",
      distance: 4,
      startingPrice: 300,
      amenities: [
        {
          id: 13,
          label: "Coloring Services",
        },
        {
          id: 14,
          label: "Barber Services",
        },
        {
          id: 15,
          label: "Styling Consultation",
        },
      ],
    },
    {
      name: "Gigis Salon",
      image: "/assets/salon-image1.jpg",
      popularity: "Popular",
      rating: 4.5,
      discount: 15,
      category: "Salon for Men",
      distance: 2,
      startingPrice: 350,
      amenities: [
        {
          id: 1,
          label: "Air conditioning",
        },
        {
          id: 12,
          label: "Parking",
        },
        {
          id: 2,
          label: "Kids Friendly",
        },
      ],
    },
    {
      name: "Chic Spa",
      image: "/assets/salon-image2.jpg",
      popularity: "New",
      rating: 4.0,
      discount: 20,
      category: "Spa",
      distance: 5,
      startingPrice: 500,
      amenities: [
        {
          id: 3,
          label: "Free Wi-Fi",
        },
        {
          id: 8,
          label: "Wheelchair Accessible",
        },
        {
          id: 6,
          label: "Refreshments",
        },
      ],
    },
    {
      name: "Elegance Beauty",
      image: "/assets/salon-image3.jpg",
      popularity: "Top Rated",
      rating: 4.8,
      category: "Beauty Salon",
      distance: 1,
      startingPrice: 250,
      amenities: [
        {
          id: 5,
          label: "Free Parking",
        },
        {
          id: 9,
          label: "Facial Treatments",
        },
        {
          id: 4,
          label: "Hair Styling",
        },
      ],
    },
    {
      name: "Relax Haven",
      image: "/assets/salon-image4.jpg",
      popularity: "New",
      rating: 4.2,
      discount: 10,
      category: "Relaxation Spa",
      distance: 3,
      startingPrice: 450,
      amenities: [
        {
          id: 7,
          label: "Sauna",
        },
        {
          id: 10,
          label: "Massage Therapy",
        },
        {
          id: 11,
          label: "Couples Packages",
        },
      ],
    },
    {
      name: "Trendy Cuts",
      image: "/assets/salon-image4.jpg",
      popularity: "Popular",
      rating: 4.7,
      category: "Hair Salon",
      distance: 4,
      startingPrice: 300,
      amenities: [
        {
          id: 13,
          label: "Coloring Services",
        },
        {
          id: 14,
          label: "Barber Services",
        },
        {
          id: 15,
          label: "Styling Consultation",
        },
      ],
    },
    {
      name: "Gigis Salon",
      image: "/assets/salon-image1.jpg",
      popularity: "Popular",
      rating: 4.5,
      discount: 15,
      category: "Salon for Men",
      distance: 2,
      startingPrice: 350,
      amenities: [
        {
          id: 1,
          label: "Air conditioning",
        },
        {
          id: 12,
          label: "Parking",
        },
        {
          id: 2,
          label: "Kids Friendly",
        },
      ],
    },
    {
      name: "Chic Spa",
      image: "/assets/salon-image2.jpg",
      popularity: "New",
      rating: 4.0,
      discount: 20,
      category: "Spa",
      distance: 5,
      startingPrice: 500,
      amenities: [
        {
          id: 3,
          label: "Free Wi-Fi",
        },
        {
          id: 8,
          label: "Wheelchair Accessible",
        },
        {
          id: 6,
          label: "Refreshments",
        },
      ],
    },
    {
      name: "Elegance Beauty",
      image: "/assets/salon-image3.jpg",
      popularity: "Top Rated",
      rating: 4.8,
      category: "Beauty Salon",
      distance: 1,
      startingPrice: 250,
      amenities: [
        {
          id: 5,
          label: "Free Parking",
        },
        {
          id: 9,
          label: "Facial Treatments",
        },
        {
          id: 4,
          label: "Hair Styling",
        },
      ],
    },
    {
      name: "Relax Haven",
      image: "/assets/salon-image4.jpg",
      popularity: "New",
      rating: 4.2,
      discount: 10,
      category: "Relaxation Spa",
      distance: 3,
      startingPrice: 450,
      amenities: [
        {
          id: 7,
          label: "Sauna",
        },
        {
          id: 10,
          label: "Massage Therapy",
        },
        {
          id: 11,
          label: "Couples Packages",
        },
      ],
    },
    {
      name: "Trendy Cuts",
      image: "/assets/salon-image4.jpg",
      popularity: "Popular",
      rating: 4.7,
      category: "Hair Salon",
      distance: 4,
      startingPrice: 300,
      amenities: [
        {
          id: 13,
          label: "Coloring Services",
        },
        {
          id: 14,
          label: "Barber Services",
        },
        {
          id: 15,
          label: "Styling Consultation",
        },
      ],
    },
  ];
  return (
    <div>
      {showFilter && <FilterModal toggleModal={toggleModal} />}
      <SecondaryNav navitem={metadata} />
      <Banner>
        <Toptitle>
          <Display bold>Everything feels better after a Haircut</Display>
        </Toptitle>
      </Banner>
      <Wrapper>
        <Filtercontainer>
          <H3 bold>4 Haircut Results in your location</H3>
          <Showappliedfilter>
            <Chip>Haircut</Chip>
            <Chip>Haircut</Chip>
            <Chip>Haircut</Chip>
            <VR />
            <Filter onClick={toggleModal} />
          </Showappliedfilter>
        </Filtercontainer>
        <ListWrapper>
          {Arr.map((data, index) => (
            <Card key={index} data={data} />
          ))}
        </ListWrapper>
        <H1 textAlign="center">Frequently Asked Questions</H1>
        <Approach />
      </Wrapper>
    </div>
  );
};

export default ShopListingPage;
