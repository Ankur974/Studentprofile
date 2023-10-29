import styled from "styled-components";

import { ACCENT_800, ACCENT_600, ERROR_500, white } from "@common/ui/colors";

import FlexBox from "@common/ui/FlexBox";
import { Body2, Support } from "@components/common/Dashboard/Headings";

const Wrapper = styled(FlexBox)`
  width: 100%;
  position: relative;
  column-gap: 0.5rem;
  align-items: center;
  border-radius: 0.5rem;
  box-sizing: border-box;
  background-color: ${white};
  border: 1px solid ${({ theme }) => theme?.input?.border};
  padding: ${({ theme }) => theme?.input?.padding};
`;

const TextAreaInput = styled.textarea`
  flex: 1;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  font-family: "Quicksand";
  font-size: 0.875rem;
  line-height: 1.5rem;
  font-weight: 500;
  width: 100%;
  resize: vertical;
  color: ${ACCENT_800};
  ::placeholder {
    color: ${ACCENT_600};
  }
`;

const RequiredIndicator = styled.span`
  color: ${({ theme }) => theme?.input?.requiredColor || ACCENT_800};
`;

const TextArea = ({
  label,
  error,
  type,
  placeholder,
  value,
  theme,
  name,
  required = false,
  readOnly = false,
  rows = 5,
  onFocus,
  onSubmit,
  onBlur,
  onChange = () => {},
  onChangeValue = () => {},
}) => {
  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      onSubmit?.();
    }
  };

  return (
    <FlexBox column rowGap="0.5rem" width="100%">
      {label && (
        <Body2>
          {label}
          {required && <RequiredIndicator>*</RequiredIndicator>}
        </Body2>
      )}
      <Wrapper theme={theme}>
        <TextAreaInput
          name={name}
          value={value}
          type={type}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          onChange={e => {
            onChange(e);
            onChangeValue(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          theme={theme}
          rows={rows}
          readOnly={readOnly}
        />
      </Wrapper>
      {error && <Support color={ERROR_500}>{error}</Support>}
    </FlexBox>
  );
};

TextArea.defaultProps = {
  theme: {
    input: {
      padding: "0.75rem",
      border: ACCENT_600,
      requiredColor: ACCENT_800,
      IconColor: ACCENT_800,
      crossIconColor: ACCENT_800,
    },
  },
};

export default TextArea;
