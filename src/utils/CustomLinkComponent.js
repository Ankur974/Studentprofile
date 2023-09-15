import NextLink from "next/link";
import { getRedirectLink } from "./helpers";

const CustomLinkComponent = ({ children, href, onClick }) => {
  let url = getRedirectLink(href, false, true);
  if (typeof onClick === "function") {
    return <div onClick={onClick}>{children}</div>;
  } else {
    return (
      <NextLink href={url} passHref prefetch={false}>
        {children}
      </NextLink>
    );
  }
};

export default CustomLinkComponent;
