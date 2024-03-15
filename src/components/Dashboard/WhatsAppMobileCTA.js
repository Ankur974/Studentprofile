import { Text } from "@common/Text";
import { LIGHTEST_GREY, ACCENT_800 } from "@common/ui/colors";
import styled from "styled-components";
import { WHATSAPP_URL } from "../../constants";

const Wrapper = styled.div`
  margin-top: 2.75rem;
`;

const Dome = styled.div`
  height: 5rem;
  width: 100%;
  background-color: ${LIGHTEST_GREY};
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
`;

const Bottom = styled.div`
  height: 3.5rem;
  width: 100%;
  background-color: ${LIGHTEST_GREY};
  text-align: center;
  position: relative;
`;

const WhatsAppLink = styled.a`
  color: ${ACCENT_800};
  text-decoration: underline;
  text-underline-offset: 2px;
`;

const WhatsAppMobileCTA = () => {
  return (
    <Wrapper>
      <Dome />
      <Bottom>
        <Text
          fontSize="0.9rem"
          textAlign="center"
          style={{ position: "absolute", top: "-2rem", left: 0, right: 0 }}
        >
          If you have any questions, <br />
          <WhatsAppLink href={WHATSAPP_URL} target="_blank">
            chat with us via WhatsApp.
          </WhatsAppLink>
        </Text>
      </Bottom>
    </Wrapper>
  );
};

export default WhatsAppMobileCTA;
