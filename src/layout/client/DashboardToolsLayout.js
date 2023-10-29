import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { trackEvent } from "@utils/helpers";
import { Text } from "@common/Text";
import FlexBox from "@common/ui/FlexBox";
import { WHITE, ACCENT_800 } from "@common/ui/colors";
import Link from "next/link";
import { useSelector } from "react-redux";
import { THERAPIST } from "@constants";

const Container = styled.div`
  @media screen and (max-width: 768px) {
    padding: 0 0 1.6rem 0;
  }
`;

const Selector = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: ${WHITE};

  @media screen and (max-width: 768px) {
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
  }
`;

const Underline = styled.div`
  background-color: ${ACCENT_800};
  height: 5px;
  width: 150%;
  margin-left: -25%;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    margin-bottom: 0px;
  }
`;

const DashboardToolsLayout = props => {
  const [selectedPage, setSelectedPage] = useState("pending");

  const provider = useSelector(state => state?.provider) || {};
  const { providerType, providerProfile } = provider || {};

  const payload = {
    flow: providerType === THERAPIST ? "therapy" : "psychiatry",
    [`${providerType}_name`]:
      providerProfile?.firstname + " " + providerProfile?.lastname,
    [`${providerType}_uuid`]: providerProfile?.uuid,
  };

  useEffect(() => {
    setSelectedPage(props.selectedPage);
  }, [props.selectedPage]);

  return (
    <Container>
      <Selector>
        <FlexBox align="center" columnGap="2rem">
          <Link href={`/dashboard/${provider?.providerType}/tools/pending`}>
            <Text
              spacing="1px"
              bold
              style={{ opacity: selectedPage === "pending" && "1" }}
              cursor="pointer"
              onClick={() => {
                setSelectedPage("pending");
                trackEvent({ event: "homework_pending_click", payload });
              }}
              margin="0 8px 0 0"
            >
              PENDING
              <Underline
                style={{
                  opacity: selectedPage === "pending" ? 1 : 0.2,
                  height: selectedPage === "pending" ? "3px" : "2px",
                }}
              />
            </Text>
          </Link>
          <Link href={`/dashboard/${provider?.providerType}/tools/completed`}>
            <Text
              spacing="1px"
              bold
              style={{ opacity: selectedPage === "completed" && "1" }}
              cursor="pointer"
              onClick={() => {
                setSelectedPage("completed");
                trackEvent({ event: "homework_completed_click", payload });
              }}
            >
              COMPLETED
              <Underline
                style={{
                  opacity: selectedPage === "completed" ? 1 : 0.2,
                  height: selectedPage === "completed" ? "3px" : "2px",
                }}
              />
            </Text>
          </Link>
        </FlexBox>
      </Selector>
      {props.children}
    </Container>
  );
};

export default DashboardToolsLayout;
