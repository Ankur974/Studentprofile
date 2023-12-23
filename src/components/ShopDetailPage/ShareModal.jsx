import React from "react";
import styled from "styled-components";
import FlexBox from "../common/ui/FlexBox";
import { Body2 } from "../common/ui/Headings";
import { CiMail } from "react-icons/ci";
import { FaRegCopy, FaRegMessage, FaWhatsapp } from "react-icons/fa6";

const Wrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  column-gap: 4rem;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;
const CopyLink = styled(FlexBox)`
  width: 40%;
  border: 1px dashed black;
  column-gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
`;
const ShareModal = () => {
  const copyLinkToClipboard = () => {
    // Example: Copying the link to the clipboard
    const dummyElement = document.createElement("textarea");
    dummyElement.value = "https://your-website.com/link-to-share";
    document.body.appendChild(dummyElement);
    dummyElement.select();
    document.execCommand("copy");
    document.body.removeChild(dummyElement);
    alert("Link copied to clipboard!");
  };
  // const shareOnWhatsApp = () => {
  //   // Replace '1234567890' with the actual phone number or ID you want to start a chat with
  //   const phoneNumber = "9330309476";

  //   window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}`);
  // };
  const shareOnWhatsApp = () => {
    const url = encodeURIComponent("https://your-website.com/link-to-share");
    window.open(`https://web.whatsapp.com/?text=Check out this link: ${url}`);
  };

  const shareViaMessage = () => {
    const phoneNumber = "1234567890"; // Replace with the recipient's phone number
    const message = encodeURIComponent("Your message here");

    window.location.href = `sms:${phoneNumber}?body=${message}`;
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent("Subject of the email");
    const body = encodeURIComponent("Body of the email");

    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;

    // Create an HTML anchor element to navigate to the mailto link
    const mailtoElement = document.createElement("a");
    mailtoElement.href = mailtoLink;

    // Simulate a click on the anchor element to open the default email client
    mailtoElement.click();
  };

  const data = [
    {
      id: 1,
      title: "Copy Link",
      icon: FaRegCopy, // Assign icon component directly without extra braces
      onClick: copyLinkToClipboard,
    },
    {
      id: 2,
      title: "Whatsapp",
      icon: FaWhatsapp,
      onClick: shareOnWhatsApp,
    },
    {
      id: 3,
      title: "Message",
      icon: FaRegMessage,
      onClick: shareViaMessage, // Implement message onClick handler
    },
    {
      id: 4,
      title: "Email",
      icon: CiMail,
      onClick: shareViaEmail, // Implement email onClick handler
    },
  ];

  return (
    <Wrapper>
      {data.map(item => {
        return (
          <CopyLink key={item.id} onClick={item.onClick}>
            <item.icon size="1.2rem" />

            <Body2>{item.title}</Body2>
          </CopyLink>
        );
      })}

      {/* <CopyLink>
        <FaWhatsapp />
        <Body2 onClick={shareOnWhatsApp}>Whatsapp</Body2>
      </CopyLink>
      <CopyLink>
        <FaRegMessage />
        <Body2>Message</Body2>
      </CopyLink>
      <CopyLink>
        <CiMail />
        <Body2>Email</Body2>
      </CopyLink> */}
    </Wrapper>
  );
};
export default ShareModal;
