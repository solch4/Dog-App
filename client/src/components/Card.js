import React from "react";
import '../styles/Card.css'

const Card = ({ name, image, weight, temperaments }) => {
  return (
    <div>
      <h3>{name}</h3>
      <img className="dogImg" src={image} alt={name} />
      {/* 
      "temperaments": [
      {
        "name": "Stubborn"
      },
      {
        "name": "Active"
      },
      {
        "name": "Happy"
      }
      ]
      */}
      {
        Array.isArray(temperaments) ? temperaments.map((t, id) => (
          <span key={id}>{t.name}, </span>
        )) : <p>{temperaments}</p>
      }
      <p>{weight} kg</p>
    </div>
  );
};

export default Card;
