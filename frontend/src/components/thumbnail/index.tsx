import { useNavigate } from "react-router-dom";
import "./thumbnail.scss";
import CategoryList from "../../pages/Category";
import Layout from "../layout";
const Thumbnail = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="thumbnail-container py-10">
        <div className="left-content">
          <div className="text-5xl max-sm:text-2xl max-w-md antialiased font-bold font-sans"> SHOP COMPUTERS & ACCESSORIES AND MORE</div>
          <div className="text-1xl max-sm:text-sm pt-3 antialiased bold font-sans">
            Shop laptops, desktops, monitors, cameras, headphones and many more
          </div>
          <div className="view-more-button max-sm:text-sm bg-white shadow" onClick={() => navigate("/products")}>
            View more
          </div>
        </div>
        <div className="right-content">
          <img className="image-headphone" src={"/assets/headphone.jpg"} height="250px" width="350px" />
        </div>
      </div>
      <div className="thumbnail-categories max-sm:text-2xl text-4xl font-normal antialiased m-5">
        Recommended categories
      </div>
        <CategoryList />
    </>
  );
};

export default Thumbnail;
