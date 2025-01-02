import css from './SearchBar.module.css'
const SearchBar = () => {
    return (
        <header>
            <form className={css.form}>
                <input className={css.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                <button type="submit">Search</button>
            </form>
        </header>
    );
};
export default SearchBar;