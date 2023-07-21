import "./thumbnail.scss";
const Thumbnail = () => {
  return (
    <div className="thumbnail-container py-10">
      <div className="left-content">
        <div className="text-5xl max-w-md antialiased font-bold font-sans"> SHOP COMPUTERS & ACCESSORIES</div>
        <div className="text-1xl pt-3 antialiased bold font-sans">Shop laptops, desktops, monitors, cameras, headphones and many more</div>
        <div className="view-more-button">View more</div>
      </div>
      <div className="right-content">
        <img className="image-headphone" src={"/assets/headphone.jpg"} height="250px" width="350px" />
      </div>
    </div>
  );
};

export default Thumbnail;
