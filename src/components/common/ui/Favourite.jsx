import React from "react";
import FlexBox from "./FlexBox";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { ACCENT_800, PRIMARY_900 } from "./colors";

const Favourite = ({ clicked, setclicked, color }) => {
  return (
    <FlexBox onClick={() => setclicked(!clicked)} style={{ cursor: "pointer" }}>
      {clicked ? (
        <IoIosHeart color={PRIMARY_900} size="22px" />
      ) : (
        <IoIosHeartEmpty color={color ? color : { ACCENT_800 }} size="22px" />
      )}
    </FlexBox>
  );
};

export default Favourite;
