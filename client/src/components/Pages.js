import React from "react";
import "../styles/Pages.css";

const Pages = ({ dogs, dogsPerPage, pages }) => {
  const pageNumbers = [];
  const indexPageNumbers = Math.ceil(dogs / dogsPerPage);

  for (let i = 0; i < indexPageNumbers; i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul className="pages">
        {pageNumbers &&
          pageNumbers.map((num) => (
            <li className="pageNumber" key={num} onClick={() => pages(num)}>
              {num}
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Pages;
