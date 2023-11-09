import { useState } from "react";
import styled from "styled-components";

// import { logout } from "@redux/actions/authActions";
import FlexBox from "@common/ui/FlexBox";
import { H2, Body2 } from "@common/ui/Headings";
import { Modal } from "@common/Dashboard/Modal";
import CheckBox from "@common/ui/CheckBox";
import { Button } from "../common/Dashboard/Buttons";

const LogoutImage = styled.img`
  width: 100%;
`;

const LogoutModal = ({ toggleModal }) => {
  const [checked, setChecked] = useState(false);

  const toggleCheck = () => setChecked(!checked);

  const handleLogout = () => {
    toggleModal();
    // dispatch(logout(allDevices));
  };

  return (
    <Modal
      XS
      width="20rem"
      height="auto"
      mobileWidth="90vw"
      mobileHeight="auto"
      mobileBorderRadius="1rem"
    >
      <LogoutImage src="/assets/images/dashboard/logout.svg" />
      <FlexBox column padding="1rem" rowGap="1rem">
        <H2 bold>Are you sure want to log out?</H2>
        <FlexBox columnGap="0.5rem" align="center">
          <CheckBox checked={checked} onClick={toggleCheck} />
          <Body2 bold>Log out from all devices</Body2>
        </FlexBox>
      </FlexBox>
      <FlexBox padding="1rem" justify="space-between">
        <Button outline secondary onClick={toggleModal}>
          GO BACK
        </Button>
        <Button onClick={handleLogout}>LOG OUT</Button>
      </FlexBox>
    </Modal>
  );
};

export default LogoutModal;
