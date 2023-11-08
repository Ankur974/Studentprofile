import styled from "styled-components";
import { FiX } from "react-icons/fi";

import { ACCENT_800, ACCENT_600, ERROR_500, white } from "@common/ui/colors";
import FlexBox from "@common/ui/FlexBox";
import { Body2, Support } from "@components/common/Dashboard/Headings";

const Wrapper = styled(FlexBox)`
  width: ${({ width }) => width || "100%"};
  position: relative;
  column-gap: 0.5rem;
  align-items: center;
  border-radius: 0.5rem;
  box-sizing: border-box;
  background-color: ${white};
  padding-right: 0.75rem;
  border: 1px solid ${({ theme }) => theme?.input?.border};
  overflow: hidden;
`;

export const InputBox = styled.input`
  flex: 1;
  width: ${({ width }) => width || "auto"};
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  font-family: "Quicksand";
  font-size: 0.875rem;
  line-height: 1.5rem;
  font-weight: ${({ fontWeight }) => fontWeight || 500};
  color: ${ACCENT_800};
  padding: 0.75rem 0 0.75rem 0.75rem;
  ::placeholder {
    color: ${ACCENT_600};
  }
`;

const CloseIconWrapper = styled(FlexBox)`
  background-color: ${white};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
`;

const RequiredIndicator = styled.span`
  color: ${({ theme }) => theme?.input?.requiredColor || ACCENT_800};
`;

const Input = ({
  label,
  type,
  error,
  placeholder,
  showCross,
  required = false,
  value,
  icon: Icon,
  theme,
  onBlur,
  width,
  readOnly = false,
  max,
  min,
  labelBold = false,
  name,
  onIconClick,
  onFocus,
  onSubmit,
  onKeyDown,
  onCrossIconClick,
  onClick = () => {},
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
        <Body2 bold={labelBold}>
          {label}
          {required && <RequiredIndicator>*</RequiredIndicator>}
        </Body2>
      )}
      <Wrapper theme={theme} width={width} onClick={onClick}>
        <InputBox
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
          onKeyDown={onKeyDown || handleKeyDown}
          theme={theme}
          readOnly={readOnly}
          max={max}
          min={min}
        />
        {showCross && !!value && (
          <CloseIconWrapper onClick={onCrossIconClick}>
            <FiX size="1rem" color={theme?.input?.crossIconColor} />
          </CloseIconWrapper>
        )}
        {Icon && (
          <Icon
            color={theme?.input?.IconColor}
            size="1.375rem"
            onClick={onIconClick}
            cursor="pointer"
          />
        )}
      </Wrapper>
      {error && <Support color={ERROR_500}>{error}</Support>}
    </FlexBox>
  );
};

Input.defaultProps = {
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

export default Input;
