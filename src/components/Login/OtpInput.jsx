import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import FlexBox from "@Components/common/ui/FlexBox";
import { ERROR, SECONDARY_200 } from "@Components/common/ui/colors";

const OtpContainer = styled(FlexBox)`
  margin-top: 10px;
  gap: 0.5rem;
`;

const OtpInputBox = styled.input`
  max-width: 3.125rem;
  height: 3.125rem;
  width: 100%;
  text-align: center;
  font-size: 1.25rem;
  border: solid 1px ${props => (props.isInvalid ? ERROR : SECONDARY_200)};
  border-radius: 0.5rem;
`;

const OtpInput = ({ length = 4, onOtpSubmit, isInvalid }) => {
  const [otpValues, setOtpValues] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otpValues];
    newOtp[index] = value.substring(value.length - 1);
    setOtpValues(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = index => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otpValues[index - 1]) {
      inputRefs.current[otpValues.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otpValues[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <OtpContainer>
      {otpValues.map((value, index) => (
        <OtpInputBox
          key={index}
          type="number"
          ref={input => (inputRefs.current[index] = input)}
          value={value}
          onChange={e => handleChange(index, e)}
          onClick={() => handleClick(index)}
          onKeyDown={e => handleKeyDown(index, e)}
          isInvalid={isInvalid}
        />
      ))}
    </OtpContainer>
  );
};

export default OtpInput;
