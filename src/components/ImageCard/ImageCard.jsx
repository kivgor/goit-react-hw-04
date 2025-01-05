import css from './ImageCard.module.css';
const ImageCard = ({ urls, alt_description, likes, user }) => {
  return (
    <li className={css.item}>
      <div className={css.text}>
        <span className={css.bold}>Autor: </span> {user.name}
      </div>
      <div>
        <img className={css.img} src={urls.small} alt={alt_description} />
      </div>
      <div className={css.text}>
        <span className={css.bold}>Likes: </span> {likes}
      </div>
    </li>
  );
};

export default ImageCard;
