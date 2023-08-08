import { ReactNode } from "react";
import Navbar from "../navbar/navbar";

const Layout = ({ children, searchValue = "", isFocused = false }: any) => {
  return (
    <div className="container mx-auto pr-5">
      <Navbar searchValue={searchValue} isFocused={isFocused} />
      {children}
    </div>
  );
};

export default Layout;
