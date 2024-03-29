import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById, clearDetail, deleteDog } from "../actions/actions";
import svgArr from '../assets/svg-arrow.svg'
import noDog from '../assets/no-dog.svg'
import '../styles/Detail.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Detail = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const details = useSelector(state => state.details)
  
  //component did mount/update
  useEffect(() => {
    dispatch(getById(id))
  }, [dispatch, id])

  //component will unmount
  useEffect(() => {
    return () => dispatch(clearDetail())
  }, [dispatch])

  const handleDeleteDog = () => {
    MySwal.fire({
      icon: 'warning',
      title: 'Are you sure you want to delete this dog?',
      text: "You won't be able to revert this.",
      showDenyButton: true,
      confirmButtonText: 'Yes, delete it',
      denyButtonText: 'No, cancel',
      confirmButtonColor: "var(--clr-orange)",
      denyButtonColor: "var(--clr-light-brown)",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDog(id));
        MySwal.fire({
          icon: 'success',
          title: 'Deleted!', 
          text: 'The dog was successfully deleted from existence.', 
          confirmButtonColor: "var(--clr-orange)",
        })
        navigate("/home");
      } else if (result.isDenied) {
        MySwal.fire({
          icon: 'error',
          title: 'Cancelled', 
          text: 'The dog is safe!', 
          confirmButtonColor: "var(--clr-orange)",
        })
      }
    })
  }
  
  const handleEditDog = () => navigate(`/dogs/${id}/edit`);

  const handleGoBack = () => navigate(-1)
  
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
              <h1 className="detail-title">{details.name}</h1>
              <h3 className="detail-aboutme">About me</h3>
              <p><span className="detail-category">Height: </span>{details.height} cm</p>
              <p><span className="detail-category">Weight: </span>{details.weight} kg</p>
              {details.life_span && details.life_span[0] !== ' '
                ? <p><span className="detail-category">Life span: </span>{details.life_span}</p>
                : null}

              {/* dogs created in db */}
              {Array.isArray(details.temperaments) && details.temperaments.length
                ? <p>My temperament is: {details.temperaments.map(t => Object.values(t)).join(', ')}.</p>
                : null}
              {/* dogs api */}
              {typeof details.temperaments === 'string' && details.temperaments.length
                ? <p>{details.temperaments.length ? `My temperament is: ${details.temperaments}.` : null}</p>
                : null}
                
              <div className="detail-delete-edit-btn-container">
                {details.createdInDB && <button className="detail-delete-edit-btn" onClick={handleEditDog}>Edit</button>}
                {details.createdInDB && <button className="detail-delete-edit-btn detail-delete-btn" onClick={handleDeleteDog}>Delete</button>}
              </div>
            </div>
          </div>
        ) : (
          Array.isArray(details) 
          ? <h3>Loading...</h3> 
          : <div className="detail-body"><img className="detail-dog-not-found-img" src={noDog} alt="Dog not found img" /><h1 className="detail-dog-not-found-title">Dog not found :(</h1></div>
        )
      }
      </div>
    </div>
  );
};

export default Detail;