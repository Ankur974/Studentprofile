import React from "react";
import styled from "styled-components";
import SectionContainer from "../common/SectionContainer";
import { Caption, H3 } from "../common/Headings";
import FlexBox from "../common/FlexBox";
import { RiGraduationCapFill } from "react-icons/ri";
import { MdOutlineArrowDropDown } from "react-icons/md";

const ProfileSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const InputBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem; /* Remove gap between label and input */
`;

const Label = styled.h3`
  margin-bottom: 0.25rem; /* Add a small margin below the label for better spacing */
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 20rem;
`;

const Button = styled.button`
  background-color: gainsboro;
  width: 8rem;
  height: 3rem;
  text-align: center;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

const LeftContainer = styled.div`
  flex: 1;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
`;

const StudentProfile = styled(FlexBox)`
  background: whitesmoke;
  width: 19rem;
  height: 6rem;
  border-radius: 2rem;
  align-items: center;
  padding: 0.5rem;
  justify-content: space-around;
`;

const Achievements = styled(FlexBox)`
  width: 100%;
  height: 100%;
  background: whitesmoke;
  border-radius: 2rem;
  padding: 1rem;
  gap: 1rem;
  flex-direction: column;
`;

const Container = styled(FlexBox)`
  background: red;
  width: 6rem;
  height: 5rem;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
`;

const ProgressbarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 1rem;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 1rem;
  background-color: #76c7c0;
  width: ${props => props.progress}%;
  border-radius: 1rem;
`;

const Hr = styled.hr`
  border-top: 1px solid black;
  width: 17rem;
`;
const Progressbar = ({ progress }) => (
  <ProgressbarContainer>
    <Progress progress={progress} />
  </ProgressbarContainer>
);

const Achievement = ({ title, description, progress }) => (
  <FlexBox>
    <Container>hello</Container>
    <FlexBox column justify="center" width="-webkit-fill-available">
      <H3>{title}</H3>
      <FlexBox justify="space-between">
        <Caption>{description}</Caption>
        <Caption>{progress}/10</Caption>
      </FlexBox>
      <Progressbar progress={(progress / 10) * 100} />
    </FlexBox>
  </FlexBox>
);

const Home = () => {
  return (
    <SectionContainer title="Personal data">
      <FlexBox rowGap="3rem" columnGap="3rem">
        <LeftContainer>
          <ProfileSection>
            <FlexBox column>
              <H3 bold>Profile Photo</H3>
              <img
                src="poto.jpg"
                width="120px"
                height="120px"
                alt="Profile"
                style={{ backgroundColor: "wheat" }}
              />
            </FlexBox>
            <FlexBox column rowGap="1rem">
              <H3>JPG.GIF OR PNG. Maximum file size 1 Mb.</H3>
              <Button>Change Photo</Button>
            </FlexBox>
          </ProfileSection>

          <InputBox>
            {[
              { label: "UID", type: "number", defaultValue: "928-203-1" },
              {
                label: "Phone Number",
                type: "number",
                defaultValue: "9674115312",
              },
              { label: "First Name", type: "text", defaultValue: "Martin" },
              { label: "Last Name", type: "text", defaultValue: "SSssss" },
            ].map(({ label, type, defaultValue }) => (
              <TextBox key={label}>
                <Label>{label}</Label>
                <Input type={type} defaultValue={defaultValue} />
              </TextBox>
            ))}
          </InputBox>
        </LeftContainer>

        <RightContainer>
          <StudentProfile>
            <FlexBox columnGap="1rem" align="center">
              <RiGraduationCapFill />
              <H3>Student's Profile</H3>
            </FlexBox>
            <FlexBox>
              <MdOutlineArrowDropDown />
            </FlexBox>
          </StudentProfile>
          <Achievements>
            {[
              {
                title: "Explorer",
                description: "Take 10 Courses",
                progress: 9,
              },
              {
                title: "Explorer",
                description: "Take 10 Courses",
                progress: 8,
              },
              {
                title: "Explorer",
                description: "Take 10 Courses",
                progress: 7,
              },
            ].map(({ title, description, progress }) => (
              <Achievement
                key={title + progress}
                title={title}
                description={description}
                progress={progress}
              />
            ))}
            <Hr />
          </Achievements>
        </RightContainer>
      </FlexBox>
    </SectionContainer>
  );
};

export default Home;
