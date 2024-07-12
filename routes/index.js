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

/* Obteniendo pagina de administrador */
router.get('/admin', function(req, res, next) {

  if(req.session.rolID == 1){
    connection.query('SELECT * FROM departamentos', (error, results, fields) => {
      if (error) {
        console.error('Error en la consulta:', error);
      } else {
        if (results.length === 0) {  
          console.log('Departamentos no encontrados');
          res.render('admin', { resultado: results});
  
        } else {
          console.log('Departamentos encontrados:', results);
          res.render('admin', {resultado: results});
        }
      }
    });

  } else {
    res.redirect('/');
  }

});

/* Obteniendo pagina de administrar roles */
router.get('/adminr', function(req, res, next) {

  if(req.session.rolID == 1){
    connection.query('SELECT * FROM roles', (error, results, fields) => {
      if (error) {
        console.error('Error en la consulta:', error);
      } else {
        if (results.length === 0) {  
          console.log('Departamentos no encontrados');
          res.render('admin_roles', { resultado: results});
  
        } else {
          console.log('Departamentos encontrados:', results);
          res.render('admin_roles', {resultado: results});
        }
      }
    });

  } else {
    res.redirect('/');
  }

});

/* Obteniendo pagina de administrar mensajes */
router.get('/adminm', function(req, res, next) {

  if(req.session.rolID == 1){
    connection.query('SELECT * FROM mensajes AS m JOIN departamentos AS d_emisor ON m.id_departamento_emisor = d_emisor.id_departamento;', (error, results, fields) => {
      if (error) {
        console.error('Error en la consulta:', error);
      } else {
        if (results.length === 0) {  
          console.log('Departamentos no encontrados');
          res.render('admin_messages', { resultado: results});
  
        } else {
          console.log('Departamentos encontrados:', results);
          res.render('admin_messages', {resultado: results});
        }
      }
    });

  } else {
    res.redirect('/');
  }

});

/* Obteniendo pagina de administrar usuarios */
router.get('/adminu', function(req, res, next) {

  if(req.session.rolID == 1){
    connection.query('SELECT u.*, d.nombre AS nombre_departamento FROM usuarios u JOIN departamentos d ON u.id_departamento = d.id_departamento; ', (error, results, fields) => {
      if (error) {
        console.error('Error en la consulta:', error);
      } else {
        if (results.length === 0) {  
          console.log('Departamentos no encontrados');
          res.render('admin_users', { resultado: results});
  
        } else {
          console.log('Departamentos encontrados:', results);
          res.render('admin_users', {resultado: results});
        }
      }
    });

  } else {
    res.redirect('/');
  }

});

/* obteniendo pagina de Login. */
router.get('/login', function(req, res, next) {
  res.render('login', {mensaje: ""});
});

/* obteniendo pagina de edición de departamentos. */
router.get('/editd:id', function(req, res, next) {
  var id_departamento_edit = req.params.id;

  console.log(id_departamento_edit);

  if(req.session.rolID == 1){
    connection.query('SELECT * FROM departamentos WHERE id_departamento = ?', [id_departamento_edit], (error, results, fields) => {
      if (error) {
        console.error('Error en la consulta:', error);
      } else {
        if (results.length === 0) {  
          console.log('Departamentos no encontrados');
          res.render('admin_edit_d', {resultado: results});
        } else {
          console.log('Departamentos encontrados:', results);
          resultado = results;
  
          res.render('admin_edit_d', {resultado: results});
        }
      }
    });
  } else{
    res.redirect('/')
  }


});

router.get('/editr:id', function(req, res, next) {
  var id_rol_edit = req.params.id;

  if(req.session.rolID == 1){
    connection.query('SELECT * FROM roles WHERE id_rol = ?', [id_rol_edit], (error, results, fields) => {
      if (error) {
        console.error('Error en la consulta:', error);
      } else {
        if (results.length === 0) {  
          console.log('Departamentos no encontrados');
          res.render('admin_edit_r', {resultado: results});
        } else {
          console.log('Departamentos encontrados:', results);
          resultado = results;
  
          res.render('admin_edit_r', {resultado: results});
        }
      }
    });

  } else{
    res.redirect('/');
  }


});
/*añadiendo funcion para eliminar departamentos*/
router.get('/deleted:id', function(req, res, next) {
  var id_departamento_delete = req.params.id;

  console.log(id_departamento_delete);

  if(req.session.rolID == 1){

    connection.query('DELETE FROM departamentos WHERE id_departamento = ?', [id_departamento_delete], (error, fields) => {
      if (error) {
        console.error('Error en la consulta:', error);
      } else {
        console.log('Departamento eliminado');
        res.redirect('/admin');
      }
    });

  } else{

    res.redirect('/')
    
  }

});

