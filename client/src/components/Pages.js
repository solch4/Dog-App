import React from "react";
import "../styles/Pages.css";

const Pages = ({ allDogs, dogsPerPage, pages }) => {
  const pageNumbers = [];
  const indexPageNumbers = Math.ceil(allDogs / dogsPerPage);

  for (let i = 0; i < indexPageNumbers; i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul className="pages">
        {pageNumbers &&
          pageNumbers.map((num) => (
            <a key={num} onClick={() => pages(num)}>
              <li className="pageNumber">
                {num}
              </li>
            </a>
          ))}
      </ul>
    </nav>
  );
};

export default Pages;
