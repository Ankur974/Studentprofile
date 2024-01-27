import { components } from "react-select";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { ACCENT_800 } from "@common/ui/colors";

const CloseIcon = styled(FiX)`
  min-width: 1.5rem;
  height: 1.5rem;
  box-sizing: border-box;
  padding: 0.25rem;
  color: ${ACCENT_800};
  stroke-width: 3;
  cursor: pointer;
`;

const ClearIndicator = props => {
  return (
    <components.ClearIndicator {...props}>
      <CloseIcon />
    </components.ClearIndicator>
  );
};

export default ClearIndicator;
