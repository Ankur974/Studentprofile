import React, { useEffect, useState, useMemo } from "react";
import Bugsnag from "@bugsnag/js";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import Loader from "@common/ui/Loader";
import axiosInstance from "@axiosInstance";
import urls from "@urls";
import { CF_PROVIDER_ROLE } from "@constants";
import Carousels from "./Carousels";
import AboutMe from "./AboutMe";
import TreatmentMethods from "./TreatmentMethods";
import CfInfoCarousel from "./CfInfoCarousel";
import Summary from "./Summary";
import Thoughts from "./Thoughts";
import Banner from "./Banner";
import { NumberParam, StringParam, useQueryParams } from "use-query-params";
import ActionButtons from "./ActionButtons";
import DomainsCarousel from "./DomainsCarousel";

// Constants
const PROVIDER_UUID = "3aec3bc9-6da6-4097-a095-08bb2a682446"; // Replace with the correct UUID

const Container = styled(FlexBox)`
  height: 100%;
  flex-direction: column;
  position: relative;
  overflow-y: scroll;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 2.5rem;
`;

const ProviderProfile = ({ providerType, sessionType = "single" }) => {
  const [providerData, setProviderData] = useState(null);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [_, setQueryParams] = useQueryParams({
    selected: StringParam,
    providerId: NumberParam,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `${urls.therapistPublicProfile}/${PROVIDER_UUID}`
        );
        setProviderData(response?.data?.therapist);
      } catch (error) {
        Bugsnag.notify(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // fetches data for dummy profile
  }, []);

  const closeProfile = () => {
    setQueryParams(
      {
        selected: null,
        providerId: null,
      },
      "replaceIn"
    );
  };

  const fullName = useMemo(() => {
    if (providerData?.uuid === PROVIDER_UUID) {
      return "Dr Divya Ganesh Nallur"; // Replace with the correct full name
    }
    return `${providerData?.firstname || ""} ${
      providerData?.lastname || ""
    }`.trim();
  }, [providerData?.uuid]);

  const isCfProvider = providerData?.roles?.includes(CF_PROVIDER_ROLE); //To be updated while API integration

  const checkDesignation = () => {
    let designation = "";

    if (providerData?.affiliations?.length) {
      providerData?.affiliations?.forEach(affiliation => {
        const orgName = affiliation?.organisation?.toLowerCase();
        if (orgName.includes("amaha") || orgName.includes("innerhour")) {
          designation = affiliation?.designation;
        }
      });
    }

    return designation;
  };

  const designation = useMemo(() => checkDesignation(), [providerData]);

  if (loading) return <Loader />;

  return (
    <Container>
      <Banner
        providerData={providerData}
        fullName={fullName}
        designation={designation}
        closeProfile={closeProfile}
      />
      <ActionButtons fullName={fullName} />
      <ContentWrapper>
        <Summary
          sessionType={sessionType}
          providerData={providerData}
          providerType={providerType}
        />
        <DomainsCarousel
          providerData={providerData}
          providerType={providerType}
        />
        {isCfProvider && <CfInfoCarousel />}
        {providerData?.treatment_areas.length > 0 && (
          <TreatmentMethods providerData={providerData} />
        )}
        <AboutMe providerData={providerData} />
        {providerData?.user_phrases?.length > 0 && (
          <Thoughts providerData={providerData} />
        )}
        <Carousels
          providerData={providerData}
          providerType={providerType}
          sessionType={sessionType}
        />
      </ContentWrapper>
    </Container>
  );
};

export default ProviderProfile;
