import React from "react";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";

const Image = styled.img`
  width: 100%;
  margin-bottom: -1px;
`;

const FooterWaves = () => (
  <FlexBox>
    <Image src="/assets/images/holi/Group.webp" />
  </FlexBox>
);

export default FooterWaves;
