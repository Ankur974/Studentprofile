import styled from "styled-components";

import { Body2, H2 } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import { ACCENT_800 } from "@common/ui/colors";

const UL = styled.ul`
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 1.5rem;
  color: ${ACCENT_800};
  li {
    margin-bottom: 1rem;
  }
`;

const ChatInfo = () => (
  <FlexBox column padding="1.5rem" rowGap="1rem">
    <H2 bold>Chat info</H2>

    <Body2>
      We understand that there may be times when you need to communicate with
      your expert beyond the sessions. Here&apos;s how our chat feature can help
      you:
    </Body2>

    <UL>
      <li>
        <Body2>
          Ask any questions you may have related to your sessions, appointments,
          prescriptions, or treatment plan.
        </Body2>
      </li>
      <li>
        <Body2>
          While our experts do their best to be available when you need them, it
          may take some time for them to respond to your messages.
        </Body2>
      </li>
      <li>
        <Body2>
          Please keep in mind that this space is not a substitute for actual
          sessions, but simply a quick way for you to communicate with your
          expert between sessions.
        </Body2>
      </li>
      <li>
        <Body2>
          At present, Amaha is not equipped to handle emergencies. If you need
          immediate assistance, please refer to your nearest emergency medical
          services or a dedicated helpline.
        </Body2>
      </li>
    </UL>
  </FlexBox>
);

export default ChatInfo;
