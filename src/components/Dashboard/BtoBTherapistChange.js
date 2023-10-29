import PropTypes from "prop-types";
import styled from "styled-components";
import { Text } from "@common/Text";
import { LIGHTEST_GREY } from "@common/ui/colors";

const Wrapper = styled.div`
  margin-top: 2.75rem;
`;

const Dome = styled.div`
  height: 5rem;
  width: 100%;
  background-color: ${LIGHTEST_GREY};
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
`;

const Bottom = styled.div`
  height: 3.5rem;
  width: 100%;
  background-color: ${LIGHTEST_GREY};
  text-align: center;
`;

const BtoBTherapistChange = ({ onClick }) => {
  return (
    <Wrapper>
      <Dome />
      <Bottom>
        <Text
          bold
          textDecoration="underline"
          underlineOffset="2px"
          spacing="1.4px"
          onClick={onClick}
        >
          I WANT TO CHANGE MY THERAPIST
        </Text>
      </Bottom>
    </Wrapper>
  );
};

BtoBTherapistChange.defaultProps = {
  onClick: () => {},
};

BtoBTherapistChange.propTypes = {
  onClick: PropTypes.func,
};

export default BtoBTherapistChange;
