import ImageCard from '../ImageCard/ImageCard.jsx';
import css from './ImageGallery.module.css';

const ImageGallery = ({ imageList, openModal }) => {
  return (
    <ul className={css.list}>
      {imageList.map(image => (
        <li key={image.id} className={css.item}>
          <ImageCard {...image} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
