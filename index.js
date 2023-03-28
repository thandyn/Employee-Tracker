const db = require("./db");
const inquirer = require("inquirer");
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
