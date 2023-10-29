import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useState } from "react";
import styled from "styled-components";

import { Body1, Caption, Support } from "@common/ui/Headings";
import FlexBox from "@common/ui/FlexBox";
import Loader from "@common/ui/Loader";
import { ACCENT_400, ACCENT_600, SECONDARY_800 } from "@common/ui/colors";
import { useChatAttachments } from "@hooks/useChatAttachments";

const ImagePreviewPopup = dynamic(() => import("./ImagePreviewPopup"), {
  loading: () => <Loader />,
  ssr: false,
});

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  flex: 1;
  overflow-x: hidden;
`;

const TabSelector = styled(FlexBox)`
  width: 100%;
  align-items: center;
  border-bottom: 1px solid ${ACCENT_400};
  top: 0;
  height: 3rem;
`;

const Tab = styled(FlexBox)`
  width: 50%;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  padding: 0.75rem 0;
  position: relative;
  letter-spacing: 0.1em;
  justify-content: center;
  color: ${SECONDARY_800};
`;

const TabIndicator = styled.div`
  width: 50%;
  height: 2px;
  background-color: ${SECONDARY_800};
  position: absolute;
  bottom: 0;
  left: ${({ selectedTab }) => (selectedTab === "images" ? 0 : "50%")};
  transition: all 0.2s ease-in-out;
`;

const Section = styled(FlexBox)`
  width: 200%;
  transform: ${({ selectedTab }) =>
    selectedTab === "images" ? "translateX(0)" : "translateX(-50%)"};
  transition: transform 0.2s ease-in-out;
  overflow-y: scroll;
`;

const MediaContainer = styled(FlexBox)`
  width: 100%;
  align-items: start;
  gap: 1rem;
  display: grid;
  padding: 1.5rem 1.5rem;
  grid-template-columns: repeat(3, 1fr);
  overflow: scroll;
  grid-auto-rows: min-content;
`;

const ImageThumb = styled.img`
  height: 5rem;
  aspect-ratio: 1;
  cursor: pointer;
  overflow: hidden;
  object-fit: cover;
  border-radius: 0.875rem;
  background-color: ${ACCENT_400};
`;

const LoadSquare = styled(FlexBox)`
  height: 5rem;
  aspect-ratio: 1;
  border-radius: 0.875rem;
  background-color: ${ACCENT_400};
  margin: auto auto 1rem;
`;

const PdfPreview = styled(FlexBox)`
  position: relative;
  height: 5rem;
  aspect-ratio: 1;
  align-items: flex-end;
  border-radius: 0.875rem;
  background-color: var(--davys-400);
`;

const NullStateFlex = styled(FlexBox)`
  width: 100%;
  row-gap: 1.75rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 25% 0;
`;

const DocType = styled.span`
  position: absolute;
  width: 100%;
  text-align: center;
  margin: auto;
  align-self: center;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.25rem;
  font-family: "Quicksand";
  color: var(--davys-700);
`;

const FileName = styled(Support)`
  word-break: break-word;
`;

const RenderPdfPreview = ({ fileName, fileUrl, fromDashboard }) => (
  <a
    href={fileUrl}
    download
    target="_blank"
    rel="noopener noreferrer"
    className="text-decoration-none"
  >
    <PdfPreview fromDashboard={fromDashboard}>
      <DocType>{fileName?.split(".")?.slice(-1)?.[0]}</DocType>
    </PdfPreview>
  </a>
);

const NullState = () => (
  <NullStateFlex>
    <img
      alt="Null State"
      draggable="false"
      src="/assets/images/attachments-null-state.svg"
    />
    <Body1 bold>No files shared</Body1>
  </NullStateFlex>
);

const SharedFiles = () => {
  const [selectedTab, setSelectedTab] = useState("images"); // ["images", "docs"]
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImageIndex, setPreviewImageIndex] = useState(0);
  const [startX, setStartX] = useState(null);

  // FIXME: Hardcoded
  const { loading: imagesLoading, files: images } = useChatAttachments(
    "ndqzVxrgog6EACxRq-_YTRUrP5xz-qK8jHH2byTrxErEk3F6_rMfhSUd9",
    "wgvbunptx0twnxo3oxuztxpumkndsl84",
    "images"
  );
  const { loading: docsLoading, files: docs } = useChatAttachments(
    "ndqzVxrgog6EACxRq-_YTRUrP5xz-qK8jHH2byTrxErEk3F6_rMfhSUd9",
    "wgvbunptx0twnxo3oxuztxpumkndsl84",
    "docs"
  );

  const handleTouchStart = e => {
    setStartX(e?.touches?.[0]?.clientX || 0);
  };

  const handleTouchMove = e => {
    if (startX === null) return;
    const currentX = e.touches[0].clientX;
    const difference = startX - currentX;

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        setSelectedTab("docs");
      } else {
        setSelectedTab("images");
      }
      setStartX(null);
    }
  };

  const handleTouchEnd = () => {
    setStartX(null);
  };

  const isImageTab = selectedTab === "images";
  const showImageNullState = !imagesLoading && images.length === 0;
  const showDocNullState = !docsLoading && docs.length === 0;

  return (
    <Container>
      {previewImage && (
        <ImagePreviewPopup
          images={images}
          previewImageIndex={previewImageIndex}
          closePopup={() => setPreviewImage(false)}
        />
      )}

      <TabSelector>
        <Tab isSelected={isImageTab} onClick={() => setSelectedTab("images")}>
          IMAGES
        </Tab>
        <Tab isSelected={!isImageTab} onClick={() => setSelectedTab("docs")}>
          DOCS
        </Tab>
        <TabIndicator selectedTab={selectedTab} />
      </TabSelector>

      <Section
        selectedTab={selectedTab}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {showImageNullState ? (
          <NullState />
        ) : (
          <MediaContainer className={imagesLoading ? "blink" : ""}>
            {imagesLoading
              ? new Array(9).fill(1).map((_, i) => <LoadSquare key={i} />)
              : images.map(
                  ({ key, file_url, file_name, uploaded_at }, index) => (
                    <FlexBox column align="center" rowGap="0.25rem" key={key}>
                      <ImageThumb
                        key={key}
                        src={file_url}
                        alt={file_name}
                        draggable="false"
                        onClick={() => {
                          setPreviewImageIndex(index);
                          setPreviewImage(file_url);
                        }}
                      />
                      <FileName bold textAlign="center">
                        {file_name}
                      </FileName>
                      <Caption color={ACCENT_600}>
                        {uploaded_at
                          ? dayjs(uploaded_at * 1000).format("DD MMM YYYY")
                          : ""}
                      </Caption>
                    </FlexBox>
                  )
                )}
          </MediaContainer>
        )}

        {showDocNullState ? (
          <NullState />
        ) : (
          <MediaContainer className={docsLoading ? "blink" : ""}>
            {docsLoading
              ? new Array(9).fill(1).map((_, i) => <LoadSquare key={i} />)
              : docs?.map(({ key, file_url, file_name, uploaded_at }) => (
                  <FlexBox column align="center" rowGap="0.25rem" key={key}>
                    <RenderPdfPreview
                      key={key}
                      fileUrl={file_url}
                      fileName={file_name}
                    />
                    <FileName bold textAlign="center">
                      {file_name}
                    </FileName>
                    <Caption color={ACCENT_600}>
                      {uploaded_at
                        ? dayjs(uploaded_at * 1000).format("DD MMM YYYY")
                        : ""}
                    </Caption>
                  </FlexBox>
                ))}
          </MediaContainer>
        )}
      </Section>
    </Container>
  );
};

export default SharedFiles;
