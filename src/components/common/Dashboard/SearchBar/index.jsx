import styled from "styled-components";
import Select from "react-select";
import { FiSearch } from "react-icons/fi";
import { ACCENT_800 } from "@common/ui/colors";
import dropdownStyles from "./CustomDropdown/dropdownStyles";
import ClearIndicator from "./CustomDropdown/ClearIndicator";
import Option from "./CustomDropdown/Option";

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const SearchIcon = styled(FiSearch)`
  z-index: 1;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 0.25rem;
  stroke-width: 3;
  color: ${ACCENT_800};
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
`;

const SearchBar = props => {
  const {
    isLoading = false,
    options,
    value,
    onChange,
    filterOption,
    noOptionsMessage = "No Results Found",
  } = props;
  return (
    <Container>
      <SearchIcon />
      <Select
        styles={dropdownStyles}
        isSearchable
        isClearable
        placeholder="Search by name or ID"
        isLoading={isLoading}
        options={options}
        filterOption={filterOption}
        onChange={onChange}
        noOptionsMessage={() => noOptionsMessage}
        value={value}
        components={{
          ClearIndicator,
          Option,
        }}
        {...props}
      />
    </Container>
  );
};

export default SearchBar;
