import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import { ACCENT_100 } from "../colors";
import useOutsideAlert from "../../../hooks/useOutsideAlert";
import { boxShadowDs2 } from "./styles";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${({ whiteOverlay }) =>
    whiteOverlay ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)"};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const Content = styled.div`
  background-color: ${ACCENT_100};
  border-radius: ${props => props.borderRadius};
  width: 100%;
  max-width: ${props => props.maxWidth};
  min-width: ${props => props.width};
  max-height: ${props => props.maxHeight};
  min-height: ${props => props.height};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: fade-in 0.3s ease-in-out;

  @keyframes fade-in {
    from {
      opacity: 0;
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

  ${({ XS }) =>
    XS &&
    css`
      width: ${props => props.width || "30vw"};
      height: ${props => props.height || "60vh"};
      max-width: ${props => props.maxWidth || "30rem"};
      max-height: ${props => props.maxHeight || "30rem"};
    `}

  ${({ S }) =>
    S &&
    css`
      width: ${props => props.width || "40vw"};
      height: ${props => props.height || "80vh"};
      max-width: ${props => props.maxWidth || "40rem"};
      max-height: ${props => props.maxHeight || "40rem"};
    `}

  ${({ M1 }) =>
    M1 &&
    css`
      width: ${props => props.width || "50vw"};
      height: ${props => props.height || "80vh"};
      max-width: ${props => props.maxWidth || "45rem"};
      max-height: ${props => props.maxHeight || "45rem"};
    `}

  ${({ M2 }) =>
    M2 &&
    css`
      width: ${props => props.width || "50vw"};
      height: ${props => props.height || "100vh"};
      max-width: ${props => props.maxWidth || "45rem"};
      max-height: ${props => props.maxHeight || "100vh"};
    `}

  ${({ L }) =>
    L &&
    css`
      width: ${props => props.width || "75vw"};
      height: ${props => props.height || "100vh"};
      max-width: ${props => props.maxWidth || "67.5rem"};
      max-height: ${props => props.maxHeight || "100vh"};
    `}
`;

export const Modal = ({
  XS,
  S,
  M1,
  M2,
  L,
  isMobile,
  togglePopup,
  width,
  height,
  noPadding,
  backgroundClickDisabled = false,
  borderRadius,
  maxWidth,
  children,
  ignoreId = null,
  whiteOverlay,
  boxShadow,
  border,
}) => {
  const containerRef = useRef(null);
  useOutsideAlert(
    containerRef,
    !backgroundClickDisabled ? togglePopup : () => {},
    ignoreId
  );

  // this prevents background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return createPortal(
    <Container whiteOverlay={whiteOverlay}>
      <Content
        XS={XS}
        S={S}
        M1={M1}
        M2={M2}
        L={L}
        isMobile={isMobile}
        ref={containerRef}
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
    </Container>,
    document.getElementById("modalPortal")
  );
};
