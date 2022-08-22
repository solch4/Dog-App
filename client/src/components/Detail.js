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

  return (
    <div>
      <Link className="back-btn-container" to='/home'>
        <button className="back-btn">⬅</button> {/* dsp cambiar x un svg o una img */}
      </Link>
      {
        Object.keys(details).length && typeof details !== 'string' ? (
          <div>
            <h1>{details.name}</h1>
            <img src={details.image} alt={details.name + ' img'} /> 
            <h3>About me</h3>
            <p>Height: {details.height} cm</p>
            <p>Weight: {details.weight} kg</p>
            {
              details.life_span && details.life_span[0] !== ' '
              ? <p>Life span: {details.life_span}</p>
              : null
            }
            {/* dogs created in db */}
            {
              Array.isArray(details.temperaments) && details.temperaments.length
              ? <p>Temperaments: {details.temperaments.map(t => Object.values(t)).join(', ')}</p>
              : null
            }
            {/* dogs api */}
            {
              typeof details.temperaments === 'string' && details.temperaments.length
              ? <p>{details.temperaments.length ? 'Temperaments: ' + details.temperaments : null}</p>
              : null
            }
          </div>
        ) : (
          <h4>{Array.isArray(details) ? 'Loading...' : details}</h4>
        )
      }
    </div>
  );
};

export default Detail;