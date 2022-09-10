// import inquirer npm
const inquirer = require('inquirer');


const mainMenu = [
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
    ]

const init = () => {
        inquirer.prompt([
            ...mainMenu
        ])
        .then((data) => {
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
        }
    });
}
// const showEmployees = () => {
//     inquirer.prompt([

//     ])
// }
    
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
        message: "What departmeent would you like to add?",
        name: "new-department"
        },
    ]);
}

init()