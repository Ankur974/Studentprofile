import styled, { css } from "styled-components";
import { FiMoreHorizontal } from "react-icons/fi";

import FlexBox from "@common/ui/FlexBox";
import { DUSTY_ORANGE_700, ERROR_RED_400 } from "@common/ui/colors";
import { H3 } from "./Headings";

const Container = styled(FlexBox)`
  position: relative;
  ${({ disabled }) =>
    disabled &&
    css`
      filter: grayscale(1);
    `}
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  min-width: ${({ small }) => (small ? "2rem" : "3rem")};
  max-width: ${({ small }) => (small ? "2rem" : "3rem")};
  height: ${({ small }) => (small ? "2rem" : "3rem")};
  padding: 0.625rem 0.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #fff 0%, #000 100%), #ffefb0;
  background-blend-mode: soft-light, normal;
`;

const Initials = styled(H3)`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  color: ${DUSTY_ORANGE_700};
  text-align: center;
  font-size: 1.125rem;
  font-size: ${({ small }) => (small ? "0.75rem" : "1.125rem")};
  font-style: normal;
  font-weight: 700;
  line-height: 1.75rem;
  text-transform: uppercase;
`;

const Dot = styled.div`
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  top: 0.25rem;
  right: 0.25rem;
  border-radius: 4rem;
  background-color: ${ERROR_RED_400};
`;

const DefaultImg = styled.img`
  min-width: ${({ small }) => (small ? "2rem" : "3rem")};
  max-width: ${({ small }) => (small ? "2rem" : "3rem")};
  height: ${({ small }) => (small ? "2rem" : "3rem")};
`;

const Avatar = ({
  name,
  firstname,
  lastname,
  typing = false,
  showDot = false,
  disabled = false,
  smallSize = false,
}) => {
  let initials = "";
  const noName = !name && !firstname;
  if (name) {
    initials = name
      .split(" ")
      .map(part => part.charAt(0))
      .join("")
      .slice(0, 2);
  } else if (firstname) {
    initials = `${firstname?.charAt(0)}${lastname ? lastname?.charAt(0) : ""}`;
  }

  return (
    <Container disabled={disabled}>
      {noName ? (
        <DefaultImg
          src="/assets/images/dashboard/default-avatar.svg"
          draggable="false"
          alt="Default Profile Icon"
          small={smallSize}
        />
      ) : (
        <Wrapper small={smallSize}>
          {typing ? (
            <FiMoreHorizontal
              size="1.5rem"
              strokeWidth={3}
              color={DUSTY_ORANGE_700}
            />
          ) : (
            <Initials small={smallSize}>{initials}</Initials>
          )}
        </Wrapper>
      )}
      {showDot && <Dot />}
    </Container>
  );
};

export default Avatar;
