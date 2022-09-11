INSERT INTO department (id, department_name)
VALUES  (1, "Legal"),
        (2, "Payroll"),
        (3, "Engineering"),
        (4, "Public Relations"),
        (5, "Sales");

INSERT INTO role (id, role_title, role_salary, department_id)
Values  (5, "Manager", 225000, 1),
        (3, "CFO", 125000.05, 2),
        (1, "Engineer", 200000.75, 3),
        (2, "HR Manager", 150000, 4),
        (4, "Head of Sales", 175000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (302, "Rod", "Bennett", 2, 6),
        (303, "Miss", "Piggy", 5, 7),
        (304, "Mister", "Rogers", 2, 6);