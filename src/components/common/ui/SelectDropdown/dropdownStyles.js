import {
  DAVYS_GREY_100,
  DAVYS_GREY_200,
  DAVYS_GREY_400,
  DAVYS_GREY_500,
  MOSS_GREEN_100,
  MOSS_GREEN_900,
} from "../../colors";

const dropdownStyles = {
  control: baseStyles => ({
    ...baseStyles,
    width: "14rem",
    padding: "0.5rem 0.5rem 0.5rem",
    borderRadius: "0.5rem",
    boxShadow: "none",
    borderColor: DAVYS_GREY_400,
    "&:hover": {
      borderColor: DAVYS_GREY_500,
    },
    cursor: "pointer",
  }),
  dropdownIndicator: baseStyles => ({
    ...baseStyles,
    padding: "0.25rem",
  }),
  indicatorSeparator: baseStyles => ({
    ...baseStyles,
    display: "none",
  }),
  valueContainer: baseStyles => ({
    ...baseStyles,
    padding: "0 0 0 0.5rem",
  }),
  singleValue: baseStyles => ({
    ...baseStyles,
    margin: 0,
    fontSize: "0.875rem",
    lineHeight: "1.5rem",
    fontWeight: "bold",
    color: MOSS_GREEN_900,
  }),
  menu: baseStyles => ({
    ...baseStyles,
    border: `1px solid ${DAVYS_GREY_400}`,
    boxShadow: "0px 0px 8px 4px rgb(0 0 0 / 4%)",
    borderRadius: "0.5rem",
    overflow: "hidden",
  }),
  menuList: baseStyles => ({
    ...baseStyles,
    padding: 0,
    "&::-webkit-scrollbar": {
      display: "none",
      width: "0 !important",
    },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }),
  option: (baseStyles, state) => ({
    padding: 0,
    cursor: "pointer",
    backgroundColor: state.isSelected ? MOSS_GREEN_100 : DAVYS_GREY_100,
    "&:hover": {
      backgroundColor: state.isSelected ? MOSS_GREEN_100 : DAVYS_GREY_200,
    },
  }),
};

export default dropdownStyles;