/*añadiendo funcion para eliminar mensajes*/
router.get('/deletem:id', function(req, res, next) {
  var id_mensaje_delete = req.params.id;

  console.log(id_mensaje_delete);

  if(req.session.rolID == 1){
    connection.query('DELETE FROM mensajes WHERE id_mensaje = ?', [id_mensaje_delete], (error, fields) => {
      if (error) {
        console.error('Error en la consulta:', error);
      } else {
        console.log('Departamento eliminado');
        res.redirect('/adminm');
      }
    });

  } else{
    res.redirect('/')
  }

});

/*añadiendo funcion para eliminar roles*/
router.get('/deleter:id', function(req, res, next) {
  var id_rol_delete = req.params.id;

  console.log(id_rol_delete);
  if(req.session.rolID == 1){
    connection.query('DELETE FROM roles WHERE id_rol = ?', [id_rol_delete], (error, fields) => {
      if (error) {
        console.error('Error en la consulta:', error);
      } else {
        console.log('Departamento eliminado');
        res.redirect('/adminr');
      }
    });

  } else{
    res.redirect('/')
  }

});

/*añadiendo funcion para eliminar usuarios*/
router.get('/deleteu:id', function(req, res, next) {
  var id_usuario_delete = req.params.id;

  console.log(id_usuario_delete);

  if(req.session.rolID == 1){
    connection.query('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario_delete], (error, fields) => {
      if (error) {
        console.error('Error en la consulta:', error);
      } else {
        console.log('Departamento eliminado');
        res.redirect('/adminu');
      }
    });

  } else{
    res.redirect('/')
  }

});

/* Comprobar y validar inicio de sesión al enviar el formulario */
router.post('/login', (req, res, next) => {

  const { user, password } = req.body;
  connect();
  connection.query('SELECT * FROM usuarios WHERE usuario = ? and contraseña = ?', [user, password], (error, results, fields) => {
    if (error) {
      console.error('Error en la consulta:', error);
    } else {
      if (results.length === 0) {  
        console.log('Usuario no encontrado');

        res.render('login', {mensaje: 'Usuario o contraseña incorrectos'});

      } else {
        console.log('Usuario encontrado:', results[0]);
        req.session.nombre = results[0].nombre_completo;
        req.session.rolID = results[0].id_rol;
        req.session.identificador = results[0].id_departamento;
        if(req.session.rolID == 1){
          res.redirect('/admin');
        } else {
          res.redirect('/');
        }
      }
    }
  });

});

/* GET register page. */
router.get('/register', function(req, res, next) {
  connection.query('SELECT * FROM departamentos', (error, results, fields) => {
    if (error) {
      console.error('Error en la consulta:', error);
    } else {
      if (results.length === 0) {  
        console.log('Departamentos no encontrados');
        res.render('register', { resultado: results, mensaje: ''});

      } else {
        console.log('Departamentos encontrados:', results);
        resultado = results;
        res.render('register', {resultado: results, mensaje: ''});
      }
    }
  });
});

/*Añadiendo funcionalidad al formulario de registro*/
router.post('/register', function(req, res, next) {
  
  const { nombre, cedula, usuario, departamento, passwordc, password } = req.body;

  if(passwordc == password){
    connect();
    connection.query('INSERT INTO usuarios (id_rol, id_departamento, nombre_completo, cedula, usuario, contraseña) VALUES (?, ?, ?, ?, ?, ?)', [2, departamento, nombre, cedula, usuario, password], (error, fields) => {
      if (error) {
        console.error('Error en el registro:', error);
        res.redirect('/');
      } else {
          console.log('Usuario registrado exitosamente:');
          res.redirect('/');
        }
    });

  } else {
    console.log("Las contraseñas no coinciden");
    res.render('register', {mensaje: 'Las contraseñas no coinciden'});
  }

});

