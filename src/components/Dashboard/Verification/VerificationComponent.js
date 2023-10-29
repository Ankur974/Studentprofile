import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import urls from "@urls";
import axiosInstance from "@axiosInstance";
import { verificationConfirmation } from "@redux/actions/authActions";
import GoBackModal from "./GoBackModal";
import UploadScreen from "../Bse/Journal/UploadScreen";
import ModeSelection from "../../SlotSelection/ModeSelection";
import { Text } from "@common/Text";

const VerificationMainContainer = styled.div`
  ${props =>
    css`
      display: ${props.isMobile ? "" : "flex"};
      flex-direction: ${props.isMobile ? "" : "column"};
      align-items: ${props.isMobile ? "" : "center"};
      padding: ${props.isMobile ? "1rem" : "0rem"};
    `}
`;

const VerificationUpload = styled.div``;

const ToolWebHeader = styled.div`
  display: ${props => (props.isMobile ? "none" : "flex")};
  width: 100%;
  position: sticky;
  top: 0px;
  z-index: 4;
  background-color: white;
  justify-content: space-between;
  align-items: center;
`;

const ToolHeaderDisplay = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 2rem 0rem 0rem;
`;

const VerificationComponent = ({
  isMobile,
  handleIsImageUploadingCheck,
  backModalToggle,
  isImageUploadingCheck,
  handleBackConfirmation,
}) => {
  const dispatch = useDispatch();
  const [uploadFromPopupToggle, setUploadFromPopupToggle] = useState(false);
  const [verificationFile, setVerificationFile] = useState(null);
  const [verificationFirebaseUrl, setVerificationFirebaseUrl] = useState({});
  const [verificationCompletedImage, setVerificationCompletedImage] =
    useState("");

  // const handleFileUpload = file => {
  //   let uploadedFile = file.target.files;
  //   setVerificationFile(uploadedFile);
  //   setUploadFromPopupToggle(!uploadFromPopupToggle);
  // };

  useEffect(() => {
    psychiatristIdentity();
  }, [verificationFirebaseUrl]);

  const psychiatristIdentity = async () => {
    try {
      let res = await axiosInstance.get(`${urls.psychiatristIdentity}`);
      if (res.data.verification_status === "completed") {
        setVerificationCompletedImage(res.data);
      }
    } catch (error) {
      console.log("Error while fetching psychiarists detials");
    }
  };

  const handleIdentityProofSubmit = () => {
    let payload = JSON.stringify({
      file: verificationFirebaseUrl.url,
      filename: verificationFirebaseUrl.name,
      filetype: verificationFirebaseUrl.mime_type,
    });
    dispatch(verificationConfirmation(payload));
    history.back();
  };

  return (
    <>
      <ToolWebHeader isMobile={isMobile}>
        <ToolHeaderDisplay>
          <img
            src="https://cdn.theinnerhour.com/assets/images/back-arrow.svg"
            alt=""
            onClick={
              isImageUploadingCheck
                ? handleBackConfirmation
                : () => history.back()
            }
          />
          <Text fontSize="1.2rem" bold margin="0 0 0 0.8rem">
            Verification
          </Text>
        </ToolHeaderDisplay>
      </ToolWebHeader>

      {backModalToggle && (
        <GoBackModal
          handleGoBack={() => history.back()}
          isMobile={isMobile}
          close={handleBackConfirmation}
          backModalToggle={backModalToggle}
        />
      )}

      <VerificationMainContainer isMobile={isMobile}>
        {isMobile ? (
          <>
            <Text fontSize="1rem">
              "As part of telemedicine guidelines, we need you to upload an
              acceptable ID proof, such as ADHAAR card or PAN card."
            </Text>
            <Text block fontSize="1rem" margin="1rem 0 0 0" lineHeight="1.2rem">
              Your psychiatrist will use this ID to verify your details in the
              1st session.
            </Text>
          </>
        ) : (
          <Text textAlign="center">
            Upload your valid photo ID, such as licence,
            <br /> aadhar card, Election card etc.
          </Text>
        )}
        <VerificationUpload isMobile={isMobile}>
          <UploadScreen
            uploadingVerificationDocument
            handleFileUploadCheck={handleIsImageUploadingCheck}
            // uploadImageClick={
            //   isMobile && !checkNative
            //     ? () => setUploadFromPopupToggle(!uploadFromPopupToggle)
            //     : null
            // }
            isMobile={isMobile}
            verificationFile={verificationFile}
            onDoneClick={handleIdentityProofSubmit}
            setMedia={setVerificationFirebaseUrl}
            popUpToggle={() => setUploadFromPopupToggle(!uploadFromPopupToggle)}
            verificationCompletedImage={verificationCompletedImage}
          />
        </VerificationUpload>

        {/* {uploadFromPopupToggle && (
          <ModeSelection
            showOnlyAvailableModes
            isMobile={isMobile}
            availableModes={[
              { name: "Gallery", img: "https://cdn.theinnerhour.com/assets/images/gallery.svg" },
              { name: "Camera", img: "https://cdn.theinnerhour.com/assets/images/camera.svg" },
            ]}
            setVerificationFile={setVerificationFile}
            close={() => setUploadFromPopupToggle(!uploadFromPopupToggle)}
            handleFileUpload={handleFileUpload}
          />
        )} */}
      </VerificationMainContainer>
    </>
  );
};

VerificationComponent.propTypes = {
  isMobile: PropTypes.bool,
  handleIsImageUploadingCheck: PropTypes.func,
  backModalToggle: PropTypes.bool,
  isImageUploadingCheck: PropTypes.bool,
  handleBackConfirmation: PropTypes.func,
};

export default VerificationComponent;
