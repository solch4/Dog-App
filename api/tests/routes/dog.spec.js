const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, Temperaments, conn } = require("../../src/db.js");

const agent = session(app);

const baseDog = {
  name: "Fatiga",
  height: "41 - 54",
  weight: "13 - 22",
  life_span: "11 - 16",
  image:
    "https://media.ambito.com/p/289156eef2abf5b4eaae250b32080bb2/adjuntos/239/imagenes/039/817/0039817630/fatiga-casados-hijos.jpg",
  temperaments: ["Docile", "Friendly"],
};

const goodDog1 = {
  name: "Cheems",
  height_min: 17,
  height_max: 26,
  weight_min: 9,
  weight_max: 20,
  life_span_min: 12,
  life_span_max: 19,
  image: "https://assets.adnradio.cl/2022/05/L23-40-925x470.jpg",
  temperaments: ["Clownish", "Fun-loving", "Happy"],
};

const goodDog2 = {
  name: "Bichón maltés",
  height_min: 20,
  height_max: 29,
  weight_min: 6,
  weight_max: 15,
  image:
    "https://i0.wp.com/www.encantadordeperros.es/wp-content/uploads/2017/03/21-1.jpg",
  temperaments: ["Playful", "Fun-loving", "Intelligent", "Friendly"],
};

const badDog1 = {
  // name missing
  height_min: 20,
  height_max: 29,
  weight_min: 6,
  weight_max: 15,
};

const badDog2 = {
  name: "Bad bichón maltés",
  // height missing
  weight_min: 6,
  weight_max: 15,
};

const badDog3 = {
  name: "Bad bichón maltés",
  height_min: 20,
  height_max: 29,
  // weight missing
};

describe("DOG ROUTES", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );

  beforeEach(() =>
    Dog.sync({ force: true }).then(async () => {
      const newDog = await Dog.create(baseDog);
      const temperamentsAux = await Temperaments.findAll({
        where: {
          name: baseDog.temperaments,
        },
      });
      newDog.addTemperaments(temperamentsAux);
    })
  );

  describe("GET /dogs", () => {
    it("should get statusCode 200", () => agent.get("/dogs").expect(200));
  });

  describe("GET /dogs/:id", () => {
    it("Should get statusCode 200 if id is found", () =>
      agent.get("/dogs/1").expect(200));
    it("Should get statusCode 404 if id is not found", () =>
      agent.get("/dogs/randomID123").expect(404));
    it("Should get an appropriate msg if id is not found", () =>
      agent.get("/dogs/randomID123").expect(/not found/));
  });

  describe("GET /temperaments", () => {
    it("Should get statusCode 200", () =>
      agent.get("/temperaments").expect(200));
  });

  describe("POST /dogs", () => {
    it("Should get statusCode 400 if name, height and/or weight are NOT send ", async () => {
      const res1 = await agent.post("/dogs").send(badDog1);
      expect(res1.statusCode).to.equal(400);
      const res2 = await agent.post("/dogs").send(badDog2);
      expect(res2.statusCode).to.equal(400);
      const res3 = await agent.post("/dogs").send(badDog3);
      expect(res3.statusCode).to.equal(400);
      const res4 = await agent.post("/dogs").send({});
      expect(res4.statusCode).to.equal(400);
    });

    it("Should get statusCode 201 if the dog is created successfully", async () => {
      const res1 = await agent.post("/dogs").send(goodDog1);
      expect(res1.statusCode).to.equal(201);
      const res2 = await agent.post("/dogs").send(goodDog2);
      expect(res2.statusCode).to.equal(201);
    });
  });
});
