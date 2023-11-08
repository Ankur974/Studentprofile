import { Tooltip } from "react-tooltip";
import { ACCENT_100, ACCENT_800 } from "@common/ui/colors";
import styled from "styled-components";

const Container = styled.div`
  .custom-tooltip {
    width: ${({ width }) => width};
    max-width: 20rem;
    padding: 1rem;
    background-color: ${ACCENT_800};
    color: ${ACCENT_100};
    border-radius: 0.5rem;
    * {
      color: ${ACCENT_100};
    }
  }
`;

/**
 * Custom Tooltip
 *
 * @param {string} id - unique identifier
 * @param {string} children - tooltip content
 * @param {string} [place] - tooltip position
 * @param {string} [width] - tooltip width
 *
 * @example
 * <a id="sample-tooltip">Reference Element</a>
 * <CustomTooltip id="sample-tooltip" place="right" width = "10rem">
 *   Tooltip Content
 * </CustomTooltip>
 */

const CustomTooltip = ({ id, children, place = "top", width = "15rem" }) => {
  return (
    <Container width={width}>
      <Tooltip anchorSelect={"#" + id} className="custom-tooltip" place={place}>
        {children}
      </Tooltip>
    </Container>
  );
};

export default CustomTooltip;