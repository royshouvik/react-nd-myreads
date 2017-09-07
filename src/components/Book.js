import React from 'react';
import PropTypes from 'prop-types';
import { Shelves } from '../constants';

const Book = ({ book, coverURL, onChangeShelf }) => {
    const { id, shelf, title, subtitle, authors } = book;
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${coverURL})` }}></div>
                <div className="book-shelf-changer">
                    <select value={shelf} onChange={(event) => onChangeShelf(id, event.target.value)}>
                        <option value="none" disabled>Move to...</option>
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
        shelf: PropTypes.oneOf([Shelves.CURRENTLY_READING, Shelves.WANT_TO_READ, Shelves.READ])
    }),
    coverURL: PropTypes.string.isRequired,
};

export default Book;