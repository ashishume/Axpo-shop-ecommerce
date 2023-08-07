import { ReactNode } from "react";
import Navbar from "../navbar/navbar";

const Layout = ({ children, searchValue = "", isFocused }: any) => {
  return (
    <div className="container mx-auto">
      <Navbar searchValue={searchValue} isFocused={isFocused} />
      {children}
    </div>
  );
};

export default Layout;
