const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("temperaments", {
    //el id lo crea solo el pgadmin
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
