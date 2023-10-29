import {
  ACCENT_100,
  ACCENT_200,
  ACCENT_400,
  ACCENT_600,
  ACCENT_700,
  ACCENT_800,
  DARK_MOSS_GREEN_100,
  DARK_MOSS_GREEN_800,
} from "@common/ui/colors";

const dropdownStyles = {
  control: baseStyles => ({
    ...baseStyles,
    padding: "0.75rem 0.75rem 0.75rem 2.5rem",
    borderRadius: "0.5rem",
    boxShadow: "none",
    borderColor: ACCENT_600,
    "&:hover": {
      borderColor: ACCENT_700,
    },
    cursor: "pointer",
  }),
  loadingIndicator: baseStyles => ({
    ...baseStyles,
    color: DARK_MOSS_GREEN_800,
  }),
  clearIndicator: baseStyles => ({
    ...baseStyles,
    padding: 0,
  }),
  dropdownIndicator: baseStyles => ({
    ...baseStyles,
    display: "none",
  }),
  indicatorSeparator: baseStyles => ({
    ...baseStyles,
    display: "none",
  }),
  valueContainer: baseStyles => ({
    ...baseStyles,
    padding: 0,
    lineHeight: "1.5rem",
  }),
  singleValue: baseStyles => ({
    ...baseStyles,
    margin: 0,
    fontSize: "0.875rem",
    lineHeight: "1.5rem",
    color: ACCENT_800,
  }),
  input: baseStyles => ({
    ...baseStyles,
    margin: 0,
    padding: 0,
    fontSize: "0.875rem",
    lineHeight: "1.5rem",
  }),
  placeholder: baseStyles => ({
    ...baseStyles,
    fontSize: "0.875rem",
    lineHeight: "1.5rem",
    color: ACCENT_600,
  }),
  menu: baseStyles => ({
    ...baseStyles,
    border: `1px solid ${ACCENT_400}`,
    boxShadow: "0px 0px 8px 4px rgb(0 0 0 / 4%)",
    borderRadius: "0.5rem",
    overflow: "hidden",
  }),
  menuList: baseStyles => ({
    ...baseStyles,
    padding: 0,
    maxHeight: "24rem",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    fontSize: "0.875rem",
  }),
  option: (baseStyles, state) => ({
    padding: 0,
    cursor: "pointer",
    backgroundColor: state.isSelected ? DARK_MOSS_GREEN_100 : ACCENT_100,
    "&:hover": {
      backgroundColor: state.isSelected ? DARK_MOSS_GREEN_100 : ACCENT_200,
    },
  }),
};

export default dropdownStyles;
