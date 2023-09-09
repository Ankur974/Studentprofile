import { components } from "react-select";
import { IoCaretUpSharp, IoCaretDownSharp } from "react-icons/io5";
import { MOSS_GREEN_800 } from "../../colors";

const DropdownIndicator = props => {
  const isOpen = props.selectProps.menuIsOpen;
  return (
    <components.DropdownIndicator {...props}>
      {isOpen ? (
        <IoCaretUpSharp size="1rem" color={MOSS_GREEN_800} />
      ) : (
        <IoCaretDownSharp size="1rem" color={MOSS_GREEN_800} />
      )}
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
