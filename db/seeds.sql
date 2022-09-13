INSERT INTO department (id, department_name)
VALUES  (1, "Legal"),
        (2, "Payroll"),
        (3, "Engineering"),
        (4, "Public Relations"),
        (5, "Sales");

INSERT INTO role (id, title, salary, department_id)
Values  (5, "Department Manager", 225000, 1),
        (3, "Financial Officer", 125000.05, 2),
        (1, "Engineer", 200000.75, 3),
        (2, "HR Officer", 150000, 4),
        (4, "Sales Associate", 175000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (302, "Rod", "Bennett", 2, 1),
        (303, "Miss", "Piggy", 5, 2),
        (304, "Mister", "Rogers", 2, 3);
