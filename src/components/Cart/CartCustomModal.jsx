import React from "react";
import styled from "styled-components";
import { ACCENT_100 } from "@common/ui/colors";
import { boxShadowDs2 } from "@common/ui/styles";
import { device } from "@common/ui/Responsive";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${({ whiteOverlay }) =>
    whiteOverlay ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
`;

const Content = styled.div`
  background-color: ${ACCENT_100};
  border-radius: 0.5rem;
  width: 80vw;
  max-width: 25rem;
  height: fit-content;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: fade-in 0.3s ease-in-out;
  position: absolute;
  bottom: 7rem;
  right: 2.5rem;

  @keyframes fade-in {
    from {
      opacity: 1;
      transform: translateY(-1.5rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  border: ${({ border }) => border || "none"};
  ${({ boxShadow }) => boxShadow && boxShadowDs2};

  * {
    box-sizing: border-box;
  }
  @media ${device.mobileL} {
    width: ${props => props.width || "25rem"};
    max-width: ${props => props.maxWidth || "30rem"};
  }
`;

const CartModal = ({
  isMobile,
  width,
  height,
  noPadding,
  borderRadius,
  maxWidth,
  children,
  whiteOverlay,
  boxShadow,
  border,
}) => {
  return (
    <Container whiteOverlay={whiteOverlay}>
      <Content
        isMobile={isMobile}
        noPadding={noPadding}
        width={width}
        height={height}
        borderRadius={borderRadius}
        maxWidth={maxWidth}
        boxShadow={boxShadow}
        border={border}
      >
        {children}
      </Content>
    </Container>
  );
};

export default CartModal;
