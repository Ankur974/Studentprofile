import React, { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { isEqual } from "lodash";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";

import FlexBox from "@common/ui/FlexBox";
import Filter from "@common/ui/Filter";
import { Display, H1, H3 } from "@common/ui/Headings";
import { ACCENT_500, PRIMARY_200, PRIMARY_800 } from "@common/ui/colors";
import Chip from "@common/ui/Chips";
import { device } from "@common/ui/Resposive";
import Approach from "@common/ApproachFaq";
import { filterMeta } from "@metadata/ListingPage";
import Card from "./Card";
import SecondaryNav from "./SecondaryNav";

const AdvancedFilter = dynamic(() => import("./AdvancedFilter"), {
  ssr: false,
});

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

const FilterWrapper = styled(FlexBox)`
  align-self: end;
  width: 20rem;
  align-items:center;
  padding:0 0.5rem;

  @media ${device.laptop} {
    width: fit-content;
    max-width: 30rem;
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
const SliderButton = styled.div`
  position: relative;
  max-width: 20rem;
  .swiper-button {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 20%;
    z-index: 2;
    cursor: pointer;

    @media ${device.laptop} {
      max-width: 23rem;
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  .image-swiper-button-prev {
    left: -0.75rem;
  }

  .image-swiper-button-next {
    right: -1rem;
  }

  .swiper-button-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const ForwardButton = styled(IoIosArrowForward)`
  transition: all 0.3s ease-in-out;
  cursor:pointer;
  &:hover {
    transform: scale(1.25);
  }
`;

const BackButton = styled(IoIosArrowBack)`
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.25);
  }
`;
const Toptitle = styled(FlexBox)`
  max-width: 75rem;
  padding: 0 2rem;
  align-items: center;
  justify-content: center;
`;

const ActiveDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${PRIMARY_800};
  border-radius: 2rem;
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
`;

const ShopListingPage = () => {
  const [showFilter, setShowFilter] = useState(false);


  const getInitialState = filterMeta => {
    const initialState = {};

    filterMeta?.forEach(filter => {
      initialState[filter.slug] = filter?.type === "checkbox" ? [] : "";
    });

    return initialState;
  };
  const [advancedFilterSelection, setAdvancedFilterSelection] = useState(() =>
    getInitialState(filterMeta)
  );

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
      {showFilter && (
        <AdvancedFilter
          advancedFilterSelection={advancedFilterSelection}
          setAdvancedFilterSelection={setAdvancedFilterSelection}
          initialState={getInitialState(filterMeta)}
          togglePopup={toggleModal}
        />
      )}
      <SecondaryNav navitem={metadata} />
      <Banner>
        <Toptitle>
          <Display bold>Everything feels better after a Haircut</Display>
        </Toptitle>
      </Banner>
      <Wrapper>
        <Filtercontainer>
          <H3 bold>4 Haircut Results in your location</H3>
          <FlexBox columnGap="0.5rem">
            <FilterWrapper>
              <SliderButton>
                <div className="swiper-button image-swiper-button-next">
                  <ForwardButton />
                </div>
                <div className="swiper-button image-swiper-button-prev">
                  <BackButton />
                </div>
                <Swiper
                  modules={[Navigation]}
                  breakpoints={{
                    640: { slidesPerView: 3, spaceBetween: 10 },
                    1200: { slidesPerView: 3.8, spaceBetween: 100 },
                  }}
                  slidesPerColumn={1}
                  slidesPerGroup={1}
                  navigation={{
                    nextEl: ".image-swiper-button-next",
                    prevEl: ".image-swiper-button-prev",
                    disabledClass: "swiper-button-disabled",
                  }}
                  className="mySwiper"
                >
                  {filterMeta?.map(({ options }) => {
                    return options?.map(({ label, slug, isPopular }) => {
                      if (!isPopular) return null;
                      return (
                        <SwiperSlide key={slug}>
                          <Chip
                            selected={advancedFilterSelection?.services_offered?.includes(
                              slug
                            )}
                            onClick={() => {}}
                            width="fit-content"
                          >
                            {label}
                          </Chip>
                        </SwiperSlide>
                      );
                    });
                  })}
                </Swiper>
              </SliderButton>
            </FilterWrapper>
            <VR />
            <FlexBox position="relative">
              {!isEqual(
                advancedFilterSelection,
                getInitialState(filterMeta)
              ) && <ActiveDot />}
              <Filter onClick={toggleModal} />
            </FlexBox>
          </FlexBox>
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