/* Obteniendo la pagina de inicio*/
router.get('/', function(req, res, next) {
  var nombre = req.session.nombre; // Lee el valor de la sesión
  var id = req.session.identificador;

  console.log(id);
  if (id === undefined){
    res.redirect('/login')
  } else {

    
  connection.query('SELECT * FROM mensajes AS m JOIN departamentos AS d_emisor ON m.id_departamento_emisor = d_emisor.id_departamento JOIN departamentos AS d_destino ON m.id_departamento_destino = d_destino.id_departamento WHERE m.id_departamento_destino = ?', [id], (error, results, fields) => {
    if (error) {
      console.error('Error en la consulta:', error);
    } else {
      if (results.length === 0) {  
        console.log('Mensajes no encontrados');
        res.render('index', { nombre: nombre, resultado: results});
      } else {
        console.log('Mensajes encontrados:', results);
        resultado = results;

        res.render('index', { nombre: nombre, resultado: results});
      }
    }
  });

  }



});

/*Obteniendo lista de mensajes enviados*/
router.get('/enviados', function(req, res, next) {
  var nombre = req.session.nombre; // Lee el valor de la sesión
  var id = req.session.identificador;
  if (nombre === undefined){
    res.redirect('/login')
  }


  console.log(id);

  connection.query('SELECT * FROM mensajes AS m JOIN departamentos AS d_emisor ON m.id_departamento_emisor = d_emisor.id_departamento JOIN departamentos AS d_destino ON m.id_departamento_destino = d_destino.id_departamento WHERE m.id_departamento_emisor = ?', [id], (error, results, fields) => {
    if (error) {
      console.error('Error en la consulta:', error);
    } else {
      if (results.length === 0) {  
        console.log('Mensajes no encontrados');
        res.render('enviados', { nombre: nombre, resultado: results});

      } else {
        console.log('Mensajes encontrados:', results[0]);
        resultado = results;
        res.render('enviados', { nombre: nombre, resultado: results});
      }
    }
  });
});

/*Añadiendo funciones de cierre de sesión*/
router.get('/logout', function(req, res, next) {
  req.session.destroy(); // Elimina la sesión
  res.redirect('/login');
});

/*Obteniendo vista de envio de mensajes*/
router.get('/send', function(req, res, next) {
  var nombre = req.session.nombre; // Lee el valor de la sesión
  if (nombre === undefined){
    res.redirect('/login')
  }

  connection.query('SELECT * FROM departamentos', (error, results, fields) => {
    if (error) {
      console.error('Error en la consulta:', error);
    } else {
      if (results.length === 0) {  
        console.log('Departamentos no encontrados');
        res.render('send', { nombre: nombre, resultado: results});

      } else {
        console.log('Departamentos encontrados:', results);
        resultado = results;
        res.render('send', { nombre: nombre, resultado: results});
      }
    }
  });
});

/*añadiendo funcion de envio de mensajes */
router.post('/send', (req, res, next) => {

  const { nro_memo, asunto, mensaje, departamento } = req.body;
  const departamento_actual = req.session.identificador;
  const fechaActual = new Date();

  connect();
  connection.query('INSERT INTO mensajes (id_departamento_emisor, id_departamento_destino, fecha, nro_memo, asunto, mensaje) VALUES (?, ?, ?, ?, ?, ?)', [departamento_actual, departamento, fechaActual, nro_memo, asunto, mensaje], (error, fields) => {
    if (error) {
      console.error('Error en la consulta:', error);
    } else {
        console.log('Mensaje enviado:');
        res.redirect('/');
      }
  });

});

/*obteniendo la vista para mostrar mensajes*/
router.get('/msg:id', function(req, res, next) {
  var id_mensaje_actual = req.params.id;
  var nombre = req.session.nombre; // Lee el valor de la sesión

  console.log(id_mensaje_actual);

  if(nombre === undefined){

  } else {

    connection.query('SELECT * FROM mensajes AS m JOIN departamentos AS d_emisor ON m.id_departamento_emisor = d_emisor.id_departamento JOIN departamentos AS d_destino ON m.id_departamento_destino = d_destino.id_departamento WHERE id_mensaje = ?', [id_mensaje_actual], (error, results, fields) => {
      if (error) {
        console.error('Error en la consulta:', error);
      } else {
        if (results.length === 0) {  
          console.log('Mensajes no encontrados');
          res.render('message', {nombre: nombre, resultado: results});
        } else {
          console.log('Mensajes encontrados:', results);
          resultado = results;
  
          console.log(results);
  
          res.render('message', {nombre: nombre, resultado: results});
        }
      }
    });

  }

});

