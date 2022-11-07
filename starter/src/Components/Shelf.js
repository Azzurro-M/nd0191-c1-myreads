import React from "react";
import Book from "./Book";

function Shelf({ allBooks, title, moveToShelf }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {allBooks.map((book) => (
            <li key={book.id}>
              <Book moveToShelf={moveToShelf} book={book} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Shelf;
