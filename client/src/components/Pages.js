import React from "react";

const Pages = (allDogs, dogsPerPage, pages) => {
  const paginas = []
  const indexPaginas = Math.ceil(allDogs / dogsPerPage)
  
  for (let i=0; i<indexPaginas; i++){
    paginas.push(i+1)
  }

  return (
    <nav>
      <ul>
        {
          paginas?.map((num) => (
            <div className="divPages" key={num}>
              <li key={num}> 
                <a className="aPages" onClick={() => pages(num)}>{num}</a>
              </li>
            </div>
          ))
        }
      </ul>
    </nav>
  )
}

export default Pages