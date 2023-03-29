const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Tl-iTe1i=7owO_AdowRa",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
