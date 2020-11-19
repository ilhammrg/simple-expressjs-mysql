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

db.connect(function(error) {
  if (error) throw error;
  console.log("Connected to database: ", database_name);
});

app.listen(port, function(error) {
  if (error) throw error;
  console.log('Server is running on port: ', port);
});

// app.post('/login', function(req, res) {
//   const userLogin = req.body.userLogin;
//   const passLogin = req.body.passLogin;
//   const sql = `SELE`

//   db.query
// })

app.get('/data-barang', function(req, res) {
  const sql = 'SELECT * FROM data_barang';

  db.query(sql, function(error, rows, fields) {
    if (error) throw error;
    res.send({ results: rows });
  });
});

app.post('/data-barang', function(req, res) {
  const nama_barang = req.body.namaBarang;
  const sql = `INSERT INTO data_barang (nama_barang) VALUES ('${nama_barang}')`;

  db.query(sql, function(error, rows, fields) {
    if (error) throw error;
    res.send(`Success add into data_barang: ${nama_barang}`);
  });
});

app.put('/data-barang', function(req, res) {
  const nama_barang_old = req.body.namaBarangOld;
  const nama_barang_new = req.body.namaBarangNew;
  const sql = `UPDATE data_barang SET nama_barang = '${nama_barang_new}' WHERE nama_barang = '${nama_barang_old}'`;

  db.query(sql, function(error, rows, fields) {
    if (error) throw error;
    res.send(`Success update in data_barang: from ${nama_barang_old} into ${nama_barang_new}`);
  });
});

app.get('/data-supplier', function(req, res) {
  const sql = 'SELECT * FROM data_supplier';

  db.query(sql, function(error, rows, fields) {
    if (error) throw error;
    res.send({ results: rows });
  });
});

app.post('/data-supplier', function(req, res) {
  const nama_supplier = req.body.namaSupplier;
  const sql = `INSERT INTO data_supplier (nama_supplier) VALUES ('${nama_supplier}')`;

  db.query(sql, function(error, rows, fields) {
    if (error) throw error;
    res.send(`Success add into data_supplier: ${nama_supplier}`);
  });
});