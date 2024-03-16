import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { isEqual } from "lodash";
import axios from "axios";

import Loader from "@common/ui/Loader";
import FlexBox from "@common/ui/FlexBox";
import Filter from "@common/ui/Filter";
import { Display, H1, H3 } from "@common/ui/Headings";
import { PRIMARY_200, PRIMARY_800 } from "@common/ui/colors";
import Chip from "@common/ui/Chips";
import { device } from "@common/ui/Resposive";
import Approach from "@common/ApproachFaq";
import { filterMeta } from "@metadata/ListingPage";
import Card from "./Card";
import SecondaryNav from "./SecondaryNav";
import { URL } from "@constants/urls";

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

const FilterWrapper = styled(FlexBox)`
  column-gap: 0.25rem;
  align-items: center;
  overflow-x: auto;
  @media ${device.laptop} {
    column-gap: 1rem;
  }
`;

const Toptitle = styled(FlexBox)`
  max-width: 75rem;
  padding: 0 2rem;
  align-items: center;
  justify-content: center;
`;

const IntersectionTarget = styled.div`
  display: ${({ loading }) => (loading ? "none" : "block")};
  width: 100%;
  height: 1rem;
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
  const [loading, setLoading] = useState(false);
  const [shopList, setShopList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const targetRef = useRef(null);

  const fetchShopList = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${URL.getAllShops}?page=${pageNumber}&pageLimit=9`
      );
      const data = res?.data?.data?.[0];

      if (data) {
        setShopList(prev => [...prev, ...data.data]);
        setTotalCount(data?.totalDocs);
        setTotalPage(Math.ceil(data?.totalDocs / data?.pages));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [pageNumber]);

  useEffect(() => {
    fetchShopList();
  }, [fetchShopList]);

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

  useEffect(() => {
    if (!targetRef?.current) return;

    const intersectionCallback = entries => {
      const target = entries[0];
      console.log(target.isIntersecting, pageNumber, totalPage);
      if (target.isIntersecting && pageNumber < totalPage) {
        setPageNumber(prev => prev + 1);
      }
    };

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    try {
      const observer = new IntersectionObserver(intersectionCallback, options);
      if (targetRef?.current) observer?.observe(targetRef?.current);
      return () => {
        if (targetRef?.current) observer?.unobserve(targetRef?.current);
      };
    } catch (err) {
      console.log(err);
    }
  }, [targetRef, pageNumber, totalPage]);

  const showLoader = loading && shopList?.length === 0;
  const showListLoader = loading && shopList?.length !== 0;

  if (showLoader) {
    return <Loader />;
  }

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
        {totalCount && (
          <H3 bold>{totalCount} Haircut Results in your location</H3>
        )}
        <FlexBox align="center" columnGap="0.5rem">
          <FlexBox position="relative">
            {!isEqual(advancedFilterSelection, getInitialState(filterMeta)) && (
              <ActiveDot />
            )}
            <Filter onClick={toggleModal} />
          </FlexBox>
          <FilterWrapper>
            {filterMeta?.map(({ options }) => {
              return options?.map(({ label, slug, isPopular }) => {
                if (!isPopular) return;
                return (
                  <Chip
                    key={slug}
                    selected={advancedFilterSelection?.services_offered?.includes(
                      slug
                    )}
                    onClick={() => {}}
                  >
                    {label}
                  </Chip>
                );
              });
            })}
          </FilterWrapper>
        </FlexBox>
        <FlexBox column>
          <ListWrapper>
            {shopList?.map((data, index) => (
              <Card key={index} data={data} />
            ))}
          </ListWrapper>
          {showListLoader && <Loader fitContent />}
          <IntersectionTarget loading={loading} ref={targetRef} />
        </FlexBox>
        <H1 textAlign="center">Frequently Asked Questions</H1>
        <Approach />
      </Wrapper>
    </div>
  );
};

export default ShopListingPage;
