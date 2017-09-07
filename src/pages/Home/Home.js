import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose, withState, withHandlers, lifecycle, withProps } from 'recompose';
import { getAll } from '../../BooksAPI';
import Bookshelf from '../../components/Bookshelf';
import { Shelves } from '../../constants';

const Home = ({ books, currentlyReadingBooks, wantToReadBooks, readBooks, onChangeShelf }) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>My Reads</h1>
            </div>
            {!books && <h2 className="error">Loading...</h2>}
            {books && (
                <div className="list-books-content">
                    <div>
                        {
                            currentlyReadingBooks && <Bookshelf onChangeShelf={onChangeShelf} name="Currently Reading" books={currentlyReadingBooks} />
                        }
                        {
                            wantToReadBooks && <Bookshelf onChangeShelf={onChangeShelf} name="Want to Read" books={wantToReadBooks} />
                        }
                        {
                            readBooks && <Bookshelf onChangeShelf={onChangeShelf} name="Read" books={readBooks} />
                        }
                        
                    </div>
                </div>

            )}
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
};

Home.propTypes = {

};

export default compose(
    withProps(({ books }) => {
        if (books) {
            const currentlyReadingBooks = books.filter(book => book.shelf === Shelves.CURRENTLY_READING);
            const wantToReadBooks = books.filter(book => book.shelf === Shelves.WANT_TO_READ);
            const readBooks = books.filter(book => book.shelf === Shelves.READ);
            return {
                currentlyReadingBooks,
                wantToReadBooks,
                readBooks,
            }
        }
    })
)(Home);