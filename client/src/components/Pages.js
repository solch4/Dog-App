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
            <li className="pageNumber" key={num}>
              <a onClick={() => pages(num)}>
                {num}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Pages;
