import { components } from "react-select";
import styled from "styled-components";
import { FiCheck } from "react-icons/fi";
import FlexBox from "@common/ui/FlexBox";
import { DARK_MOSS_GREEN_900 } from "@common/ui/colors";
import { H4 } from "../../Headings";

const Container = styled(FlexBox)`
  padding: 0.75rem;
  column-gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
`;

const Option = props => {
  return (
    <components.Option {...props}>
      <Container>
        <H4>{props.label}</H4>
        {props.isSelected && (
          <FiCheck size="1.25rem" color={DARK_MOSS_GREEN_900} />
        )}
      </Container>
    </components.Option>
  );
};

export default Option;
