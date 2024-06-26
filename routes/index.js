var express = require('express');
var router = express.Router();
const mysql = require('mysql');

/*Creando conexion a la base de datos*/

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'admisend'
});


/*Iniciando conexion con la base de datos*/
function connect(){
  connection.connect((err) => {
    if (err) {
        console.error('Error al conectar:', err);
        return;
    }
    console.log('Conexión exitosa');
  });
}

/*Finalizando conexion con la base de datos*/
function disconnect(){
  connection.end();
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET admin page. */
router.get('/admin', function(req, res, next) {
  res.render('admin');
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* Comprobar y validar inicio de sesión al enviar el formulario */
router.post('/login', (req, res, next) => {
  connect();
  connection.query('SELECT * FROM usuarios', (error, results, fields) => {
    if (error) {
        console.error('Error en la consulta:', error);
        return;
    }
    console.log('Resultados:', results);
  });
  disconnect();

});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register');
});
module.exports = router;
