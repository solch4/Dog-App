const axios = require("axios");
const { Dog, Temperaments } = require("../db.js");
const { API_KEY, API_URL } = process.env;

//traemos info de la api y lo transformamos al tipo de dato q vamos a usar
const dataApi = async () => {
  const apiDogs = await axios.get(`${API_URL}?api_key=${API_KEY}`)
  const infoDogs = await apiDogs.data.map(dog => {
    return {
      id: dog.id,
      name: dog.name,
      weight: dog.weight.metric,
      height: dog.height.metric,
      life_span: dog.life_span,
      image: dog.image.url,
      temperaments: dog.temperament //o temperaments?
    }
  })
  return infoDogs
}

//traemos info de la db que coincidan con los perros
const dataDB = async () => {
  //trabajamos sobre el Dog q requerimos
  //estamoshaciendo la realción de dogs a temperaments. de n a m
  return await Dog.findAll({
    include: {
      model: Temperaments,
      attributes: ['name'],
      through:{
        attributes: []
      }
    }
  })
}

//concatenamos
const getAll = async () => {
  const infoDataApi = await dataApi()
  const infoDataDB = await dataDB()
  const allData = infoDataApi.concat(infoDataDB)
  return allData
}

module.exports={
  dataApi,
  dataDB,
  getAll
}