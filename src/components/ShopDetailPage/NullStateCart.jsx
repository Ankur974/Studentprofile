import React from "react";
import FlexBox from "@common/ui/FlexBox";
import styled from "styled-components";
import { SECONDARY_200 } from "../common/ui/colors";

const Wrapper = styled(FlexBox)`
  margin: auto;
  transition: opacity 0.3s ease-in-out;
  min-width: 20rem;
  border: 1px solid ${SECONDARY_200};
  border-radius: 0.5rem;
  min-height: 5rem;
  padding: 2rem 1rem;
  align-items: center;
  justify-content: center;
`;

const NullStateCart = () => {
  return (
    <Wrapper >
      <img src="/assets/images/CartNullState.webp" alt="empty cart" width="200px" />
    </Wrapper>
  );
};

export default NullStateCart;
