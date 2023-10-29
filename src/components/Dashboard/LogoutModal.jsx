import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// import { logout } from "@redux/actions/authActions";
import FlexBox from "@common/ui/FlexBox";
import { H2, H4 } from "@common/ui/Headings";
import { Modal } from "@common/Dashboard/Modal";
import { Button } from "../common/Dashboard/Buttons";
import Checkbox from "@common/Dashboard/Checkbox";

const LogoutImage = styled.img`
  width: 100%;
`;

const LogoutModal = ({ toggleModal }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const toggleCheck = () => setChecked(!checked);

  const handleLogout = () => {
    const allDevices = checked && "yes";
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
          <Checkbox checked={checked} onClick={toggleCheck} />
          <H4 bold>Log out from all devices</H4>
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
