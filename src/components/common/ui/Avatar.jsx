import styled from "styled-components";
import { FiMoreHorizontal } from "react-icons/fi";

import { DUSTY_ORANGE_700, ERROR } from "./colors";
import { Body2 } from "./Headings";
import FlexBox from "./FlexBox";

const Container = styled(FlexBox)`
  position: relative;
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 2rem;
  height: 2rem;
  padding: 0.625rem 0.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border-radius: 3rem;
  background: var(
    --gradient,
    linear-gradient(90deg, #c6426e 0.61%, #533a71 100%)
  );
  background-blend-mode: soft-light, normal;
`;

const Initials = styled(Body2)`
  color: #fff;
  font-weight: 400;
  font-family: Sparkle;
`;

const Dot = styled.div`
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  top: 0.25rem;
  right: 0.25rem;
  border-radius: 4rem;
  background-color: ${ERROR};
`;

// const Img = styled.img`
//   width: 100%;
//   max-width: 2rem;
//   aspect-ratio: 1;
// `;

const Avatar = ({ name, firstName, lastName, typing, showDot, isDisabled }) => {
  let initials = "";
  // eslint-disable-next-line no-unused-vars
  const noName = !name && !firstName;
  if (name) {
    initials = name
      .split(" ")
      .map(part => part.charAt(0))
      .join("")
      .slice(0, 2);
  } else if (firstName) {
    initials = `${firstName?.charAt(0)}${lastName ? lastName?.charAt(0) : ""}`;
  }

  return (
    <Container className={isDisabled ? "grayscale" : ""}>
      <Wrapper>
        {typing ? (
          <FiMoreHorizontal
            size={18}
            strokeWidth={3}
            color={DUSTY_ORANGE_700}
          />
        ) : (
          <Initials>{initials}</Initials>
        )}
      </Wrapper>
      {showDot && <Dot />}
    </Container>
  );
};

export default Avatar;
