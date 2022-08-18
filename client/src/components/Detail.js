import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../actions/actions";

const Detail = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const details = useSelector(state => state.details)
  
  useEffect(() => {
    dispatch(getById(id))
  }, [dispatch, id])

  // console.log(details);

  return (
    <div>
      {
        Object.keys(details).length ? (
          <div>
            <h1>{details.name}</h1>
            <img src={details.image} alt={details.name + ' img'} /> 
            <h3>About me</h3>
            <p>Height: {details.height} cm</p>
            <p>Weight: {details.weight} kg</p>
            <p>Life span: {details.life_span}</p>
            <p>Temperaments: {!details.DB_created ? details.temperaments : details.temperaments.map(t => t.name + ', ')}</p>
          </div>
        ) : (
          <h4>Loading...</h4>
        )
      }
    </div>
  );
};

export default Detail;