/*Obteniendo vista para ver los mensajes como admin*/
router.get('/madmin:id', function(req, res, next) {
  var id_mensaje_actual = req.params.id;
  var nombre = req.session.nombre; // Lee el valor de la sesión

  console.log(id_mensaje_actual);
  if(req.session.rolID == 1){

  } else{
    res.redirect('/')
  }

  if(nombre === undefined){

  } else {

    connection.query('SELECT * FROM mensajes AS m JOIN departamentos AS d_emisor ON m.id_departamento_emisor = d_emisor.id_departamento JOIN departamentos AS d_destino ON m.id_departamento_destino = d_destino.id_departamento WHERE id_mensaje = ?', [id_mensaje_actual], (error, results, fields) => {
      if (error) {
        console.error('Error en la consulta:', error);
      } else {
        if (results.length === 0) {  
          console.log('Mensajes no encontrados');
          res.render('messagea', {nombre: nombre, resultado: results});
        } else {
          console.log('Mensajes encontrados:', results);
          resultado = results;
  
          console.log(results);
  
          res.render('messagea', {nombre: nombre, resultado: results});
        }
      }
    });

  }

});

/*Agregando funciones para crear departamentos*/
router.get('/created', function(req, res, next) {
  var nombre = req.session.nombre; // Lee el valor de la sesión

  if(req.session.rolID == 1){
    if(nombre === undefined){

    } else {
      res.render('created');
    }

  } else{
    res.redirect('/')
  }



});

router.post('/created', function(req, res, next) {
  var nombreu = req.session.nombre; // Lee el valor de la sesión
  const { nombre, funcion} = req.body;

  if(req.session.rolID == 1){
    if(nombreu === undefined){

    } else {
      connect();
      connection.query('INSERT INTO departamentos (nombre, funcion) VALUES (?, ?)', [nombre, funcion], (error, fields) => {
        if (error) {
          console.error('Error en la creación del departamento:', error);
          res.redirect('/admin');
        } else {
            console.log('Departamento creado exitosamente:');
            res.redirect('/admin');
          }
      });
    }

  } else{
    res.redirect('/')
  }

});

/*Agregando funciones para crear roles*/
router.get('/creater', function(req, res, next) {
  var nombre = req.session.nombre; // Lee el valor de la sesión

  if(req.session.rolID == 1){

    if(nombre === undefined){

    } else {
      res.render('creater');
    }

  } else{
    res.redirect('/')
  }

});

router.post('/creater', function(req, res, next) {
  var nombreu = req.session.nombre; // Lee el valor de la sesión
  const { nombre, funcion} = req.body;

  if(req.session.rolID == 1){
    if(nombreu === undefined){

    } else {
      connect();
      connection.query('INSERT INTO roles (nombre, funcion) VALUES (?, ?)', [nombre, funcion], (error, fields) => {
        if (error) {
          console.error('Error en la creación del rol:', error);
          res.redirect('/adminr');
        } else {
            console.log('Rol creado exitosamente:');
            res.redirect('/adminr');
          }
      });
    }

  } else{
    res.redirect('/')
  }
  
});

router.post('/editd:id', function(req, res, next) {
  var id_departamento_edit = req.params.id;
  const { nombre, funcion } = req.body;

  if(req.session.rolID == 1){
    connection.query('UPDATE departamentos SET nombre = ?, funcion = ? WHERE id_departamento = ?;', [nombre, funcion ,id_departamento_edit], (error, fields) => {
      if (error) {
        console.error('Error en la consulta:', error);
      } else {
        console.log('Departamento eliminado');
        res.redirect('/admin');
      }
    });

  } else{
    res.redirect('/')
  }



});

router.post('/editr:id', function(req, res, next) {
  var id_rol_edit = req.params.id;
  const { nombre, funcion } = req.body;

  if(req.session.rolID == 1){
    connection.query('UPDATE roles SET nombre = ?, funcion = ? WHERE id_rol = ?;', [nombre, funcion ,id_rol_edit], (error, fields) => {
      if (error) {
        console.error('Error en la consulta:', error);
      } else {
        console.log('Departamento eliminado');
        res.redirect('/adminr');
      }
    });

  } else{
    res.redirect('/')
  }

});


module.exports = router;
