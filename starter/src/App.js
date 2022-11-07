import "./App.css";
import { useState, useEffect } from "react";
import Book from "./Components/Book";
import { get, getAll, update, search } from "./BooksAPI";
import MainShelf from "./Components/MainShelf";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  const [allBooks, setAllBooks] = useState([]);

  const [searchBooks, setSearchBooks] = useState([]);

  useEffect(() => {
    getAll().then((data) => {
      setAllBooks(data);
    });
  }, []);

  const moveToShelf = async (book, targetShelf) => {
    const response = await update(book, targetShelf);
    setAllBooks((books) => {
      const newBooks = books.map((b) => {
        if (b.id !== book.id) {
          return b;
        } else {
          return {
            ...b,
            shelf: targetShelf,
          };
        }
      });

      if (!newBooks.find((existingBook) => existingBook.id === book.id)) {
        console.log("book did not exsist");
        newBooks.push(book);
      }
      console.log("adding new books", newBooks);
      return newBooks;
    });
  };

  const handleSearch = (e) => {
    const userInput = e.target.value;
    console.log(userInput);
    if (userInput) {
      search(userInput).then((searchResults) => {
        if (searchResults instanceof Array) {
          console.log(searchResults);
          setSearchBooks(
            searchResults.map((searchResultBook) => {
              const existingBook = allBooks.find(
                (book) => searchResultBook.id === book.id
              );
              if (existingBook) {
                searchResultBook.shelf = existingBook.shelf;
              }
              return searchResultBook;
            })
          );
        } else {
          setSearchBooks([]);
        }
      });
    } else {
      setSearchBooks([]);
    }
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                onChange={handleSearch}
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {searchBooks &&
                searchBooks.map((book) => (
                  <li key={book.id}>
                    <Book moveToShelf={moveToShelf} book={book} />
                  </li>
                ))}
            </ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <MainShelf allBooks={allBooks} moveToShelf={moveToShelf} />
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
