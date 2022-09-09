const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create connection to the database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'rootmyroot',
    database: 'classlist_db'
  },
  console.log(`Connected to the classlist_db database.`)
);

// initial query to check if connection to db has been made
app.get('/api/students', (req, res) => { 
db.query('SELECT * FROM students', function (err, results) {
  res.json(results);
})
});

app.post('/api/students', (req, res) => { 
    db.query('SELECT * FROM students', function (err, results) {
      res.json(results);
    })
    });

app.put('/api/students', (req, res) => { 
        db.query('SELECT * FROM students', function (err, results) {
          res.json(results);
        })
        });

app.delete('/api/students', (req, res) => { 
            db.query('SELECT * FROM students', function (err, results) {
              res.json(results);
            })
            });


// tells if there is an error
app.use((req, res) => {
  res.status(404).end();
});



// port established
app.listen(PORT, () => {
  console.log(`Server running on port https://localhost/${PORT}`);
});
