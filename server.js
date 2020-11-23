const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 7000;
const database_name = "data_test";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: database_name
});

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
            res.send({ results: result, status: "User and password match." });
          } else {
            res.send({ results: [], status: "User and password not match." });
          }
        } else {
          res.send({ results: [], status: "User and password not match." });
        }

      }
    });
  } else {
    res.send({ status: "Wrong parameters." });
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
  const nama_barang = req.body.namaBarang;
  const sql = `INSERT INTO data_barang (nama_barang) VALUES ('${nama_barang}')`;

  db.query(sql, function(error, rows, fields) {
    if (error) throw error;
    res.send(`Success add into data_barang: ${nama_barang}`);
  });
});

// handle put data-barang
app.put('/data-barang', function(req, res) {
  const nama_barang_old = req.body.namaBarangOld;
  const nama_barang_new = req.body.namaBarangNew;
  const sql = `UPDATE data_barang SET nama_barang = '${nama_barang_new}' WHERE nama_barang = '${nama_barang_old}'`;

  db.query(sql, function(error, rows, fields) {
    if (error) throw error;
    res.send(`Success update in data_barang: from ${nama_barang_old} into ${nama_barang_new}`);
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
  const sql = `INSERT INTO data_supplier (nama_supplier) VALUES ('${nama_supplier}')`;

  db.query(sql, function(error, rows, fields) {
    if (error) throw error;
    res.send(`Success add into data_supplier: ${nama_supplier}`);
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