import { useState, useEffect } from 'react';
import css from './Searchbar.module.css';
import searchImages from 'services/api';

export default function Searchbar({
  handleNewImages,
  toggleLoader,
  handleImages,
  page,
}) {
  const [searchValue, setSearchValue] = useState('');
  const [prevSearch, setPrevSearch] = useState('');

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    toggleLoader();
    searchImages(prevSearch, page).then(res => handleImages(res));

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <header className={css.searchbar}>
      <form
        className={css.form}
        onSubmit={e => {
          e.preventDefault();

          if (prevSearch !== searchValue && searchValue !== '')
            searchImages(searchValue, page)
              .then(res => {
                handleNewImages(res);
              })
              .catch(error => console.log(error))
              .finally(() => {});

          setPrevSearch(searchValue);
        }}
      >
        <button type="submit" className={css.searchForm__button}>
          <span className={css.searchForm__button__label}>Search</span>
        </button>

        <input
          onChange={e => {
            setSearchValue(e.currentTarget.value);
          }}
          className={css.searchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
        />
      </form>
    </header>
  );
}

// export class Searchbar extends Component {
//   state = {
//     data: [],
//     searchValue: '',
//     prevSearch: '',
//     page: 1,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.page !== this.props.page) {
//       const { prevSearch } = this.state;
//       const { page } = this.props;
// searchImages(prevSearch, page).then(res => this.props.handleImages(res));
//     }
//   }

//   render() {
//     const { searchValue, page, prevSearch } = this.state;
//     const { handleNewImages, toggleLoader } = this.props;
// return (
//   <header className={css.searchbar}>
//     <form
//       className={css.form}
//       onSubmit={e => {
//         e.preventDefault();

//         if (prevSearch !== searchValue && searchValue !== '')
//           searchImages(searchValue, page)
//             .then(res => {
//               handleNewImages(res);
//             })
//             .catch(error => console.log(error))
//             .finally(() => {
//               toggleLoader();
//             });

//         this.setState({ prevSearch: searchValue });
//       }}
//     >
//       <button type="submit" className={css.searchForm__button}>
//         <span className={css.searchForm__button__label}>Search</span>
//       </button>

//       <input
//         onChange={e => {
//           this.setState({
//             searchValue: e.currentTarget.value,
//           });
//         }}
//         className={css.searchForm__input}
//         type="text"
//         autoComplete="off"
//         autoFocus
//         placeholder="Search images and photos"
//         value={searchValue}
//       />
//     </form>
//   </header>
// );
//   }
// }
