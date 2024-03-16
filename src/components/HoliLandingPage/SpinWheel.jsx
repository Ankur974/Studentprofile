import React, { useState } from "react";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { Caption } from "@common/ui/Headings";
import { PRIMARY_900, WHITE } from "@common/ui/colors";
import { Button } from "@common/ui/Buttons";
import LoginModal from "../Login";
import { Header } from "./Header";

const Wrapper = styled(FlexBox)`
  height: 100%;
  row-gap: 1.5rem;
  flex-direction: column;
  background-color: ${PRIMARY_900};
  padding: 2.5rem 1.25rem;
  align-items: center;
`;

const CardHeading = styled(Caption)`
  font-family: Lemon;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  line-height: normal;
`;

const Card = styled(FlexBox)`
  width: 100%;
  padding: 1.5rem 1.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: ${WHITE};
  border-radius: 1.25rem;
`;

const SpinCTA = styled(Button)`
  padding: 0.75rem 2.5rem;
  text-transform: none;
  font-size: 1rem;
  font-weight: 600;
`;

const SpinImg = styled.img`
  width: 242px;
  height: 225px;
`;

const SpinWheel = ({ targetElement }) => {
  const [loginModal, setLoginModal] = useState(false);

  const toggleModal = () => {
    setLoginModal(!loginModal);
  };

  return (
    <Wrapper ref={targetElement}>
      {loginModal && <LoginModal setModalOpen={setLoginModal} page="spinner" />}
      <Header
        title="Spin the wheel!"
        subTitle="Lorem ipsum dolor sit amet consectetur. Semper rhoncus."
      />
      <Card>
        <CardHeading>
          Get exciting prices and vouchers on your nearest salon
        </CardHeading>
        <SpinCTA onClick={toggleModal}>Spin Now!</SpinCTA>
        <SpinImg src="/assets/images/holi/Spin.webp"></SpinImg>
      </Card>
    </Wrapper>
  );
};

export default SpinWheel;
