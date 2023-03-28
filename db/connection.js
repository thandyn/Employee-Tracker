const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.sequelize);

module.exports = sequelize;
