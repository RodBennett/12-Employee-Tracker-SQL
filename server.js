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
// prompt menu for the user
const mainMenu = () => {
    inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        name: "menu",
        choices: [
            "View all departments",
            "View all employees",
            "View all roles",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update employee role",
            "Delete an employee",
            "Quit"
        ]
    }
    // call functions for each choice in the user menu
]).then((data) => {
     if(data.menu === "View all departments") {
        viewDepts();
    } else if (data.menu === "View all employees") {
        viewEmployees();
    } else if(data.menu === "View all roles") {
        viewRoles();
    } else if(data.menu === "Add a department") {
        addDept()
    } else if(data.menu === "Add a role") {
        addRole();
    } else if (data.menu === "Add an employee") {
        addEmployee();
    } else if(data.menu === "Update employee role") {
        updateEmpRole();
    } else if(data.menu === "Delete an employee") {
        delEmp();
    } else {
        console.log("Thank You & Goodbye")
        return;
    }
});
}
// VIEW FUNCTIONS: View the list of employees with ID, first & last name, department, title, salary, manager id
const viewEmployees = () => {
    db.query("SELECT e.id AS EmpID, e.first_name, e.last_name, d.department_name AS department, r.title, r.salary, e.manager_id AS manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON d.id = r.department_id", function (err, results) {
        console.table('\n', results);
        mainMenu();
      });
}
// function to view various departments
const viewDepts = () => {
    db.query("SELECT d.id, d.department_name AS department FROM department d", function (err, results) {
        console.table('\n', results);
        mainMenu();
      });
}
// function to view all roles and titles of employees
const viewRoles = () => {
    db.query('SELECT r.id, r.title, d.department_name AS department, r.salary FROM role r LEFT JOIN department d ON d.id = r.department_id', function (err, results) {
        console.table('\n', results);
        mainMenu();
    })
}

// ADD FUNCTIONS
// Add a new department by name
const addDept = () => {
    inquirer.prompt([
        {
        type: "input",
        message: "What department would you like to add?",
        name: "department_name",
        validate: (department_name) => {
            if(!department_name) {
                console.log("Please enter a valid department name")
            } else {
                return true
            }
        }
    },
]).then((data) => {
        const sql = `INSERT INTO department (department_name) VALUES (?)`
        const params = [data.department_name];
        db.query(sql, params, (err, results) => {
            if (err) throw err;
            viewDepts()
            return results
        });
    });
}
// function to add a new employee by name, role, and manager ID
const addEmployee = () => {
    // create variable to select role table in database
    let query = `SELECT * FROM role`
    db.query(query, function (err, res) {
        if (err) throw err;
        
        // create a list of roles for user to choose from, SAVE values as id
        const roleChoice = res.map(({ id, title, }) => ({
            value: id, name: `${title}` 
    })); 

    // create query variable to select all from employee table
    let employeeQuery = `SELECT * FROM employee`
    db.query(employeeQuery, function(err, res) {
        if (err) throw err;

        // create a list of employee names to be used as managers, SAVE values as id
        const managerChoice = res.map(({ id, first_name }) => 
            ({ 
                value: id, 
                name: `${first_name} ${last_name}`
            })
        );
        console.log(employeeChoice)
        
    // add employee prompts for the user
inquirer.prompt([
    {
        type: "input",
        message: "What is employee's first name?",
        name: "first_name",
        validate: (first_name) => {
            if(!first_name) {
                console.log("Please enter a first name")
            } else {
                return true
            }
        }
    },
    {
        type: "input",
        message: "What is employee's last name?",
        name: "last_name",
        validate: (last_name) => {
            if(!last_name) {
                console.log("Please enter a last name")
            } else {
                return true
            }
        }
    },
    {
        type: "list",
        message: "What is the employee's title?",
        name: "title",
        choices: roleChoice,
        validate: (title) => {
            if(!title) {
                console.log("Please enter a title")
            } else {
                return true
            }
        }
    },
    {
        type: "list",
        message: "Who is the employee's manager?",
        name: "managerIDName",
        choices: managerChoice,
        validate: (managerChoice) => {
            if(!managerChoice) {
                console.log("Please enter a manager's name")
            } else {
                return true
            }
        }
    },

// data from user passes into sql variable to be added to the table.
]).then((data) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
    const params = [data.first_name, data.last_name, data.title, data.managerIDName];
    db.query(sql, params, (err) => {
        if (err) throw err;
        viewEmployees()
        console.log("Employee has been added")
        return;
    });
  });
});
});
}

