var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const session = require('express-session');

router.use(session({
    secret: '4jero3p4itjgJDL4MFI4skd', // Cambia esto por una clave segura
    resave: false,
    saveUninitialized: true
}));

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

  const { user, password } = req.body;
  console.log(user, " " ,password)
  connect();
  connection.query('SELECT * FROM usuarios WHERE usuario = ? and contraseña = ?', [user, password], (error, results, fields) => {
    if (error) {
      console.error('Error en la consulta:', error);
    } else {
      if (results.length === 0) {  
        console.log('Usuario no encontrado');
        res.redirect('/login');

      } else {
        console.log('Usuario encontrado:', results[0]);
        req.session.nombre = results[0].nombre_completo;
        res.redirect('/');
      }
    }
  });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  const nombre = req.session.nombre; // Lee el valor de la sesión
  res.render('index', { nombre: nombre });
});

router.get('/logout', function(req, res, next) {
  req.session.destroy(); // Elimina la sesión
  res.redirect('/login');
});
module.exports = router;
