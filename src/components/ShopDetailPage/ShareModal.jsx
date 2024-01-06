import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";

import { IoLogoWhatsapp } from "react-icons/io";
import { BiLogoGmail } from "react-icons/bi";
import { BiLink } from "react-icons/bi";
import { AiFillMessage } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import { Body2, H3 } from "../common/ui/Headings";
import {
  ACCENT_100,
  PRIMARY_900,
  SECONDARY_100,
} from "../common/ui/colors";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  justify-contnet: center;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 1rem 2rem 2rem 2rem;
`;

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const HeadBox = styled(FlexBox)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const CopyLink = styled(FlexBox)`
  width: 5rem;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid ${SECONDARY_100};
  justify-content: center;
  background-color: ${ACCENT_100};
`;

const ShareModal = ({ setOpenModal }) => {
  const copyLinkToClipboard = () => {
    const dummyElement = document.createElement("textarea");
    dummyElement.value = window.location.href;
    document.body.appendChild(dummyElement);
    dummyElement.select();
    document.execCommand("copy");
    document.body.removeChild(dummyElement);
    alert("Link copied to clipboard!");
  };

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent("https://your-website.com/link-to-share");
    window.open(`https://web.whatsapp.com/?text=Check out this link: ${url}`);
  };

  const shareViaMessage = () => {
    const phoneNumber = "1234567890";
    const message = encodeURIComponent("Your message here");

    window.location.href = `sms:${phoneNumber}?body=${message}`;
  };
  const shareViaEmail = () => {
    const subject = encodeURIComponent("Subject of the email");
    const body = encodeURIComponent(
      "First line of the email body.%0D%0ASecond line of the email body."
    );

    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const data = [
    {
      id: 1,
      title: "Copy Link",
      icon: BiLink,
      color: "DodgerBlue",
      onClick: copyLinkToClipboard,
    },
    {
      id: 2,
      title: "Whatsapp",
      icon: IoLogoWhatsapp,
      color: "green",
      onClick: shareOnWhatsApp,
    },
    {
      id: 3,
      title: "Message",
      icon: AiFillMessage,
      color: "gold",
      onClick: shareViaMessage,
    },
    {
      id: 4,
      title: "Email",
      icon: BiLogoGmail,
      color: "red",
      onClick: shareViaEmail,
    },
  ];

  return (
    <Wrapper>
      <HeadBox>
        <H3 bold color={PRIMARY_900}>
          Share
        </H3>
        <IoIosClose size="1.5rem" onClick={() => setOpenModal(false)} />
      </HeadBox>
      <Body2>Share this Saloon with your friend and family</Body2>
      <Container>
        {data.map(item => {
          return (
            <CopyLink key={item.id} onClick={item.onClick}>
              <item.icon size="2.5rem" fill={item.color} />
            </CopyLink>
          );
        })}
      </Container>
    </Wrapper>
  );
};
export default ShareModal;
