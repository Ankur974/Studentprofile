import React, { useState } from "react";
import styled from "styled-components";
import Bugsnag from "@bugsnag/js";
import { useSelector } from "react-redux";

import Avatar from "@common/ui/Avatar";
import FlexBox from "@common/ui/FlexBox";
import { H5 } from "@common/ui/Headings";
import Rating from "@common/ui/DisplayRate";
import { Button } from "@common/ui/Buttons";
import { ACCENT_0, ACCENT_300, SECONDARY_GREY } from "@common/ui/colors";
import TextArea from "@common/ui/TextArea";
import { client } from "@axiosClient";
import { URL } from "@constants/urls";
import { device } from "@common/ui/Responsive";
import dayjs from "dayjs";

const Wrapper = styled(FlexBox)`
  width: 100%;
  row-gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${ACCENT_300};
`;

// const Image = styled.img`
//   transform: rotate(180deg);
// `;

// const Hr = styled.div`
//   border-bottom: 1px solid ${ACCENT_300};
//   width: 100%;
// `;

const DateContainer = styled(FlexBox)`
  flex-direction: column;
  gap: 0.25rem;
  @media ${device.laptop} {
    flex-direction: row;
  }
`;

const SingleReview = ({ data }) => {
  const [showBox, setShowBox] = useState(false);
  const [comment, setComment] = useState("");

  const user = useSelector(state => state?.auth?.user);

  const handleComment = () => {
    setShowBox(true);
  };

  const replyAndLike = async () => {
    try {
      await client.post(`${URL.replyRating}/${data?._id}`, {
        userId: user?.userId,
        name: user?.name,
        comment: comment,
      });
      setShowBox(false);
      setComment("");
    } catch (error) {
      console.error("Error posting reply and like:", error);
      Bugsnag.notify(error);
    }
  };

  return (
    <Wrapper column>
      <FlexBox justify="space-between">
        <FlexBox align="center" columnGap="0.5rem">
          <Avatar name={data?.name} />
          <H5>{data?.name}</H5>
        </FlexBox>
        {/* <FlexBox align="center" columnGap="1rem" cursor="pointer">
          <Image src="/assets/Review/ThumbDownIcon.svg" />
          <img src="/assets/Review/ThumbDownIcon.svg" />
        </FlexBox> */}
      </FlexBox>
      <FlexBox>
        <Rating rate={data?.overallAvgRating} />
      </FlexBox>
      <DateContainer>
        <H5>
          {data?.updatedAt ? dayjs(data?.updatedAt).format("DD-MMMM-YYYY") : ""}
        </H5>
        <H5>{data?.serviceNames}</H5>
      </DateContainer>
      <H5>{data ? data?.review : "-"}</H5>

      {data?.replyReview && Array.isArray(data.replyReview) && (
        <FlexBox column padding="0.5rem 1.5rem" rowGap="1rem">
          {data.replyReview.map((review, index) => (
            <FlexBox key={index} columnGap="0.5rem">
              <Avatar name={review?.name} />
              <FlexBox column>
                <FlexBox align="center" columnGap="0.5rem">
                  <H5 bold>{review?.name}</H5>
                  <H5 color={SECONDARY_GREY}>
                    {review?.repliedAt
                      ? dayjs(review?.repliedAt).format("DD-MMMM-YYYY")
                      : ""}
                  </H5>
                </FlexBox>
                <H5>{review?.comment}</H5>
              </FlexBox>
            </FlexBox>
          ))}
        </FlexBox>
      )}
      {!showBox && (
        <Button primary onClick={handleComment}>
          Reply
        </Button>
      )}
      {showBox && (
        <FlexBox column rowGap="0.75rem">
          <TextArea
            label="Write your reply"
            type="text"
            labelColor={ACCENT_0}
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <Button onClick={replyAndLike}>Post</Button>
        </FlexBox>
      )}
    </Wrapper>
  );
};

export default SingleReview;
