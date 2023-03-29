const db = require("./db");
const inquirer = require("inquirer");
const mysql2 = require("mysql2");
require("console.table");

const mainPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "answer",
        message: "What would you like to do?",
        choices: [
          "View all Departments.",
          "View all Roles.",
          "View all Employees.",
          "Add Departments.",
          "Add Roles.",
          "Add Employees.",
          "Update Employee Role.",
          "Quit",
        ],
      },
    ])
    .then((res) => {
      switch (res.answer) {
        case "View all Departments.":
          viewDepartments();
          break;
        case "View all Roles.":
          viewRoles();
          break;
        case "View all Employees.":
          viewEmployees();
          break;
        case "Add Departments.":
          addDepartments();
          break;
        case "Add Roles.":
          addRoles();
          break;
        case "Add Employees.":
          addEmployees();
          break;
        case "Update Employee Role":
          updateEmployeeRoles();
          break;
        default:
          quit();
      }
    });
};

const viewDepartments = () => {
  db.query("SELECT * FROM departments", (err, departments) => {
    if (err) {
      console.log(err);
    }
    console.table(departments);
    mainPrompt();
  });
};

const viewRoles = () => {
  db.query("SELECT * FROM roles", (err, roles) => {
    if (err) {
      console.log(err);
    }
    console.table(roles);
    mainPrompt();
  });
};

const viewEmployees = () => {
  db.query("SELECT * FROM employees", (err, employees) => {
    if (err) {
      console.log(err);
    }
    console.table(employees);
    mainPrompt();
  });
};

const addDepartments = () => {
  inquirer
    .prompt([
      {
        name: "name",
        message:
          "Please enter the name of the department you would like to add.",
        type: "input",
      },
    ])
    .then((res) => {
      console.log(res);

      db.query("INSERT INTO Department SET ?", res, (err) => {
        if (err) {
          console.log(err);
        }
      });
      mainPrompt();
    });
};

const addRoles = () => {
  inquirer
    .prompt([
      {
        name: "title",
        message: "Please enter the name of role you  would like to add.",
        type: "input",
      },
      {
        name: "salary",
        message: "Please enter the salary of the role.",
        type: "input",
      },
      {
        name: "department_id",
        message: "Please enter the ID of the department for the role.",
        type: "input",
      },
    ])
    .then((res) => {
      console.log(res);

      db.query("INSERT INTO roles SET ?", role, (err) => {
        if (err) {
          console.log(err);
        }
      });
      mainPrompt();
    });
};
