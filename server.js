// import npm dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer')
require('console.table');

// create connection to the mysql2 npm and access database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootmyroot',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

const mainMenu = () => {
    inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        name: "menu",
        choices: [
            "View all employees",
            "Add new employee",
            "Update employee role",
            "Add role",
            "View all departments",
            "Add department",
            "Quit"
        ]
    }
]).then((data) => {
    if(data.menu === "View all employees") {
        showEmployees();
    } else if (data.menu === "Add new employee") {
        addEmployee();
    } else if(data.menu === "Update employee role") {
        updateEmployee();
    } else if(data.menu === "Add role") {
        addRole();
    } else if(data.menu === "View all departments") {
        viewDepts();
    } else if (data.menu === "Add department") {
        addDept()
    } else {
        console.log("Thank You & Goodbye");
    }
});
}
const showEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        mainMenu();
      });
}

const addEmployee = () => {
inquirer.prompt([
    {
        type: "input",
        message: "What is employee's name?",
        name: "name"
    },
]);
}

const addRole = () => {
inquirer.prompt([
    {
    type: "input",
    message: "What role woul you like to add?",
    name: "new-role"
    },
]);
}

const addDept = () => {
inquirer.prompt([
    {
    type: "input",
    message: "What department would you like to add?",
    name: "new-department"
    },
]);
}

mainMenu()