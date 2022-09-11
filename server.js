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
        updateEmployee();
    } else if(data.menu === "Delete an employee") {
        delEmp();
    } else {
        console.log("Thank You & Goodbye")
        return;
    }
});
}

const viewEmployees = () => {
    db.query("SELECT * FROM employee", function (err, results) {
        console.table(results);
        mainMenu();
      });
}

const viewDepts = () => {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        mainMenu();
      });
}

const viewRoles = () => {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
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
        message: "Who is the employee's manager?",
        name: "manager_id",
        validate: (manager_id) => {
            if(!manager_id) {
                console.log("Please enter an ID number")
            } else {
                return true
            }
        }
    },
    {
        type: "input",
        message: "What is the employee's role? Enter value 1-9",
        name: "role_id",
        validate: (role_id) => {
            if(!role_id) {
                console.log("Please enter a role number")
            } else {
                return true
            }
        }
    }
]).then((data) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
    const params = [data.first_name, data.last_name, data.role_id, data.manager_id];
    db.query(sql, params, (err, results) => {
        if (err) throw err;
        viewEmployees()
        return results
    });
});
}

const addRole = () => {
inquirer.prompt([
    {
    type: "input",
    message: "What role woul you like to add?",
    name: "role_name",
    validate: (role_name) => {
        if(!role_name) {
            console.log("Please enter a new role name")
        } else {
            return true
        }
    }
    },
    {
        type: "input",
        message: "What is the role's "
    }
]);
}

const delEmp = () => {

}
mainMenu()