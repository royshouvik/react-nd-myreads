import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './pages/Search';
import HomePage from './pages/Home';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }

    this.onChangeShelf = this.onChangeShelf.bind(this);
    this.getAllBooks = this.getAllBooks.bind(this);
  }

  getAllBooks() {
    BooksAPI.getAll()
    .then(books => this.setState({
      books,
    }));
  }

  componentDidMount() {
    this.getAllBooks();
  }
  
  onChangeShelf(id, shelf) {
    // Do a optimistic state update
    const { books } = this.state;
    const bookToUpdate = books.filter(book => book.id === id)[0];
    const bookWithUpdatedShelf = Object.assign({}, bookToUpdate, { shelf });
    const updatedBooks = [...books.filter(book => book.id !== id), bookWithUpdatedShelf];
    this.setState({
      books: updatedBooks,
    }, () => {
      BooksAPI.update({ id }, shelf)
      .catch(() => {
        // revert optimistic update if errored
        const revertedBooks = [...books.filter(book => book.id !== id), bookToUpdate];
        this.setState({
          books: revertedBooks,
        });
      });
    });
  }
  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route path="/" exact render={() => <HomePage books={books} onChangeShelf={this.onChangeShelf} />} />
        <Route path="/search" component={SearchPage} />
      </div>
    );
  }
}

export default App;