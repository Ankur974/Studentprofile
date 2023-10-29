import { useEffect } from "react";
import styled from "styled-components";
import { trackEvent } from "@utils/helpers";
import { Modal } from "@common/Modal";
import { Text } from "@common/Text";
import { Button } from "@common/Button";
import { LIGHT_RED, WHITE, DARK_BLUE } from "@common/ui/colors";

const ContentDiv = styled.div`
  margin: ${props => (props.isMobile ? "1rem 0rem 2rem 0rem" : "3rem 0 0 0")};
  display: ${props => (props.isMobile ? "" : "flex")};
  flex-direction: ${props => (props.isMobile ? "" : "column")};
  align-items: ${props => (props.isMobile ? "" : "center")};
  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  }
`;

const CTAFlex = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${props => (props.isMobile ? "" : "2rem 0 0 0")};
  @media screen and (max-width: 768px) {
    padding: 0.8rem 2rem 2rem 2rem;
  }
`;

const GoBackModal = ({ isMobile, close, handleGoBack, backModalToggle }) => {
  const handleBackCTA = () => {
    trackEvent({ event: "verification_exit_popup_confirm" });
    handleGoBack();
  };
  useEffect(() => {
    if (backModalToggle) {
      trackEvent({
        event: "verification_exit_popup_display",
      });
    }
  }, [backModalToggle]);
  return (
    <div>
      <Modal
        isMobile={isMobile}
        onClose={close}
        showFooter={false}
        closeIcon={false}
        width="30rem"
        showHeader={isMobile}
        imgHeader={isMobile}
        headerSrc="https://cdn.theinnerhour.com/assets/images/back-modal-img.svg"
        coverTop={isMobile}
      >
        {isMobile ? (
          <>
            <ContentDiv isMobile={isMobile}>
              <Text fontSize="1.1rem" bold>
                Your file is not uploaded
              </Text>
              <Text
                fontSize="1rem"
                lineHeight="1.2"
                block
                margin="0.8rem 0 0 0"
              >
                Are you sure you want to go back? Your ID will not be submitted
                for verification.
              </Text>
            </ContentDiv>
            <CTAFlex>
              <Text
                fontSize="1.2rem"
                block
                textTransform="uppercase"
                color={LIGHT_RED}
                onClick={handleBackCTA}
                cursor="pointer"
                spacing="1.22px"
              >
                go back
              </Text>
              <Text
                fontSize="1.2rem"
                block
                textTransform="uppercase"
                cursor="pointer"
                onClick={close}
                spacing="1.22px"
              >
                Upload
              </Text>
            </CTAFlex>
          </>
        ) : (
          <>
            <ContentDiv isMobile={isMobile}>
              <Text fontSize="1.1rem" bold textAlign="center !important">
                Your file is not uploaded
              </Text>
              <Text
                fontSize="1rem"
                lineHeight="1.2"
                block
                margin="0.8rem auto 0 auto"
              >
                Are you sure you want to go back? Your <br />
                ID will not be submitted for verification.
              </Text>
              <CTAFlex isMobile={isMobile}>
                <Button
                  backgroundColor={WHITE}
                  color={DARK_BLUE}
                  borderRadius="1rem"
                  border={`1px solid ${DARK_BLUE}`}
                  padding="1rem 3rem"
                  onClick={handleBackCTA}
                >
                  go back
                </Button>
                <Button
                  borderRadius="1rem"
                  margin="0 0 0 2rem"
                  padding="1rem 3.5rem"
                  onClick={close}
                >
                  upload
                </Button>
              </CTAFlex>
            </ContentDiv>
          </>
        )}
      </Modal>
    </div>
  );
};

export default GoBackModal;
