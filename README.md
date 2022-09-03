![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# Individual Project - Henry Dogs

<img height="175" src="./dog.png" />

## Objetivos del Proyecto
- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.

El contenido de `client` fue creado usando: Create React App.

## Enunciado
La idea general es crear una aplicación en la cual se puedan ver distintas razas de perro junto con información relevante de las mismas utilizando la api externa [the dog api](https://thedogapi.com/) y a partir de ella poder, entre otras cosas:
- Buscar perros
- Filtrarlos / Ordenarlos
- Agregar nuevos perros

### Endpoints/Flags utilizados
- <https://api.thedogapi.com/v1/breeds>
- <https://api.thedogapi.com/v1/breeds/search?q={raza_perro}>

### Principales tecnologías usadas
- React
- Redux
- Express
- Sequelize - Postgres

## Descripción de rutas

__Pagina inicial__: una landing page con
- Imagen de fondo representativa al proyecto.
- Botón para ingresar al home (`Ruta principal`).

__Ruta principal__: contiene
- Input de búsqueda para encontrar razas de perros por nombre.
- Área donde se ve el listado de razas de perros. Muestra su
  - Imagen
  - Nombre
  - Peso
  - Temperamento
- Opciones para filtrar por:
  - Temperamento
  - Raza existente (las que vienen de la API) o agregadas manualmente (creadas mediante el form)
- Opciones para ordenar tanto ascendentemente como descendentemente las razas de perro por:
  - Orden alfabético
  - Peso
- Paginado para ir buscando y mostrando las siguientes razas, mostrando 8 razas por página.

__Ruta de detalle de raza de perro__: contiene

- Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
- Altura
- Peso
- Años de vida
> __Nota:__ Los perros creados en la base de datos además incluyen un botón para eliminarlos

__Ruta de creación de raza de perro__: contiene

- Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Altura
  - Peso
  - Años de vida
- Posibilidad de agregar uno o más temperamentos
- Botón para crear una nueva raza de perro