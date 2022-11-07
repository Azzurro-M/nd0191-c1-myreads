import React from "react";
import Shelf from "./Shelf";

function MainShelf({ allBooks, moveToShelf }) {
  const shelfTitle = (shelf) => {
    const shelfName = allBooks.filter((book) => book.shelf === shelf);
    return shelfName;
  };
  //   const wantToRead = allBooks.filter((book) => {
  //     return book.shelf === "wantToRead";
  //   });

  //   const read = allBooks.filter((book) => {
  //     return book.shelf === "read";
  //   });

  return (
    <div>
      <Shelf
        title={"Currently Reading"}
        moveToShelf={moveToShelf}
        allBooks={shelfTitle("currentlyReading")}
      />
      <Shelf
        title={"Want To Read"}
        moveToShelf={moveToShelf}
        allBooks={shelfTitle("wantToRead")}
      />
      <Shelf
        title={"Read"}
        moveToShelf={moveToShelf}
        allBooks={shelfTitle("read")}
      />
    </div>
  );
}

export default MainShelf;
