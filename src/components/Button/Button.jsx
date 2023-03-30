import { useState, useEffect } from 'react';
import css from './Button.module.css';

export default function Button({ handlePage, toggleLoader }) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    handlePage(page);
  }, [handlePage, page]);

  return (
    <button
      type="button"
      onClick={() => {
        toggleLoader();
        setPage(state => state + 1);
      }}
      className={css.button}
    >
      Load more
    </button>
  );
}
