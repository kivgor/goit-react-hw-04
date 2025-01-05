import ImageCard from '../ImageCard/ImageCard.jsx';
import css from './ImageGallery.module.css';

const ImageGallery = ({ imageList }) => {
  console.log(imageList);

  return (
    <ul className={css.list}>
      {imageList.map(image => (
        <ImageCard {...image} key={image.id} />
      ))}
    </ul>
  );
};

export default ImageGallery;
