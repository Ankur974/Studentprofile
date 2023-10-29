import styled from "styled-components";
import dayjs from "dayjs";
import FlexBox from "@common/ui/FlexBox";
import {
  DAVYS_GREY_100,
  DAVYS_GREY_200,
  DAVYS_GREY_300,
  DAVYS_GREY_600,
  DARK_MOSS_GREEN_900,
} from "@common/ui/colors";
import { H4, H5 } from "@common/Dashboard/Headings";

const Item = styled(FlexBox)`
  flex-direction: column;
  padding: ${({ padding }) => padding || "1rem 1.5rem"};
  row-gap: 0.5rem;
  background-color: ${({ isRead }) =>
    !isRead ? DAVYS_GREY_200 : DAVYS_GREY_100};
  border-top: 1px solid ${DAVYS_GREY_300};
  cursor: pointer;
`;

const NotificationItem = ({ notification, padding }) => {
  const { description, date, isRead } = notification;

  const handleRedirection = () => {};

  return (
    <Item isRead={isRead} padding={padding} onClick={handleRedirection}>
      <H4 bold={!isRead} color={!isRead && DARK_MOSS_GREEN_900}>
        {description}
      </H4>
      <H5 bold color={DAVYS_GREY_600}>
        {dayjs(date).format("DD MMM YYYY, hh:mm A")}
      </H5>
    </Item>
  );
};

export default NotificationItem;
