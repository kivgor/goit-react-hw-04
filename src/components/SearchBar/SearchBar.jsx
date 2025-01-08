import css from './SearchBar.module.css';
const SearchBar = ({ handleChangeQuery }) => {
  return (
    <header>
      <form className={css.form} onSubmit={handleChangeQuery}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};
export default SearchBar;
