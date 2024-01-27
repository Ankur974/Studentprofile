import styled from "styled-components";
import { H3 } from "./Headings";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  align-items: center;
  justify-content: center;
`;

const LoaderImg = styled.img`
  height: 5rem;
`;

const Loader = ({ width, height, showPreviewText = false }) => {
  return (
    <Wrapper width={width} height={height}>
      <LoaderImg src="/assets/images/dashboard/loader.gif" alt="loader" />
      {showPreviewText && <H3 bold>Loading preview...</H3>}
    </Wrapper>
  );
};

export default Loader;
