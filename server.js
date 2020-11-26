const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 7000;
const database_name = "data_test";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: database_name
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to database
db.connect(function(error) {
  if (error) throw error;
  console.log("Connected to database: ", database_name);
});

// run web server
app.listen(port, function(error) {
  if (error) throw error;
  console.log('Server is running on port: ', port);
});

// handle post login
app.post('/login', function(req, res) {
  if (req.body.userLogin && req.body.passLogin) {
    const userLogin = req.body.userLogin;
    const passLogin = req.body.passLogin;
    const sql = `SELECT * FROM user WHERE username = '${userLogin}'`;

    db.query(sql, (err, result) => {
      if (err) {
        res.send({ status: "User and password not match.", error: err });
      } else {

        if (result.length !== 0) {
          if (passLogin === result[0].password) {
            res.send({ results: result, status: "Success", message: 'Login Success' });
          } else {
            res.send({ results: [], status: "Failure", message: 'Login Failure' });
          }
        } else {
          res.send({ results: [], status: "Failure", message: 'Login Failure' });
        }

      }
    });
  } else {
    res.send({ status: "Failure", message: 'Wrong parameters' });
  }

});

// handle get data-barang
app.get('/data-barang', function(req, res) {
  const sql = 'SELECT * FROM data_barang';

  db.query(sql, function(error, rows, fields) {
    if (error) throw error;
    res.send({ results: rows });
  });
});

// handle post data-barang
app.post('/data-barang', function(req, res) {
  const id_barang = req.body.idBarang;
  const nama_barang = req.body.namaBarang;
  const sql = `INSERT INTO data_barang (id, nama_barang) VALUES ('${id_barang}', '${nama_barang}')`;

  db.query(sql, function(error, rows, fields) {
    if (error) throw error;
    res.send(`Success add into data_barang: ${nama_barang}`);
  });
});

// handle delete data-barang
app.delete('/data-barang', function(req, res) {
  const id_barang = req.body.idBarang;
  const nama_barang = req.body.namaBarang;
  const sql = `DELETE FROM data_barang WHERE id = '${id_barang}'`;

  db.query(sql, function(error, rows, fields) {
    if (error) throw error;
    res.send(`Success delete from data_barang: ${nama_barang}`);
  });
});

// handle get data-supplier
app.get('/data-supplier', function(req, res) {
  const sql = 'SELECT * FROM data_supplier';

  db.query(sql, function(error, rows, fields) {
    if (error) throw error;
    res.send({ results: rows });
  });
});

// handle post data-supplier
app.post('/data-supplier', function(req, res) {
  const nama_supplier = req.body.namaSupplier;
  const id_barang = req.body.idBarang;
  const sql = `INSERT INTO data_supplier (nama_supplier, id_barang) VALUES ('${nama_supplier}', '${id_barang}')`;

  db.query(sql, function(error, rows, fields) {
    if (error) throw error;
    res.send(`Success add into data_supplier: ${nama_supplier}`);
  });
});

// handle get join-data
app.get('/join-data', function(req, res) {
  const sql = 'SELECT data_barang.nama_barang AS barang, data_supplier.nama_supplier AS supplier FROM data_barang JOIN data_supplier ON data_barang.id = data_supplier.id_barang';

  db.query(sql, function(error, rows, fields) {
    if (error) throw error;
    res.send({ results: rows });
  });
});

// handle get 404
app.get('*', (req, res) => {
  res.statusCode = 404;
  res.send({ results: "What are you looking for baby?", status: res.statusCode });
});

// handle post 404
app.post('*', (req, res) => {
  res.statusCode = 404;
  res.send({ results: "What are you looking for baby?", status: res.statusCode });
});

// handle put 404
app.put('*', (req, res) => {
  res.statusCode = 404;
  res.send({ results: "What are you looking for baby?", status: res.statusCode });
});

// handle delete 404
app.delete('*', (req, res) => {
  res.statusCode = 404;
  res.send({ results: "What are you looking for baby?", status: res.statusCode });
});