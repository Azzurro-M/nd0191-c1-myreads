import { useState } from "react";

const Book = ({ book, moveToShelf }) => {
  // const [select, setSelect] = useState(book.shelf);

  const handleChange = (e) => {
    const targetShelf = e.target.value;
    console.log("moving a book to", targetShelf, book);
    moveToShelf(book, targetShelf);
  };

  // console.log(book);
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks.thumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select onChange={handleChange} value={book.shelf || "none"}>
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  );
};

export default Book;
