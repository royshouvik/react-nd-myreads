import React from 'react';
import PropTypes from 'prop-types';
import { Shelves } from '../constants';

const Book = ({ book, coverURL, onChangeShelf }) => {
    const { shelf, title, subtitle, authors } = book;
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 160, backgroundImage: `url(${coverURL})` }}></div>
                <div className="book-shelf-changer">
                    <select value={shelf || 'none'} onChange={(event) => onChangeShelf(book, event.target.value)}>
                        <option disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">
                { title }
                {subtitle && ` - ${subtitle}`}
            </div>
            { authors && <ol className="book-authors">{ authors.map((author, index) => <li key={index}> {author} </li>) }</ol>}
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.shape({
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.string),
        shelf: PropTypes.oneOf([Shelves.CURRENTLY_READING, Shelves.WANT_TO_READ, Shelves.READ, Shelves.NONE])
    }),
    coverURL: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
};

export default Book;