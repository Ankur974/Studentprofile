import React, { useRef, useState } from "react";
import { FiImage, FiPaperclip, FiPlus } from "react-icons/fi";
import styled, { css } from "styled-components";

import { boxShadowDs1 } from "@common/Dashboard/boxShadowStyles";
import FlexBox from "@common/ui/FlexBox";
import {
  ERROR_RED_400,
  SECONDARY_700,
  ACCENT_100,
  DAVYS_GRAY_400,
} from "@common/ui/colors";

const ActionsButton = styled(FlexBox)`
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  align-items: center;
  border-radius: 0.5rem;
  justify-content: center;
  border: 1px solid ${DAVYS_GRAY_400};
  background-color: ${ACCENT_100};
  ${({ withShadow }) => withShadow && boxShadowDs1}
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

const DrawerIndicator = styled(FiPlus)`
  stroke-width: 3px;
  color: ${SECONDARY_700};
  transition: transform 100ms ease-in-out;

  ${({ open }) =>
    open &&
    css`
      color: ${ERROR_RED_400};
      transform: rotate(45deg);
    `}
`;

const ActionsGrid = styled.div`
  display: grid;
  bottom: 3.5rem;
  padding: 0 1rem;
  overflow: hidden;
  position: absolute;
  grid-template-rows: 0fr;
  transition: all 300ms ease-in-out;

  ${({ expanded }) =>
    expanded &&
    css`
      grid-template-rows: 1fr;
    `}
`;

const ActionsContainer = styled(FlexBox)`
  min-height: 0;
  row-gap: 0.5rem;
  flex-direction: column;
`;

const AddFilesButton = ({ handleFileUpload, disabled }) => {
  const [expanded, setExpanded] = useState(false);

  const imageInputRef = useRef();
  const fileInputRef = useRef();

  return (
    <FlexBox position="relative" align="center" justify="center">
      <ActionsGrid expanded={expanded} data-testid="actions-grid">
        <ActionsContainer>
          <ActionsButton
            data-testid="image-button"
            withShadow
            onClick={() => {
              imageInputRef?.current?.click();
              setExpanded(false);
            }}
          >
            <FiImage size="1.5rem" color={SECONDARY_700} />
            <input
              data-testid="image-input"
              hidden
              type="file"
              name="image"
              accept="image/*"
              ref={imageInputRef}
              onChange={e => {
                handleFileUpload(e?.target?.files, e?.target?.name);
              }}
              onClick={e => {
                e.target.value = null;
              }}
            />
          </ActionsButton>
          <ActionsButton
            data-testid="file-button"
            withShadow
            onClick={() => {
              fileInputRef?.current?.click();
              setExpanded(false);
            }}
          >
            <FiPaperclip size="1.5rem" color={SECONDARY_700} />
            <input
              data-testid="file-input"
              hidden
              name="doc"
              type="file"
              ref={fileInputRef}
              accept=".doc, .docx,application/pdf"
              onChange={e => {
                handleFileUpload(e?.target?.files, e?.target?.name);
              }}
              onClick={e => {
                e.target.value = null;
              }}
            />
          </ActionsButton>
        </ActionsContainer>
      </ActionsGrid>

      <ActionsButton
        data-testid="toggle-button"
        onClick={() => !disabled && setExpanded(!expanded)}
        disabled={disabled}
      >
        <DrawerIndicator size="1.25rem" open={expanded} />
      </ActionsButton>
    </FlexBox>
  );
};

const MemoizedAddFileButton = React.memo(AddFilesButton);

export default MemoizedAddFileButton;
