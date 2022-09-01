const express = require('express')
const router = express.Router()
const { Temperaments } = require("../db.js");
const { dataApi } = require('../controllers/controllers.js')

// '/temperaments'

/* [ ] GET /temperaments:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí */
router.get('/', async (req,res) => {
  const infoApi = await dataApi()
  const temperaments = infoApi.map(dog => dog.temperaments).join().split(',')
  const temperamentsForDB = temperaments.map(e => e.trim())
  temperamentsForDB.forEach(e => {
    if(e) {
      Temperaments.findOrCreate({ //método de sequelize. va a buscar el elemento en la tabla, si no lo encuentra crea la nueva entrada
        where: {
          name: e
        }
      })
    }
  })
  
  const allTemperaments = await Temperaments.findAll()
  res.status(200).send(allTemperaments)
})

module.exports = router 