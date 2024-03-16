/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import { SlSymbolMale } from "react-icons/sl";
import { IoIosFemale } from "react-icons/io";
import { IoMaleFemaleOutline } from "react-icons/io5";
import styled from "styled-components";
import { TfiClose } from "react-icons/tfi";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { device } from "@common/ui/Resposive";
import Chip from "@common/ui/Chips";
import FlexBox from "@common/ui/FlexBox";
import { Body1, Body2, H1 } from "@common/ui/Headings";
import {
  ACCENT_0,
  ACCENT_800,
  PRIMARY_900,
  SECONDARY_200,
} from "@common/ui/colors";
import { URL } from "@constants/urls";
import { Case, Default, Switch } from "@common/ConditionalRendering";
import { setUser } from "@redux/slices/auth";
import { client } from "@axiosClient";
import { Button } from "@common/ui/Buttons";
// import OtpInput from "./OtpInput";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  position: relative;
`;

const Cross = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const BackIcon = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  cursor: pointer;
`;

const Heading = styled(FlexBox)`
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  align-items: center;
  border-bottom: 1px solid ${SECONDARY_200};
  width: 100%;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 0.75rem;
  background: ${ACCENT_0};
  border-radius: 0.5rem;
  border: solid 1px ${SECONDARY_200};
`;

const CountryCodeSelect = styled.select`
  font-size: 1rem;
  padding: 1rem;
  background: ${ACCENT_0};
  border-radius: 0.5rem;
  border-style: none;
`;

const CountryCodeAndPhoneBox = styled(FlexBox)`
  border: 1px solid ${SECONDARY_200};
  border-radius: 0.5rem;
`;

const PhoneNumberInput = styled(Input)`
  border-style: none;
`;

const NameInput = styled(Input)``;

const Hr = styled.hr`
  border-top: 1px solid ${SECONDARY_200};
  margin: 0;
  width: 100%;
`;

const NumberEditIcon = styled(FlexBox)`
  flex-direction: column;
  display: inline;

  @media ${device.laptop} {
    flex-direction: row;
    align-items: center;
    display: flex;
    gap: 0.5rem;
  }
`;

const Container = styled(FlexBox)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  gap: 1.5rem;
  @media ${device.laptop} {
    align-items: center;
    flex-direction: row;
  }
