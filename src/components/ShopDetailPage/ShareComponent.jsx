import React, { useState, useEffect } from "react";
import { SlShareAlt } from "react-icons/sl";
import Modal from "../common/ui/Modal";
import ShareModal from "./ShareModal";

export const ShareComponent = props => {
  const [isMobile, setIsMobile] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      const mobileWidthThreshold = 1024;
      setIsMobile(window.innerWidth < mobileWidthThreshold);
    };

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleShareFallback = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("URL copied to clipboard");
      })
      .catch(error => {
        console.error("Failed to copy URL to clipboard:", error);
      });
  };
  const handleShare = async () => {
    console.log(navigator.share);
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Gigis Salon",
          text: "Check out Gigis Salon!",
          // url: window.location.href,
          url: "this is ",
        });
      } catch (error) {
        console.error("Error sharing:", error);
        handleShareFallback();
      }
    } else {
      console.log("Native sharing not supported.");
      handleShareFallback();
    }
  };

  return (
    <>
      <SlShareAlt
        color={props.color}
        size="20px"
        onClick={() => {
          if (!isMobile) {
            setOpenModal(!openModal);
          } else {
            handleShare();
          }
        }}
      />
      {openModal && (
        <Modal
          M1
          height="fit-content"
          width="fit-content%"
          togglePopup={openModal}
          borderRadius="0.5rem"
        >
          <ShareModal setOpenModal={setOpenModal} />
        </Modal>
      )}
    </>
  );
};
