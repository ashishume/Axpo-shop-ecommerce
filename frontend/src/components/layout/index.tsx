import Navbar from "../navbar/navbar";

const Layout = ({ children }: any) => {
  return (
    <div className="container mx-auto">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
