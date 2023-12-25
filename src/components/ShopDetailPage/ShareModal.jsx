import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";

import { FaCopy, FaWhatsappSquare } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

const Wrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
  flex-direction: row;
  column-gap: 4rem;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
`;
const CopyLink = styled(FlexBox)`
  width: 20%;
  border-radius: 8px;
  border: 1px dashed black;
  column-gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 0.6rem;
`;
const Close = styled(IoCloseSharp)`
  position: absolute;
  right: 10px;
  top: 5px;
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
      icon: FaCopy,
      size: "25px",
      color: "",
      onClick: copyLinkToClipboard,
    },
    {
      id: 2,
      title: "Whatsapp",
      icon: FaWhatsappSquare,
      color: "green",
      size: "25px",
      onClick: shareOnWhatsApp,
    },
    {
      id: 3,
      title: "Message",
      icon: FaMessage,
      size: "25px",
      color: "gold",
      onClick: shareViaMessage,
    },
    {
      id: 4,
      title: "Email",
      icon: MdEmail,
      size: "25px",
      color: "red",
      onClick: shareViaEmail,
    },
  ];

  return (
    <Wrapper>
      <Close size="20px" onClick={() => setOpenModal(false)} />
      {data.map(item => {
        return (
          <CopyLink key={item.id} onClick={item.onClick}>
            <item.icon size={item.size} fill={item.color} />
          </CopyLink>
        );
      })}
    </Wrapper>
  );
};
export default ShareModal;
