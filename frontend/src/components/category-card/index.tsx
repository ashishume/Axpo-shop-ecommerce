import './category-card.scss';
const CategoryCard = ({
  openCategory,
  imageSource,
  title,
}: {
  openCategory: () => void;
  imageSource: string;
  title: string;
}) => {
  return (
    <div className="category-card-container" onClick={openCategory}>
      <img
        src={imageSource}
        width="150px"
        height="100px"
        className="thumbnail-image"
      />
      <div className="title">{title}</div>
    </div>
  );
};

export default CategoryCard;
