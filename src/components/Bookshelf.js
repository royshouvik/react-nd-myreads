import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const Bookshelf = ({ name, books, onChangeShelf }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ name }</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books && books.length > 0 && books.map((book, index) => <li key={index}>
                            <Book
                                onChangeShelf={onChangeShelf}
                                book={book}
                                coverURL={book.imageLinks.thumbnail}
                            />
                        </li>)
                    }
                    {
                        books && books.length === 0 && <h2 className="error">There are no books in this category.</h2>
                    }
                </ol>
            </div>
        </div>
    );
};

Bookshelf.propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
};

export default Bookshelf;