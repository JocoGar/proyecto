const express = require('express');
const router = express.Router();
const tipoHabitacionController = require('../controllers/tipoHabitacion.controller.js');
const tipoProdServiceController = require('../controllers/tipoProdservice.controller.js');
const facturaEncabezadoController = require('../controllers/facturaEncabezado.controller.js');
const facturaDetalleController = require('../controllers/facturaDetalle.controller.js');
const usuarioController = require('../controllers/usuario.controller.js'); 

// Rutas para tipoHabitacion
router.post('/api/tipohabitaciones/create', tipoHabitacionController.create);
router.get('/api/tipohabitaciones/all', tipoHabitacionController.retrieveAllTipoHabitaciones);
router.get('/api/tipohabitaciones/onebyid/:id', tipoHabitacionController.getTipoHabitacionById);
router.put('/api/tipohabitaciones/update/:id', tipoHabitacionController.updateById);
router.delete('/api/tipohabitaciones/delete/:id', tipoHabitacionController.deleteById);

// Rutas para tipoProdservice
router.post('/api/tipoprodservices/create', tipoProdServiceController.create);
router.get('/api/tipoprodservices/all', tipoProdServiceController.retrieveAllTipoProdServices);
router.get('/api/tipoprodservices/onebyid/:id', tipoProdServiceController.getTipoProdServiceById);
router.put('/api/tipoprodservices/update/:id', tipoProdServiceController.updateById);
router.delete('/api/tipoprodservices/delete/:id', tipoProdServiceController.deleteById);

// Rutas para facturaEncabezado
router.post('/api/facturas/create', facturaEncabezadoController.create);
router.get('/api/facturas/all', facturaEncabezadoController.retrieveAllFacturas);
router.get('/api/facturas/onebyid/:id', facturaEncabezadoController.getFacturaById);
router.put('/api/facturas/update/:id', facturaEncabezadoController.updateById);
router.delete('/api/facturas/delete/:id', facturaEncabezadoController.deleteById);

// Rutas para facturaDetalle
router.post('/api/facturadetalles/create', facturaDetalleController.create);
router.get('/api/facturadetalles/all', facturaDetalleController.retrieveAllDetalles);
router.get('/api/facturadetalles/onebyid/:id', facturaDetalleController.getDetalleById);
router.put('/api/facturadetalles/update/:id', facturaDetalleController.updateById);
router.delete('/api/facturadetalles/delete/:id', facturaDetalleController.deleteById);

// Rutas para usuario
router.post('/api/usuarios/create', usuarioController.create);
router.get('/api/usuarios/all', usuarioController.retrieveAllUsuarios);
router.get('/api/usuarios/onebyid/:id', usuarioController.getUsuarioById);
router.put('/api/usuarios/update/:id', usuarioController.updateById);
router.delete('/api/usuarios/delete/:id', usuarioController.deleteById); 
router.get('/api/usuarios/deactivated', usuarioController.retrieveAllUsuariosDesactivados); 
router.put('/api/usuarios/reactivate/:id', usuarioController.reactivarUsuario);

module.exports = router;
