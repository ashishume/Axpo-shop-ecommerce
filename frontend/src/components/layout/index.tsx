import Navbar from "../header/navbar";

const Layout = ({ children }: any) => {
  return (
    <div className="container mx-auto">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
