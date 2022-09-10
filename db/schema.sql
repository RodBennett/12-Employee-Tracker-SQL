DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

-- all code in app will use this database
USE employees_db;

CREATE TABLE department (
    id INT NOT NULL,
    department_name VARCHAR(30), -- to hold department name
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30), -- to hold role title
    salary DECIMAL,
    department_id INT NOT NULL, -- to hold reference to department role belongs to
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, -- to hold reference to employee role
    manager_id INT,
    PRIMARY KEY(id)
);
