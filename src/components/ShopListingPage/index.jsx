/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

import { client } from "@axiosClient";
import Loader from "@common/ui/Loader";
import FlexBox from "@common/ui/FlexBox";
import { Display, H1, H3 } from "@common/ui/Headings";
import { PRIMARY_200 } from "@common/ui/colors";
import { device } from "@common/ui/Responsive";
import Approach from "@common/ApproachFaq";
import { filterMeta } from "@metadata/ListingPage";
import { URL } from "@constants/urls";
import { secondaryNavMeta } from "@metadata/ListingPage";
import Card from "./Card";
import SecondaryNav from "./SecondaryNav";
import { Filters } from "./Filters";
import { Case, Default, Switch } from "@common/ConditionalRendering";

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
  height: 15rem;
  align-items: center;
  justify-content: center;
  background-color: ${PRIMARY_200};
`;

const TitleWrapper = styled(FlexBox)`
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

const Container = styled(FlexBox)`
  width: 50%;
  align-items: center;
  justify-content: space-around;
  background: #f6e8d3;
  border-radius: 1rem;
`;
const ShopListingPage = () => {
  const [loading, setLoading] = useState(false);
  const [shopList, setShopList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

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

  const targetRef = useRef(null);

  const fetchShopList = useCallback(async () => {
    try {
      setLoading(true);

      const { gender, price_range, services_offered, sort_by, special_offers } =
        advancedFilterSelection;

      const res = await client.post(URL.getAllShops, {
        page: pageNumber,
        pageLimit: 9,
        //TODO: do not remove this comment -->
        // gender,
        // sortFilter: sort_by,
        // priceRange: price_range,
        // services: services_offered,
        // offers: special_offers,
      });
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
  }, [pageNumber, advancedFilterSelection]);

  useEffect(() => {
    fetchShopList();
  }, [fetchShopList]);

  useEffect(() => {
    setShopList([]);
    setPageNumber(1);
  }, [advancedFilterSelection]);

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

  return (
    <div>
      <SecondaryNav navItem={secondaryNavMeta} />
      <Banner>
        <Container>
          <FlexBox padding="1.5rem" width="374px" lin>
            <Display textTransform="uppercase" color=" #F89706">
              elevate your style with our precious cuts
            </Display>
          </FlexBox>

          <img height="228px" src="/assets/images/BannerGirlImage.svg"></img>
        </Container>
        {/* <TitleWrapper>
          <Display bold>Everything feels better after a Haircut</Display>
        </TitleWrapper> */}
      </Banner>
      <Wrapper>
        {totalCount && (
          <H3 bold>{totalCount} Haircut Results in your location</H3>
        )}
        <Filters
          getInitialState={getInitialState}
          advancedFilterSelection={advancedFilterSelection}
          setAdvancedFilterSelection={setAdvancedFilterSelection}
        />
        <FlexBox column>
          <Switch>
            <Case condition={showLoader}>
              <Loader />
            </Case>
            <Default>
              <ListWrapper>
                {shopList?.map((data, index) => (
                  <Card key={index} data={data} />
                ))}
              </ListWrapper>
            </Default>
          </Switch>
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
