import "./category-card.scss";
const CategoryCard = ({ imageSource, title }: { imageSource: string; title: string }) => {
  return (
    <div className="category-card-container">
      <img src={imageSource} width="150px" height="100px"  className="thumbnail-image"/>
      <div className="title">{title}</div>
    </div>
  );
};

export default CategoryCard;
