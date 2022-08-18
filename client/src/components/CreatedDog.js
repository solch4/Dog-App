import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createDogs, getTemperaments } from "../actions/actions";
import { Link, useNavigate } from "react-router-dom";
import '../styles/CreatedDog.css'
// eslint-disable-next-line no-useless-escape
const imgRegexp = new RegExp('^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$')

const validateText = (input) => {
  const err = {};

  if (!input.name) err.name = "Write the name";

  if (!input.weight_min) err.weight_min = "Write the min weight";
  else if (input.weight_min < 1) err.weight_min = "Should be heavier than 1kg";
  else if (isNaN(input.weight_min)) err.weight_min = "Should be a number";
  
  if (!input.weight_max) err.weight_max = "Write the max weight";
  else if (input.weight_max > 100) err.weight_max = "Should be less heavy than 100kg";
  else if (isNaN(input.weight_max)) err.weight_max = "Should be a number";
  
  if (input.weight_min && input.weight_max && parseInt(input.weight_min) > parseInt(input.weight_max)) err.weight_max = 'Max weight should be bigger than min'

  if (!input.height_min) err.height_min = 'Write the min height'
  else if (input.height_min < 10) err.height_min = "Should be taller than 10 cm";
  else if (isNaN(input.height_min)) err.height_min = "Should be a number";

  if (!input.height_max) err.height_max = 'Write the max height'
  else if (input.height_max > 250) err.height_max = "Should be smaller than 250 cm";
  else if (isNaN(input.height_max)) err.height_max = "Should be a number";

  if (input.height_min && input.height_max && parseInt(input.height_min) > parseInt(input.height_max)) err.height_max = 'Max height should be bigger than min'

  if (!input.image) err.image = 'Insert the image URL'
  else if (!imgRegexp.test(input.image)) err.image = 'Should be a valid URL'

  if (!input.life_span_min) err.life_span_min = 'Write the min life span'
  else if (input.life_span_min < 5) err.life_span_min = "Min life span should be bigger than 5 years";
  else if (isNaN(input.life_span_min)) err.life_span_min = "Should be a number";

  if (!input.life_span_max) err.life_span_max = 'Write the max life span'
  else if (input.life_span_max > 25) err.life_span_max = "Max life span should be smaller than 25 years";
  else if (isNaN(input.life_span_max)) err.life_span_max = "Should be a number";

  if (input.life_span_min && input.life_span_max && parseInt(input.life_span_min) > parseInt(input.life_span_max)) err.life_span_max = 'Max life span should be bigger than min'

  return err
};

const CreatedDog = () => {
  // const navigation = useNavigate()
  const dispatch = useDispatch()
  const temps = useSelector(state => state.temperaments)
  const [tempsDB, setTempsDB] = useState([])
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    name: '',
    weight_min: '',
    weight_max: '',
    height_min: '',
    height_max: '',
    image: '',
    life_span_min: '',
    life_span_max: '',
    temperaments: []
  })

  useEffect(() => {
    dispatch(getTemperaments())
  }, [dispatch])
  
  const handleSubmit = e => {
    e.preventDefault()
    try {
      // console.log(input);
      // console.log(Object.values(input));
      // console.log(!Object.values(input));
      // console.log(errors);
      // console.log(!Object.keys(errors).length);
      // if (!Object.values(input) && !Object.keys(errors).length) alert('aaaaaaaaaaaaPlease complete the form.')
      if (!input.name && !input.weight_min && !input.weight_max && !input.height_min && !input.height_max && !input.image && !input.life_span_min && !input.life_span_max && !Object.keys(errors).length) alert('Please complete the form.')
      else if(!errors.name && !errors.weight_min && !errors.weight_max && !errors.height_min && !errors.height_max && !errors.image && !errors.life_span_min && !errors.life_span_max && !errors.temperaments) {
        const newDog = {
          name: input.name,
          weight_min: input.weight_min,
          weight_max: input.weight_max,
          height_min: input.height_min,
          height_max: input.height_max,
          image: input.image,
          life_span_min: input.life_span_min,
          life_span_max: input.life_span_max,
          temperaments: tempsDB,
          // ...input
        };
        console.log(newDog);
        dispatch(createDogs(newDog));
        alert("Your dog is ready!");
        setInput({
          name: "",
          weight_min: "",
          weight_max: "",
          height_min: "",
          height_max: "",
          image: "",
          life_span_min: "",
          life_span_max: "",
          temperaments: [],
        });
        setTempsDB([])
      } else return alert('Please complete the form with the correct data.')
    } catch (e) {
      alert('Please complete the form with the correct data.')
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    setInput({...input, [e.target.name]:e.target.value})
    setErrors(validateText({...input, [e.target.name]: e.target.value}))
  }
  
  const handleSelect = e => {
    console.log(e.target.value);
    e.preventDefault()
    if(!tempsDB.includes(e.target.value)){
      if (tempsDB.length > 0){
        setTempsDB([...tempsDB, e.target.value])
      } else {
        setTempsDB([e.target.value])
      }
    }
    console.log(tempsDB);
  }

  const handleDelete = (e) => {
    e.preventDefault()
    setTempsDB(tempsDB.filter((temp) => temp !== e.target.value))
  }

  return (
    <div className="form-container">
      <Link to='/home'>
        <button>atras</button>
      </Link>

      <h2>escribí los cosos</h2>
      <h4>todos los campos son obligatorios</h4>

      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Name</label>
        <input name="name" value={input.name} placeholder='E.g.: Memé' onChange={(e) => handleChange(e)} />
        {errors.name && (<p>{errors.name}</p>)}
        <label>Weight</label>
        <input name="weight_min" value={input.weight_min} placeholder='Min' onChange={(e) => handleChange(e)} />
        {errors.weight_min && (<p>{errors.weight_min}</p>)}
        <input name="weight_max" value={input.weight_max} placeholder='Max' onChange={(e) => handleChange(e)} />
        {errors.weight_max && (<p>{errors.weight_max}</p>)}
        <label>Height</label>
        <input name="height_min" value={input.height_min} placeholder='Min' onChange={(e) => handleChange(e)} />
        {errors.height_min && (<p>{errors.height_min}</p>)}
        <input name="height_max" value={input.height_max} placeholder='Max' onChange={(e) => handleChange(e)} />
        {errors.height_max && (<p>{errors.height_max}</p>)}
        <label>Image</label>
        <input name="image" value={input.image} placeholder='Image URL' onChange={(e) => handleChange(e)} />
        {errors.image && (<p>{errors.image}</p>)}
        <label>Life span</label>
        <input name="life_span_min" value={input.life_span_min} placeholder='Min' onChange={(e) => handleChange(e)} />
        {errors.life_span_min && (<p>{errors.life_span_min}</p>)}
        <input name="life_span_max" value={input.life_span_max} placeholder='Max' onChange={(e) => handleChange(e)} />
        {errors.life_span_max && (<p>{errors.life_span_max}</p>)}
        
        <label>Temperaments</label>
        <select name="form-temperaments" onChange={e => handleSelect(e)}>
          {temps.map((temps) => (
            <option className="form-option" key={temps.name} value={temps.name}>{temps.name}</option>
          ))}
        </select>
        <ul>
          {tempsDB.map((temp, id)=> (
            <li key={id}>
              {temp}
              <button value={temp} onClick={e => handleDelete(e)}>
                x
              </button>
            </li>
          ))}
        </ul>
        <button type="submit">crete dog</button>
      </form>
    </div>
  );
};

export default CreatedDog;