import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ handleLoadMore }) => {
  return (
    <div className={css.thumb}>
      <button onClick={handleLoadMore} className={css.button} type="text">
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