// function to add a role to a department
const addRole = () => {
    // create variable to select all from department
    let query = `SELECT * FROM department`
    db.query(query, function (err, res) {
        if (err) throw err;

        // variable to create a list of departments to populate in question prompt and SAVE as id
        const departmentChoice = res.map(({ id, department_name }) => ({
            value: id, name: `${department_name}` 
        })); 

// questions to be presented to the user        
inquirer.prompt([
    {
    type: "input",
    message: "What role would you like to add?",
    name: "title",
    validate: (title) => {
        if(!title) {
            console.log("Please enter a new role name")
        } else {
            return true
        }
    }
    },
    {
        type: "list",
        message: "Which department should the role be assigned to?",
        name: "department",
        choices: departmentChoice,
        validate: (departmentChoice) => {
            if(!departmentChoice) {
                console.log("Please choose a department from the list")
            } else {
                return true
            }
        }
    },
    {
        type: "input",
        message: "What is the salary of the role? Use whole numbers and decimals. Ex: 150000.75",
        name: "salary",
        validate: (salary) => {
            if(!salary) {
                console.log("Please enter a valid role salary. Use whole numbers and decimals. Ex: 150000.75")
            } else {
                return true
            }
        }
    }
    // data from user then passes into role table and is added according to title, department_id, salary
]).then((data) => {
        const sql = `INSERT INTO role (title, department_id, salary) VALUES (?, ?, ?)`
        const params = [data.title, data.department, data.salary];
        db.query(sql, params, (err) => {
            if (err) throw err;
            viewRoles()
            return 
        });
    });
});
}

// UPDATE function: update an existing employee's role 
const updateEmpRole = () => {
    // variable for selsected columns form tables to be used in updating function
    let query = `SELECT e.id, e.first_name, e.last_name, r.title, d.department_name AS department, r.salary FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON d.id = r.department_id`

    db.query(query, function (err, res) {
        if (err) throw err;
        
        const employeeChoice = res.map(({ id, first_name, last_name }) => ({
            value: id, name: `${first_name} ${last_name}` 
        }));
       
        roleUpdate(employeeChoice)
    });
}
function roleUpdate(employeeChoice) {
    let query = `SELECT r.id, r.title, r.salary FROM role r`
    db.query(query, function (err, res) {
        if (err) throw err;

        // create variable to present list of role choices to user, SAVE as id
        let roleChoice = res.map(({ id, title, salary }) => ({
            value: id, name: `${title}`, salary: `${salary}`
        }));

        promptUpdate(employeeChoice, roleChoice)
    })
}

function promptUpdate(employeeChoice, roleChoice) {
    inquirer.prompt ([
        {
            type: "list",
            message: 'Choose an employee',
            name: "name",
            choices: employeeChoice,
            validate: (updateEmp) => {
                if(!updateEmp) {
                    console.log('\n', "Please choose an employee from the list")
                } else {
                    return true
                }
            }
        },
        {
            type: "list",
            message: "What is employee's new role?",
            name: "title",
            choices: roleChoice,
            validate: (updateRole) => {
                if(!updateRole) {
                    console.log('\n', "Please enter a new title number")
                } else {
                    return true
                }
            }
        }

    ]).then((data) => {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
        const params = [data.name, data.title]
            db.query(sql, params, function (err, results) {
                if (err) throw err;
                viewEmployees()
                return results
            });
    });
}
// const delEmp = () => {

// }
mainMenu()