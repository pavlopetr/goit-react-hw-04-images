import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ handelSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      Notify.failure('Empty request');
      return;
    }

    handelSearch(query);
  };
  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.label}></span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          value={query}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
