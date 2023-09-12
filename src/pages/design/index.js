import { useState } from "react";
import Avatar from "../../components/common/ui/Avatar";
import { Button, IconButton } from "../../components/common/ui/Buttons";
import CheckBox from "../../components/common/ui/CheckBox";
import Filter from "../../components/common/ui/Filter";
import Input from "../../components/common/ui/InputBox";
import { Modal } from "../../components/common/ui/Modal";
import Radio from "../../components/common/ui/Radio";
import Chip from "../../components/common/ui/Chips";
import {
  Body1,
  Body2,
  ButtonText,
  Caption,
  Display,
  H1,
  H2,
  H3,
  Support,
} from "../../components/common/ui/Headings";
import styled from "styled-components";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { white } from "../../components/common/ui/colors";
import { useDispatch } from "react-redux";
// import { addToast } from "../Store/Actions";
import ToolTip from "../../components/common/ui/ToolTip";
import FlexBox from "../../components/common/ui/FlexBox";

const Content = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
`;

const DesignElementDemo = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModalM2, setShowModalM2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const showErrorToast = () => {
    // dispatch(
    //   addToast({
    //     msg: "Request unsuccessfull. Please try again.",
    //     appearance: "error",
    //     autoDismiss: true,
    //   })
    // );
  };

  const showToast = () => {
    // dispatch(
    //   addToast({
    //     msg: "Request successfull.",
    //     appearance: "success",
    //     autoDismiss: true,
    //   })
    // );
  };

  return (
    <FlexBox column rowGap="1rem">
      <FlexBox column>
        <Display bold>Display</Display>
        <H1 bold>Heading 1</H1>
        <H2 bold>Heading 2</H2>
        <H3 bold>Heading 3</H3>
        <H3>Heading 3</H3>
        <Body1>Body 1</Body1>
        <Body2>Body 2</Body2>
        <ButtonText>ButtonText</ButtonText>
        <Support>Support Text</Support>
        <Caption>Caption Text</Caption>
      </FlexBox>
      <FlexBox padding="4rem" wrap="wrap" columnGap="2rem" rowGap="2rem">
        <Button danger>BUTTON</Button>
        <Button outline>BUTTON</Button>
        <Button outline disabled>
          BUTTON
        </Button>
        <Button disabled>BUTTON</Button>
        <Button>BUTTON</Button>
        <Button secondary outline>
          secondary
        </Button>
        <Button secondary>secondary</Button>
        <Button secondary disabled>
          secondary
        </Button>
        <Button secondary textCta>
          secondary
        </Button>
        <Button textCta>BUTTON</Button>
      </FlexBox>
      <FlexBox padding="4rem" wrap="wrap" columnGap="2rem" rowGap="2rem">
        <IconButton danger>BUTTON</IconButton>
        <IconButton outline>BUTTON</IconButton>
        <IconButton disabled>BUTTON</IconButton>
        <IconButton textCta>BUTTON</IconButton>

        <IconButton secondary>BUTTON</IconButton>
        <IconButton secondary outline>
          BUTTON
        </IconButton>
        <IconButton secondary disabled>
          BUTTON
        </IconButton>
        <IconButton secondary textCta>
          BUTTON
        </IconButton>
        <IconButton secondary textCta disabled>
          BUTTON
        </IconButton>
        <IconButton
          secondary
          textCta
          iconPosition="right"
          padding="0.5rem 1.25rem 0.5rem 1.5rem"
        >
          BUTTON
        </IconButton>
      </FlexBox>
      <FlexBox columnGap="1rem">
        <Chip>
          <Body2 bold>Upcoming</Body2>
        </Chip>
        <Chip selected2>
          <Body2 bold>Upcoming</Body2>
        </Chip>
        <Chip selected>
          <Body2 color={white} bold>
            Upcoming
          </Body2>
        </Chip>
        <Chip disabled>
          <Body2 bold>Upcoming</Body2>
        </Chip>
        <Chip>
          <Body2 bold>Upcoming</Body2>
        </Chip>
      </FlexBox>
      <FlexBox columnGap="1rem">
        <Avatar name="Deepesh Soni" />
        <Avatar name="Deepesh Soni" typing />
        <Avatar name="Deepesh Kumar Soni" showDot={true} />
        <Avatar />
      </FlexBox>
      <FlexBox columnGap="2rem">
        <CheckBox />
        <CheckBox disabled />
        <CheckBox check />
        <CheckBox check disabled />
      </FlexBox>
      <FlexBox columnGap="2rem">
        <Filter />
        <Filter active />
      </FlexBox>
      <FlexBox columnGap="1rem">
        <Radio />
        <Radio active />
      </FlexBox>

      <a data-tip data-for="global" data-tooltip-offset={10}>
        Hover for Tooltip
      </a>
      <ToolTip id="global">
        <FlexBox column>
          <H1 color={white}>Hello</H1>
          <H2 color={white}>This is a Tooltip.</H2>
        </FlexBox>
      </ToolTip>
      <FlexBox column rowGap="1rem" width="25rem">
        <Input
          value={value}
          required
          label="last name"
          onChange={value => setValue(value)}
        />
        <Input
          value={value2}
          label="First Name"
          error="this is error"
          onChange={value => setValue2(value)}
        />
        <Input value={value3} onChange={value => setValue3(value)} />
        <Input
          label="Input box with cross and icon"
          showCross
          name="password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={value => setPassword(value)}
          icon={showPassword ? FiEyeOff : FiEye}
          onIconClick={handleTogglePassword}
          onCrossIconClick={() => setPassword("")}
        />
      </FlexBox>
      <FlexBox columnGap="2rem">
        <Button textCta onClick={showToast}>
          Show Success Toast
        </Button>
        <Button textCta onClick={showErrorToast}>
          Show Error Toast
        </Button>
      </FlexBox>
      <FlexBox columnGap="1rem">
        <Button onClick={() => setShowModal(true)}>Open Modal XS</Button>
        {showModal && (
          <Modal XS togglePopup={() => setShowModal(!showModal)}>
            <Content />
          </Modal>
        )}
        <Button onClick={() => setShowModal2(true)}>Open Modal S</Button>
        {showModal2 && (
          <Modal S togglePopup={() => setShowModal2(!showModal2)}>
            <Content />
          </Modal>
        )}
        <Button onClick={() => setShowModal3(true)}>Open Modal M1</Button>
        {showModal3 && (
          <Modal M1 togglePopup={() => setShowModal3(!showModal3)}>
            <Content />
          </Modal>
        )}
        <Button onClick={() => setShowModalM2(true)}>Open Modal M2</Button>
        {showModalM2 && (
          <Modal M2 togglePopup={() => setShowModalM2(!showModalM2)}>
            <Content />
          </Modal>
        )}
        <Button onClick={() => setShowModal4(true)}>Open Modal L</Button>
        {showModal4 && (
          <Modal L togglePopup={() => setShowModal4(!showModal3)}>
            <Content />
          </Modal>
        )}
      </FlexBox>
    </FlexBox>
  );
};

export default DesignElementDemo;
