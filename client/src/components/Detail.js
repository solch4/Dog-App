import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../actions/actions";
import '../styles/Detail.css'
// import paw from '../assets/paw.png'
// import bone from '../assets/bone.png'

const Detail = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const details = useSelector(state => state.details)
  
  useEffect(() => {
    dispatch(getById(id))
  }, [dispatch, id])

  return (
    <div className="detail">
      <div className="detail-container">
      <Link className="back-btn-container" to='/home'>
        <button className="back-btn">⬅</button> {/* dsp cambiar x un svg o una img */}
      </Link>
      {
        Object.keys(details).length && typeof details !== 'string' ? (
          <div className="detail-body">
            <img className="detail-img" src={details.image} alt={details.name + ' img'} /> 
            <div className="detail-description">
            <div className="detail-title-container">
              <h1 className="detail-title">{details.name}</h1>
              {/* <img className="detail-title-paw" src={paw} alt='' /> */}
            </div>
              <h3 className="detail-aboutme">About me</h3>
              <p><span className="detail-category">Height: </span>{details.height} cm</p>
              <p><span className="detail-category">Weight: </span>{details.weight} kg</p>
              {
                details.life_span && details.life_span[0] !== ' '
                ? <p><span className="detail-category">Life span: </span>{details.life_span}</p>
                : null
              }
              {/* dogs created in db */}
              {
                Array.isArray(details.temperaments) && details.temperaments.length
                ? <p>My temperament is: {details.temperaments.map(t => Object.values(t)).join(', ')}.</p>
                : null
              }
              {/* dogs api */}
              {
                typeof details.temperaments === 'string' && details.temperaments.length
                ? <p>{details.temperaments.length ? `My temperament is: ${details.temperaments}.` : null}</p>
                : null
              }
            </div>
          </div>
        ) : (
          <h4>{Array.isArray(details) ? 'Loading...' : details}</h4>
        )
      }
      </div>
    </div>
  );
};

export default Detail;