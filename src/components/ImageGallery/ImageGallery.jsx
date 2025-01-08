import ImageCard from '../ImageCard/ImageCard.jsx';
import css from './ImageGallery.module.css';

const ImageGallery = ({ imageList, openModal }) => {
  return (
    <ul className={css.list}>
      {imageList.map(image => (
        <ImageCard {...image} key={image.id} openModal={openModal} />
      ))}
    </ul>
  );
};

export default ImageGallery;
