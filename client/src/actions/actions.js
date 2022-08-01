import axios from 'axios'

export function getDogs () {
  return async function (dispatch){
    return await axios.get('http://localhost:3001/dogs')
    .then(res => {
      dispatch({
        type: 'GET_DOGS',
        payload: res.data
      })
    })
  }
}

export function getTemperaments () {
  return async function (dispatch){
    return await axios.get('http://localhost:3001/temperaments')
    .then(res => {
      dispatch({
        type: 'GET_TEMPERAMENTS',
        payload: res.data
      })
    })
  }
}

export function getByName (name) {
  return async function (dispatch){
    var res = await axios.get(`http://localhost:3001/dogs?name=${name}`)
    return(
      dispatch({
      type: 'GET_BY_NAME',
      payload: res.data
      })
    )
  }
}

export function getById (id) {
  return async function (dispatch){
    var res = await axios.get(`http://localhost:3001/dogs/${id}`)
    return(
      dispatch({
        type: 'GET_BY_ID',
        payload: res.data
      })
    )
  }
}

export function sortByName (payload) {
  return{
    type: 'ORDER_BY_NAME',
    payload
  }
}

export function sortByWeight (payload) {
  return{
    type: 'ORDER_BY_WEIGHT',
    payload
  }
}


