const db = require("./db");
const inquirer = require("inquirer");
require("console.table");

mainPrompt() => {
  inquirer.prompt([
    {
      type: "list",
      name: "",
      message: "What would you like to do?",
      choices: [
        {
          name: "View all Departments.",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "View all Roles.",
          value: "VIEW_ROLES"
        },
        {
          name: "View all Employees.",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "Add a Department.",
          value: "ADD_DEPARTMENTS"
        },
        {
          name: "Add a Role.",
          value: "ADD_ROLE"
        },
        {
          name: "Add an Employee.",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update an Employee Role.",
          value: "UPDATE_EMPLOYEE_ROLE"
        },
        {
          name: "Quit",
          value: "QUIT"
        }
      ]
    }
  ]).then(res => {
    
  })
}