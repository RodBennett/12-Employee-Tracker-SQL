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

const viewEmployees = () => {
    db.query("SELECT e.id AS EmpID, e.first_name, e.last_name, d.department_name AS department, r.title, r.salary, e.manager_id AS manager FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON d.id = r.department_id", function (err, results) {
        console.table('\n', results);
        mainMenu();
      });
}

const viewDepts = () => {
    db.query('SELECT d.id, d.department_name AS department FROM department d', function (err, results) {
        console.table('\n', results);
        mainMenu();
      });
}

const viewRoles = () => {
    db.query('SELECT r.id, r.title, d.department_name AS department, r.salary FROM role r LEFT JOIN department d ON d.id = r.department_id', function (err, results) {
        console.table('\n', results);
        mainMenu();
    })
}

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

const addEmployee = () => {
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
        type: "input",
        message: "What is the employee's title?",
        name: "role_title",
        validate: (role_title) => {
            if(!role_title) {
                console.log("Please enter a role title")
            } else {
                return true
            }
        }
    },
    {
        type: "input",
        message: "What is the employee's salary?",
        name: "role_title",
        validate: (role_title) => {
            if(!role_title) {
                console.log("Please enter a role title")
            } else {
                return true
            }
        }
    },
    {
        type: "input",
        message: "Who is the employee's manager?",
        name: "managerIDName",
        validate: (managerIDName) => {
            if(!managerIDName) {
                console.log("Please enter a manager's name")
            } else {
                return true
            }
        }
    }
]).then((data) => {
    const sql = `INSERT INTO employee (first_name, last_name, department_name AS department, role_title, role_salary, manager_id) VALUES (?, ?, ?, ?, ?)`
    const params = [data.first_name, data.last_name, data.role_id, data.manager];
    db.query(sql, params, (err, results) => {
        if (err) throw err;
        viewEmployees()
        console.log("Employee has been added")
        return results
    });
});
}

const addRole = () => {
    let query = `SELECT r.id, r.title, r.salary, d.department_name AS department FROM role r LEFT JOIN department d ON r.department_id = d.id`

    db.query(query, function (err, res) {
        if (err) throw err;

        const departmentChoice = res.map(({ id, department }) => ({
            value: id, name: `${department}` 
        })); 
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
]).then((data) => {
        const sql = `INSERT INTO role (title, department_id, salary) VALUES (?, ?, ?)`
        const params = [data.title, data.department, data.salary];
        db.query(sql, params, (err, results) => {
            if (err) throw err;
            viewRoles()
            return results
        });
    });
});
}

const updateEmpRole = () => {
    let query = `SELECT e.id, e.first_name, e.last_name, r.title, d.department_name AS department, r.salary FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON d.id = r.department_id`

    db.query(query, function (err, res) {
        if (err) throw err;

        const employeeChoice = res.map(({ id, first_name, last_name }) => ({
            value: id, name: `${first_name} ${last_name}` 
        }));

    inquirer.prompt ([
        {
            type: "list",
            message: 'Choose an employee',
            name: "updateEmp",
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
            type: "input",
            message: "What is employee's new role?",
            name: "role_id",
            validate: (updateRole) => {
                if(!updateRole) {
                    console.log('\n', "Please enter a new title number")
                } else {
                    return true
                }
            }
        }

    ]).then((data) => {
        const sql = `UPDATE employee SET role_id = ? WHERE title = ?`
        const params = [data.title, data.id]
            db.query(sql, params, function (err, results) {
                if (err) throw err;
                viewEmployees()
                return results
            })
    })
})
}

// const delEmp = () => {

// }
mainMenu()