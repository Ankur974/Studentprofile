import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axiosInstance from "@axiosInstance";
import urls from "@urls";
import {
  BLACK,
  BLACK_TRANSPARENT,
  ACCENT_200,
  ACCENT_600,
  ACCENT_800,
  WHITE,
  PRIMARY_800,
  PRIMARY_700,
  PRIMARY_800,
} from "@common/ui/colors";
import { Button } from "@common/Buttons";
import FlexBox from "@common/ui/FlexBox";
import { FiX } from "react-icons/fi";
// import { logout } from "@redux/actions/authActions";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${BLACK}; /* Fallback color */
  background-color: ${BLACK_TRANSPARENT};
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  height: fit-content;
  /* width: 19.5rem; */
  padding: 2rem;
  background-color: ${WHITE};
  border-radius: 12px;
  text-align: center;
  position: relative;

  @media screen and (max-width: 768px) {
    width: 66vw !important;
  }

  .clicked {
    opacity: 0.3;
  }
`;

const Cross = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  cursor: pointer;
`;

const Heading = styled.p`
  color: ${ACCENT_800};
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.38px;
  margin: 0;
`;

const Description = styled.p`
  color: ${ACCENT_800};
  font-size: 1rem;
  letter-spacing: 0.26px;
  line-height: 1.2rem;
  margin: 1.2rem;
`;

const Input = styled.input`
  width: 22rem;
  border: none;
  background-color: ${ACCENT_200};
  border-radius: 8px;
  letter-spacing: 0.22px;
  padding: 1rem;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${ACCENT_600};
    letter-spacing: 1.4px;
    opacity: 0.4;
  }

  @media screen and (max-width: 768px) {
    width: 15rem;
  }
`;

const Error = styled.p`
  font-size: 1rem;
  letter-spacing: 0.38px;
  color: ${PRIMARY_800};
`;

const EditProfileDeleteModal = ({ toggleModal, visible }) => {
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const inputRef = useRef();
  const store = useSelector(state => state);
  const handleDeleteAction = () => {
    if (inputRef.current.value === "DELETE") {
      setClicked(true);
      deleteAccount();
    } else {
      setShowError(true);
    }
  };

  const deleteAccount = async () => {
    try {
      const res = await axiosInstance.post(urls.deleteAccountPermanently, {
        email: store.auth.user?.email,
      });
      if (res.status === 200) {
        // dispatch(logout());
      } else {
        setErrorText("Error while deleting account");
        showError(true);
      }
    } catch (error) {
      console.log("Error in deleting account", error);
    }
  };
  return (
    <Container
      style={{ display: visible ? "flex" : "none" }}
      className="delete-modal"
      onClick={e =>
        e.target.className.includes("delete-modal") && toggleModal()
      }
    >
      <Content>
        <Cross
          onClick={e => {
            e.stopPropagation();
            toggleModal();
          }}
        >
          <FiX color={PRIMARY_800} />
        </Cross>
        <Heading>Delete Account</Heading>
        <Description>
          To complete deleting your account,
          <br /> enter 'DELETE' in the text field below.
        </Description>
        <Input type="text" placeholder="Type 'DELETE'" ref={inputRef} />
        {showError && <Error>{!!errorText ? errorText : "Wrong Code"}</Error>}
        <FlexBox justify="center" margin="1rem 0 0">
          <Button
            color={PRIMARY_800}
            hoverColor={PRIMARY_700}
            onClick={() => !clicked && handleDeleteAction()}
            className={clicked && "clicked"}
          >
            {clicked ? "DELETING..." : "DELETE ACCOUNT"}
          </Button>
        </FlexBox>
      </Content>
    </Container>
  );
};

export default EditProfileDeleteModal;
