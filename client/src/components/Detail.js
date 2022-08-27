import React, {useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById, clearDetail } from "../actions/actions";
import svgArr from '../assets/svg-arrow.svg'
import '../styles/Detail.css'

const Detail = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const details = useSelector(state => state.details)
  
  useEffect(() => {
    dispatch(getById(id))
    dispatch(clearDetail())
  }, [dispatch, id])

  const handleGoBack = () => navigate('/home')
  
  return (
    <div className="detail">
      <div className="detail-container">
        <button onClick={handleGoBack} className="back-btn">
          <img src={svgArr} alt='Go back'/>
        </button>
      {
        Object.keys(details).length && typeof details !== 'string' ? (
          <div className="detail-body">
            <img className="detail-img" src={details.image} alt={details.name + ' img'} /> 
            <div className="detail-description">
            <div className="detail-title-container">
              <h1 className="detail-title">{details.name}</h1>
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
          <h3>{Array.isArray(details) ? 'Loading...' : details}</h3>
        )
      }
      </div>
    </div>
  );
};

export default Detail;