import React, { useState } from "react";
import styled from "styled-components";
import FlexBox from "@common/ui/FlexBox";
import { Body2, H3 } from "../common/ui/Headings";
import {
  SECONDARY_200,
  SECONDARY_500,
  SECONDARY_0,
  PRIMARY_900,
  ACCENT_0,
  PRIMARY_800,
} from "@common/ui/colors";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  row-gap: 1rem;
  background-color: ${SECONDARY_0};
  margin: auto;
`;

const Container = styled(FlexBox)`
  width: 100%;
  align-items: center;
  border-top: 2px solid ${SECONDARY_200};
  padding: 1rem;
  flex-direction: column;
  row-gap: 1rem;
`;

const FormLabelAndInputBox = styled(FlexBox)`
  flex-direction: row;
  width: 90%;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  padding: 1rem 0.5rem;
  width: 60%;
  border-radius: 1rem;
  border: 1px solid ${SECONDARY_500};
`;

const Button = styled.button`
margin-top:1.5rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${PRIMARY_800};
  color: ${ACCENT_0};
  cursor: pointer;
`;

const CalendarForm = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    time: "",
    description: "",
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Form is valid, submit the data
      const jsonData = JSON.stringify(formData);
      console.log("Form submitted with data:", jsonData);
      // Add further logic for sending data to the server or processing it as needed
    } else {
      // Form is not valid, handle validation errors or display a message
      console.log("Form validation failed");
    }
  };

  const validateForm = () => {
    // Add your validation logic here
    // Example: Check if required fields are filled
    return formData.eventName.trim() !== "" && formData.date.trim() !== "";
  };

  return (
    <Wrapper column>
      <H3 textAlign="center" color={PRIMARY_900} bold>
        Add your Event
      </H3>
      <form onSubmit={handleSubmit}>
        <Container>
          <FormLabelAndInputBox colGap="5rem">
            <Body2 bold color={PRIMARY_900}>
              Event Name<span style={{ color: "red" }}>*</span>
            </Body2>
            <Input
              type="text"
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              required
            />
          </FormLabelAndInputBox>
          <FormLabelAndInputBox colGap="5rem">
            <Body2 bold color={PRIMARY_900}>
              Date<span style={{ color: "red" }}>*</span>
            </Body2>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </FormLabelAndInputBox>
          <FormLabelAndInputBox colGap="5rem">
            <Body2 bold color={PRIMARY_900}>
              Time
            </Body2>
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
            />
          </FormLabelAndInputBox>
          <FormLabelAndInputBox colGap="5rem">
            <Body2 bold color={PRIMARY_900}>
              Description
            </Body2>
            <Input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </FormLabelAndInputBox>
          <Button type="submit">Add Event</Button>
        </Container>
      </form>
    </Wrapper>
  );
};

export default CalendarForm;
