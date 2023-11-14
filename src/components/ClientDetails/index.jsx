import React, { useState } from "react";
import styled from "styled-components";

import FlexBox from "@common/ui/FlexBox";
import { Button } from "@common/ui/Buttons";
import { device } from "@common/ui/Resposive";
import { Body1 } from "@common/ui/Headings";
import Input from "@common/ui/InputBox";
import { ACCENT_0, ACCENT_400 } from "@common/ui/colors";

const Wrapper = styled(FlexBox)`
  padding: 1.5rem;
  gap: 2rem;
  width: 100%;
  height: 100%;
`;

const Box = styled(FlexBox)`
  position: relative;
  padding: 1rem;
  gap: 1.5rem;
  flex-wrap: nowrap;
  flex-direction: column;
  border: 1px solid ${ACCENT_400};
  border-radius: 1rem;

  @media ${device.laptop} {
    flex-wrap: wrap;
    flex-direction: ${props => (props?.column ? "column" : "row")};
  }
`;

const Heading = styled.div`
  position: absolute;
  top: -0.75rem;
  background: ${ACCENT_0};
  padding-inline: 0.5rem;
`;

const InputContainer = styled(FlexBox)`
  width: 100%;
  @media ${device.laptop} {
    width: 48%;
  }
`;
const Body = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  row-gap: 2rem;
  // border:1px solid black;
  padding-top: 1rem;
  overflow-x: scroll;
  @media ${device.laptop} {
    row-gap: 3rem;
  }
`;
const ButtonContainer = styled(FlexBox)`
  width: 100%;
  justify-content: center;
`;

const initialFormData = {
  firstName: "",
  LastName: "",
  addressLine1: "",
  addressLine2: "",
  phoneNumber: "",
  dob: "",
  state: "",
  emailId: "",
  pincode: "",
  city: "",
  district: "",
};

const initialError = {
  firstName: "",
  lastName: "",
  addressLine1: "",
  phoneNumber: "",
  state: "",
  pincode: "",
  city: "",
  district: "",
};

const ShopDetails = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(initialError);

  const handleInput = (e, fieldName) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
      "pincode",
      "city",
      "district",
      "state",
    ];

    const newError = {};
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newError[field] = `${field} is required`;
      } else {
        newError[field] = "";
      }
    });

    setError(newError);

    const hasErrors = Object.values(newError).some(errorMsg => errorMsg !== "");

    if (!hasErrors) {
      console.log(formData);
      console.log("You have submitted");
    }
  };

  return (
    <Wrapper column rowGap="1rem">
      <Body>
        <Box>
          <Heading>
            <Body1 bold>Personal Details</Body1>
          </Heading>
          <InputContainer>
            <Input
              required
              error={error.firstName}
              label="First Name"
              placeholder="First Name"
              onChange={e => handleInput(e, "firstName")}
            />
          </InputContainer>

          <InputContainer>
            <Input
              error={error.lastName}
              required
              label="Last Name"
              placeholder="Last Name"
              onChange={e => handleInput(e, "lastName")}
            />
          </InputContainer>

          <InputContainer>
            <Input
              error={error.phoneNumber}
              required
              label="Phone Number"
              placeholder="Enter your Phone number"
              type="number"
              onChange={e => handleInput(e, "phoneNumber")}
            />
          </InputContainer>

          <InputContainer>
            <Input
              label="Email Id"
              placeholder="abc@gmail.com"
              type="email"
              onChange={e => handleInput(e, "emailId")}
            />
          </InputContainer>

          <InputContainer>
            <Input
              label="Date of Birth"
              placeholder="01/01/2000"
              type="date"
              onChange={e => handleInput(e, "dob")}
            />
          </InputContainer>
        </Box>

        <Box>
          <Heading>
            <Body1 bold>Address</Body1>
          </Heading>
          <InputContainer>
            <Input
              required
              error={error.address}
              label="Address Line1"
              placeholder="street/road name"
              onChange={e => handleInput(e, "addressLine1")}
            />
          </InputContainer>
          <InputContainer>
            <Input
              label="Addresss Line2"
              placeholder="House no"
              onChange={e => handleInput(e, "addressLine2")}
            />
          </InputContainer>
          <InputContainer>
            <Input
              error={error.pincode}
              label="Pincode"
              required
              placeholder="Enter your Pin Code"
              type="number"
              onChange={e => handleInput(e, "pincode")}
            />
          </InputContainer>
          <InputContainer>
            <Input
              error={error.city}
              label="City Name"
              required
              placeholder="city name"
              onChange={e => handleInput(e, "city")}
            />
          </InputContainer>
          <InputContainer>
            <Input
              error={error.district}
              required
              label="District"
              placeholder="Enter your District"
              onChange={e => handleInput(e, "district")}
            />
          </InputContainer>

          <InputContainer>
            <Input
              error={error.state}
              required
              label="State"
              placeholder="Enter your State"
              onChange={e => handleInput(e, "state")}
            />
          </InputContainer>
        </Box>
      </Body>
      <ButtonContainer>
        <Button margin="auto" onClick={handleSubmit}>
          Submit
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default ShopDetails;
