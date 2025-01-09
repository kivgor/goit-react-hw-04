import { useState } from 'react';
import css from './SearchBar.module.css';

const SearchBar = ({ handleChangeQuery }) => {
  const [value, setValue] = useState('');
  const handleSubmit = evt => {
    evt.preventDefault();
    handleChangeQuery(value);
    evt.target.reset();
  };

  return (
    <header>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          onChange={evt => setValue(evt.target.value.trim())}
          // value={value}
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};
export default SearchBar;
