import React from "react";
import { useSelector } from "react-redux";
import "../styles/Pages.css";

const Pages = ({ dogsPerPage, pages }) => {
  const dogs = useSelector(state => state.dogs)
  const actualPage = useSelector(state => state.actualPage)
  const minPageNumber = useSelector(state => state.minPageNumber)
  const maxPageNumber = useSelector(state => state.maxPageNumber)

  const pageNumbers = [];
  //pregunto si es un array para tener una sola pág cuando tenga el string de dog not found
  const indexPageNumbers = Math.ceil((Array.isArray(dogs) ? dogs.length : 1) / dogsPerPage);
  for (let i = 1; i <= indexPageNumbers; i++) pageNumbers.push(i);

  const handlePrev = () => (actualPage-1) && pages(actualPage - 1)
  const handleNext = () => (actualPage!==pageNumbers.length) && pages(actualPage + 1)

  return (
    <ul className="pages">
      <li className={actualPage === 1 ? 'pageNumber disabled' : "pageNumber"} onClick={handlePrev}>
        Prev
      </li>
      
      {pageNumbers.slice(minPageNumber, maxPageNumber).map((num) => (
        <li className={actualPage === num ? 'pageNumber activePage' : "pageNumber"} key={num} onClick={() => pages(num)}>
          {num}
        </li>
      ))}
      
      <li className={actualPage === pageNumbers.length ? 'pageNumber disabled' : "pageNumber"} onClick={handleNext}>
        Next
      </li>
    </ul>
  );
};

export default Pages;
