import React from "react";
import styled from "styled-components";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock, FaStore } from "react-icons/fa";
import { useState } from "react";

import FlexBox from "@common/ui/FlexBox";
import { device } from "@common/ui/Responsive";
import { Display, H6, Body1, H3 } from "@common/ui/Headings";
import { PRIMARY_900, SECONDARY_500, WHITE, ACCENT_0 } from "@common/ui/colors";
import Input from "@components/common/ui/InputBox";
import TextArea from "@common/ui/TextArea";
import { Button } from "@common/ui/Buttons";

const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width: 75rem;
  flex-direction: column;
  padding: 1.5rem;
  column-gap: 5rem;

  @media ${device.laptop} {
    width: 86.67%;
    margin: auto;
    flex-direction: row;
  }
`;

const Heading = styled(Display)`
  font-size: 1.75rem;
  color: ${PRIMARY_900};
  font-weight: 600;

  @media ${device.laptop} {
    font-size: 3rem;
  }
`;

const IconContainer = styled(FlexBox)`
  margin-right: 2rem;
  margin-bottom: 1rem;
`;

const Container = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  gap: 1.25rem;

  @media ${device.laptop} {
    width: 50%;
  }
`;

const Divider = styled(FlexBox)`
  border-bottom: 1px solid #e2e1df;
`;

const Title = styled(Body1)`
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  color: ${PRIMARY_900};
  font-weight: 600;
`;

const InfoContainer = styled(FlexBox)`
  padding: 1rem 0;
  flex-direction: column;

  @media ${device.laptop} {
    flex-direction: row;
  }
`;

const FormContainer = styled(FlexBox)`
  background-color: ${PRIMARY_900};
  width: 100%;
  padding: 2rem;
  border-radius: 1.5rem;
  flex-direction: column;
  row-gap: 1.5rem;

  @media ${device.laptop} {
    width: 50%;
  }
`;

const Caption = styled(H6)`
  font-size: 1rem;
  color: ${SECONDARY_500};

  @media ${device.laptop} {
    font-size: 1.25rem;
  }
`;

const InfoItem = ({ icon, title, children }) => {
  return (
    <InfoContainer>
      <IconContainer>
        {icon === "location" && (
          <FaLocationDot size="2rem" color={PRIMARY_900} />
        )}
        {icon === "clock" && <FaClock size="2rem" color={PRIMARY_900} />}
        {icon === "store" && <FaStore size="2rem" color={PRIMARY_900} />}
      </IconContainer>
      <FlexBox column>
        <Title>{title}</Title>
        {children}
      </FlexBox>
    </InfoContainer>
  );
};

const ContactDetails = () => {
  return (
    <Container>
      <FlexBox column rowGap="1rem">
        <Heading>Get in Touch</Heading>
        <Caption>
          Leave a message or call us now to get your salon all the reach it
          needs!
        </Caption>
      </FlexBox>
      <InfoItem icon="location" title="Our Location">
        <Body1>Kolkata, West Bengal, India</Body1>
      </InfoItem>
      <Divider />
      <InfoItem icon="clock" title="Opening Hours">
        <FlexBox column>
          <Body1 padding="0.25rem 0">Mon-Fri: 6am-10pm</Body1>
          <Body1>Sat-Sun: 8am-2pm</Body1>
        </FlexBox>
      </InfoItem>
      <Divider />
      <InfoItem icon="store" title="Contact">
        <FlexBox column>
          <Body1 padding="0.25rem 0">Phone: +91 85019-87307</Body1>
          <Body1>
            Email:{" "}
            <a href="mailto:support@pamprazzi.com">support@pamprazzi.com</a>
          </Body1>
        </FlexBox>
      </InfoItem>
    </Container>
  );
};

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobNumber: "",
    query: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
  });

  const resetForm = () => {
    setFormData({ ...formData, name: "", email: "", mobNumber: "", query: "" });
    setError({});
  };
  const handleInput = (e, fieldName) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const newError = {};
    const requiredFields = ["name", "email"];
    setIsSubmitting(true);

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newError[field] = `${field} is required`;
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newError.email = "Please enter a valid email address";
    }

    if (formData.mobNumber && formData.mobNumber.length != 10) {
      newError.mobNumber = "Please enter a valid phone number";
    }

    if (Object.keys(newError).length === 0) {
      //   toast.success("Submitted successfully");
      setError({});
      setIsSubmitting(false);
      resetForm();
    } else {
      setError(newError);
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <H3 color={WHITE} bold>
        Questions?
      </H3>
      <Input
        label="Name"
        required
        type="text"
        labelColor={ACCENT_0}
        value={formData.name}
        error={error.name}
        onChange={e => handleInput(e, "name")}
      />
      <Input
        label="Email"
        required
        type="email"
        labelColor={ACCENT_0}
        value={formData.email}
        error={error.email}
        onChange={e => handleInput(e, "email")}
      />
      <Input
        label="Phone Number"
        type="number"
        error={error.mobNumber}
        labelColor={ACCENT_0}
        value={formData.mobNumber}
        onChange={e => handleInput(e, "mobNumber")}
      />
      <TextArea
        label="Your Query"
        type="text"
        labelColor={ACCENT_0}
        value={formData.query}
        onChange={e => handleInput(e, "query")}
      />
      <Button secondary outline onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "SUBMIT"}
      </Button>
    </FormContainer>
  );
};

const ContactUs = () => (
  <Wrapper>
    <ContactDetails />
    <ContactForm />
  </Wrapper>
);

export default ContactUs;
