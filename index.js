const db = require("./db/connection");
const mysql = require("mysql2");
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
        case "Update Employee Role.":
          updateEmployeeRoles();
          break;
        case "Quit":
          quit();
      }
    });
};

const viewDepartments = () => {
  db.query("SELECT * FROM department", (err, department) => {
    if (err) {
      console.log(err);
    }
    console.table(department);
    mainPrompt();
  });
};

const viewRoles = () => {
  db.query("SELECT * FROM role", (err, role) => {
    if (err) {
      console.log(err);
    }
    console.table(role);
    mainPrompt();
  });
};

const viewEmployees = () => {
  db.query("SELECT * FROM employee", (err, employee) => {
    if (err) {
      console.log(err);
    }
    console.table(employee);
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

      db.query("INSERT INTO role SET ?", res, (err) => {
        if (err) {
          console.log(err);
        }
      });
      mainPrompt();
    });
};

const addEmployees = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        message: "Please enter the employee's first name.",
        type: "input",
      },
      {
        name: "last_name",
        message: "Please enter the employee's last name.",
        type: "input",
      },
      {
        name: "role_id",
        message: "Please enter the ID of the role of the employee",
        type: "input",
      },
      {
        name: "manager",
        message: "Is this employee a manager?",
        type: "list",
        choices: ["yes", "no"],
      },
    ])
    .then((res) => {
      if (res.manager === "yes") {
        delete res.manager;
        db.query("INSERT INTO employee SET ?", res, (err) => {
          if (err) {
            console.log(err);
          }
        });
        mainPrompt();
      } else if (res.manager === "no") {
        inquirer
          .prompt([
            {
              name: "manager_id",
              type: "input",
              message: "Please enter the ID of the manager of the employee.",
            },
          ])
          .then((subordinate) => {
            delete res.manager;
            let newEmployee = {
              ...res,
              manager_id: subordinate.manager_id,
            };

            db.query("INSERT INTO employee SET ?", newEmployee, (err) => {
              if (err) {
                console.log(err);
              }
            });
            mainPrompt();
          });
      }
    });
};

const updateEmployeeRoles = () => {
  inquirer
    .prompt([
      {
        name: "id",
        message:
          "Please enter the ID of the employee you would like to update.",
        type: "input",
      },
      {
        name: "first_name",
        message: "Please enter the updated first name of the employee.",
        type: "input",
      },
      {
        name: "last_name",
        message: "Please enter the updated last name of the employee.",
        type: "input",
      },
      {
        name: "role_id",
        message: "Please enter the updated role ID of the employee.",
        type: "input",
      },
      {
        name: "manager_id",
        message:
          "If the employee is a manager, please enter updated manager ID for the employee.",
        type: "input",
      },
    ])
    .then((res) => {
      db.query(`UPDATE employee SET ? WHERE id =${res.id}`, res, (err) => {
        if (err) {
          console.log(err); // log any errors
        }
        mainPrompt();
      });
    });
};

const quit = () => {
  console.log("Goodbye!");
  process.exit();
};

mainPrompt();
