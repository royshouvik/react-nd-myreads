import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose, withState, withHandlers } from 'recompose';
import { debounce } from 'lodash';
import Book from '../../components/Book';
import { search } from '../../BooksAPI';

const SEARCH_DEBOUNCE_DELAY = 500; // 800 milliseconds

const Search = ({ searchText, onChangeSearchInput, searchResults, searchError }) => {
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" value={searchText} onChange={onChangeSearchInput} />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchResults && searchResults.length > 0 && searchResults.map((book, index) => <li 
                        className="book"
                        key={index}>
                            <Book
                                book={book}
                                coverURL={book.imageLinks.thumbnail}
                            />
                    </li>
                    )}

                    {!searchError && searchResults.length === 0 && searchText !== '' && <h2 className="error"> Loading... </h2>}
                    {searchError && <h2 className="error"> No matching books found! </h2>}
                </ol>
            </div>
        </div>

    );
};

Search.propTypes = {

};

export default compose(
    withState('searchText', 'setSearchText', ''),
    withState('searchResults', 'setSearchResults', []),
    withState('searchError', 'setSearchError', false),
    withHandlers({
        onChangeSearchInput: ({ setSearchText, setSearchResults, setSearchError }) => (event) => {
            const updatedValue = event.target.value;
            setSearchText(updatedValue, debounce(() => {
                if (updatedValue.length > 2) {
                    search(updatedValue, 50)
                        .then(books => {
                            if (books.error) {
                                setSearchResults([]);
                                setSearchError(true);
                            } else {
                                setSearchResults(books);
                                setSearchError(false);
                            }
                        });
                } else {
                    setSearchResults([]);
                    setSearchError(false);
                }
            }, SEARCH_DEBOUNCE_DELAY, {
                    'leading': false,
                    'trailing': true,
                }));
        }
    })
)(Search);