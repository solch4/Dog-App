const { Router } = require('express');
const { dataApi, dataDB, getAll } = require('../controllers/controllers.js')
const { Dog, Temperaments } = require("../db.js");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/* [ ] GET /dogs:
Obtener un listado de las razas de perro
Debe devolver solo los datos necesarios para la ruta principal */
//si pasan x query un perro se fija si lo tiene, si es así lo devuelve sino devuelve todo
/* [ ] GET /dogs?name="...":
Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
Si no existe ninguna raza de perro mostrar un mensaje adecuado */
router.get('/dogs', async (req, res) => {
  const dogName = req.query.name
  const allDogs = await getAll()
  if(dogName){
    const filteredDog = await allDogs.filter(dog => dog.name.toLowerCase().includes(dogName.toLowerCase()))
    filteredDog ? 
    res.status(200).send(filteredDog) :
    res.status(404).send('Dog not found')
  } else {
    res.status(200).send(allDogs)
  }
})

/* [ ] GET /dogs/{idRaza}:
Obtener el detalle de una raza de perro en particular
Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
Incluir los temperamentos asociados */
router.get('/dogs/:id', async(req, res) => {
  const dogID = req.params.id
  console.log(dogID)
  const allDogs = await getAll()
  if (dogID) {
    const filteredDog = await allDogs.find(dog => dog.id == dogID)
    filteredDog ? 
    res.status(200).send(filteredDog) : 
    res.status(404).send('Dog ID not found')
  }
})

/* [ ] POST /dogs:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
Crea una raza de perro en la base de datos relacionada con sus temperamentos */
router.post('/dogs', async (req, res) => {
  const {name, height, weight, life_span, image, temperaments, DB_created} = req.body

  const newDog = await Dog.create({
    name, height, weight, life_span, image, DB_created
  })
  const temperamentAux = await Temperaments.findAll({
    where:{
      name: temperaments
    }
  })

  newDog.addTemperaments(temperamentAux)
  res.status(201).send('Dog created succcessfully!')
})

/* [ ] GET /temperaments:
Obtener todos los temperamentos posibles
En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y 
luego ya utilizarlos desde allí */
router.get('/temperaments', async (req,res) => {
  const infoApi = await dataApi()
  const temperaments = infoApi.map(dog => dog.temperaments).join().split(',')
  const temperamentsForDB = temperaments.map(e => e.trim())
  temperamentsForDB.forEach(e => {
    if(e !== '') {
      Temperaments.findOrCreate({ //va a buscar el elemento en la tabla, si no lo encuentra crea la nueva entrada. método de sequelize
        where: {
          name: e
        }
      })
    }
  })
  
  const allTemperaments = await Temperaments.findAll()
  res.status(200).send(allTemperaments)
})

module.exports = router;