`;

const userGender = [
  {
    id: "male",
    label: "Male",
    icon: SlSymbolMale,
  },
  {
    id: "female",
    label: "Female",
    icon: IoIosFemale,
  },
  {
    id: "Others",
    label: "Others",
    icon: IoMaleFemaleOutline,
  },
];

const Login = ({ setModalOpen, page }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpInvalid, setOtpInvalid] = useState(false);
  const [name, setName] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResendOTP, setCanResendOTP] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [validatingOtp, setValidatingOtp] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
      setCanResendOTP(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handlePhoneNumberChange = e => {
    setPhoneNumber(e.target.value);
  };

  const handleOtpSubmit = async () => {
    if (!otp) return;
    try {
      setValidatingOtp(true);
      const res = await client.post(
        URL?.submitOtp,
        { otp, phoneNumber },
        { authorization: false }
      );

      if (res?.data?.success) {
        if (res?.data?.data?.found) {
          dispatch(setUser(res?.data?.data?.data));
          setModalOpen(false);
          router.push(`/holi-landing/game/${page}`);
        } else {
          setCurrentStep(3);
        }
      } else {
        setOtpInvalid(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setValidatingOtp(false);
    }
  };

  const handleCreateUser = async () => {
    if (!name) return;
    try {
      const res = await client.post(
        URL?.createUser,
        { name, phoneNumber, gender: selectedOption },
        { authorization: false }
      );

      if (res?.status === 200) {
        dispatch(setUser(res?.data?.data));
        setModalOpen(false);
        router.push(`/holi-landing/game/${page}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) return;
    try {
      const res = await client.post(
        URL?.sendOtp,
        { phoneNumber },
        { authorization: false }
      );
      if (res?.data?.success) {
        setCurrentStep(2);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleResendOTP = async () => {
    try {
      const res = await client.post(
        URL?.sendOtp,
        { phoneNumber },
        { authorization: false }
      );
      if (res?.data?.success && res?.data?.isUserExists) {
        setTimer(60);
        setCanResendOTP(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOptionSelect = option => {
    setSelectedOption(prevSelectedOption =>
      prevSelectedOption === option ? null : option
    );
  };

  const maskPhoneNumber = function (phoneNumber) {
    const maskedNumber = phoneNumber.replace(
      /^(\d{6})(\d{4})$/,
      function (_, hidden, visible) {
        return "x".repeat(6) + visible;
      }
    );
    return maskedNumber;
  };

  return (
    <Wrapper>
      <Heading>
        {currentStep === 2 && (
          <BackIcon onClick={() => setCurrentStep(1)}>
            <FiChevronLeft size={20} />
          </BackIcon>
        )}
        <Cross onClick={() => setModalOpen(false)}>
          <TfiClose size={15} />
        </Cross>
        <Body1 bold>
          {currentStep === 2 ? "Confirm your number" : "Login or Sign up"}
        </Body1>
      </Heading>
      <FlexBox column align-items="center" padding="1.5rem" rowGap="1rem">
        <Switch>
          <Case condition={currentStep === 3}>
            <Body1 bold>What's your name?</Body1>
            <NameInput
              type="text"
              placeholder="Enter your Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleCreateUser();
                }
              }}
            />
            <Body1 bold>Gender</Body1>
            <Container>
              {userGender.map(type => {
                const Icon = type.icon;
                return (
                  <Chip
                    key={type.id}
                    selected={selectedOption === type.id}
                    onClick={() => handleOptionSelect(type.id)}
                  >
                    <FlexBox columnGap="0.5rem" padding="1rem" align="center">
                      <Icon
                        color={
                          selectedOption === type.id ? ACCENT_0 : ACCENT_800
                        }
                      />
                      <Body1
                        color={
                          selectedOption === type.id ? ACCENT_0 : ACCENT_800
                        }
                      >
                        {type.label}
                      </Body1>
                    </FlexBox>
                  </Chip>
                );
              })}
            </Container>
            <Button width="100%" onClick={handleCreateUser} disabled={!name}>
              Done
            </Button>
          </Case>

          <Case condition={currentStep === 2}>
            <NumberEditIcon>
              <Body1 bold>
                Enter the code We've sent via SMS to{" "}
                {maskPhoneNumber(phoneNumber)}
              </Body1>
              <PiPencilSimpleLineLight
                size="1rem"
                onClick={() => setCurrentStep(1)}
              />
            </NumberEditIcon>
            {/* <OtpInput
              length={4}
              onOtpSubmit={setOtp}
              otp={otp}
              isInvalid={isOtpInvalid}
            /> */}
            <NameInput
              type="number"
              value={otp}
              onChange={e => {
                setOtp(e.target.value);
              }}
              placeholder="Enter OTP"
              isInvalid={isOtpInvalid}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleOtpSubmit();
                }
              }}
            />
            <FlexBox>
              {!canResendOTP && (
                <FlexBox>
                  <Body2>Expires in {timer} seconds</Body2>
                </FlexBox>
              )}
              {canResendOTP && (
                <Body1
                  color={PRIMARY_900}
                  textDecoration="underline"
                  cursor="pointer"
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </Body1>
              )}
            </FlexBox>
            <Button
              width="100%"
              onClick={handleOtpSubmit}
              disabled={!otp || validatingOtp}
            >
              {validatingOtp ? "processing..." : "Continue"}
            </Button>
          </Case>
          <Default>
            <H1 bold>Welcome to Pamprazzi</H1>
            <CountryCodeAndPhoneBox column>
              <CountryCodeSelect>
                <option value="+91">India(+91)</option>
              </CountryCodeSelect>
              <Hr />
              <PhoneNumberInput
                type="number"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </CountryCodeAndPhoneBox>
            <Body2>
              We'll call or text you to confirm your number. Standard message
              and data rates apply.{" "}
              <Body2
                color={PRIMARY_900}
                textDecoration="underline"
                cursor="pointer"
              >
                Privacy Policy
              </Body2>
            </Body2>
            <Button
              width="100%"
              onClick={handleFormSubmit}
              disabled={!phoneNumber || phoneNumber.length !== 10}
            >
              GET OTP
            </Button>
          </Default>
        </Switch>
      </FlexBox>
    </Wrapper>
  );
};

export default Login;
