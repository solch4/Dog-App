import React from "react";

const Card = ({ name, image, weight, temperaments }) => {
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <p>{weight} kg</p>
      <p>{temperaments}</p>
    </div>
  );
};

export default Card;
