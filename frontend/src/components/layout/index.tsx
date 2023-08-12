import { ReactNode } from 'react';
import Navbar from '../navbar/navbar';
const Layout = ({ children, searchValue = '', isFocused = false }: any) => {
  return (
    <div className="mx-auto">
      <Navbar searchValue={searchValue} isFocused={isFocused} />
      {children}
    </div>
  );
};

export default Layout;
