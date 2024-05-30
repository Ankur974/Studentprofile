// components/Layout.js
import Link from "next/link";
import styled from "styled-components";

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  border-bottom: 1px solid #eaeaea;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  a {
    margin-left: 1.5rem;
    text-decoration: none;
    color: black;
  }
`;

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar>
        <Logo>LENS</Logo>
        <NavLinks>
          <Link href="/" passHref>
            Home
          </Link>
          <Link href="/company" passHref>
            Company
          </Link>
          <Link href="/blogs" passHref>
            Blogs
          </Link>
        </NavLinks>
      </Navbar>
      {children}
    </div>
  );
};

export default Layout;
