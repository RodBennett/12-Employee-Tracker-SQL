INSERT INTO department (id, department_name)
VALUES  (1, "Legal"),
        (2, "Finance"),
        (3, "Engineering"),
        (4, "Public Relations"),
        (5, "Sales");

INSERT INTO role (id, title, salary, department_id)
Values  (5, "Counsel", 225000, 1),
        (3, "Payroll Officer", 125000.05, 2),
        (1, "Engineer", 200000.75, 3),
        (2, "HR Officer", 150000, 4),
        (4, "Sales Associate", 175000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Oprah", "Winfrey", 2, 1),
        (2, "Miss", "Piggy", 5, 2),
        (3, "Mister", "Rogers", 2, 3),
        (4, "Jenny", "Genius", 3, 4)
