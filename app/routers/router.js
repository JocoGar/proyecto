const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller.js');
const habitacionController = require('../controllers/habitacion.controller.js'); 
const empleadoController = require('../controllers/empleado.controller.js'); 
const prodServiceController = require('../controllers/prodService.controller.js'); 
const reservaController = require('../controllers/reserva.controller.js');

// Rutas para cliente
router.post('/api/clientes/create', clienteController.create);
router.get('/api/clientes/all', clienteController.retrieveAllClientes);
router.get('/api/clientes/onebyid/:id', clienteController.getClienteById);
router.put('/api/clientes/update/:id', clienteController.updateById);
router.delete('/api/clientes/delete/:id', clienteController.deleteById);

// Rutas para empleado
router.post('/api/empleados/create', empleadoController.create);
router.get('/api/empleados/all', empleadoController.retrieveAllEmpleados);
router.get('/api/empleados/onebyid/:id', empleadoController.getEmpleadoById);
router.put('/api/empleados/update/:id', empleadoController.updateById);
router.delete('/api/empleados/delete/:id', empleadoController.deleteById);
router.get('/api/empleados/deactivated', empleadoController.retrieveAllDesactivados);
router.put('/api/empleados/reactivate/:id', empleadoController.reactivateById);

// Rutas para habitación
router.post('/api/habitaciones/create', habitacionController.create);
router.get('/api/habitaciones/all', habitacionController.retrieveAllHabitaciones);
router.get('/api/habitaciones/onebyid/:id', habitacionController.getHabitacionById);
router.put('/api/habitaciones/update/:id', habitacionController.updateById);
router.delete('/api/habitaciones/delete/:id', habitacionController.deleteById);
router.get('/api/habitaciones/deactivated', habitacionController.retrieveAllDesactivadas);
router.put('/api/habitaciones/reactivate/:id', habitacionController.reactivateById);

// Rutas para productos y servicios
router.post('/api/prodservices/create', prodServiceController.create);
router.get('/api/prodservices/all', prodServiceController.retrieveAllProdServices);
router.get('/api/prodservices/onebyid/:id', prodServiceController.getProdServiceById);
router.put('/api/prodservices/update/:id', prodServiceController.updateById);
router.delete('/api/prodservices/delete/:id', prodServiceController.deleteById);
router.get('/api/prodservices/tipo', prodServiceController.getProdServicesWithTipo);
router.get('/api/prodservices/tipo/:id', prodServiceController.getProdServiceByIdConTipo);

// Rutas para reservas
router.post('/api/reservas/create', reservaController.create);
router.get('/api/reservas/all', reservaController.retrieveAllReservas);
router.get('/api/reservas/onebyid/:id', reservaController.getReservaById);
router.put('/api/reservas/update/:id', reservaController.updateById);
router.put('/api/reservas/cancel/:id', reservaController.cancelarReservaById);
router.delete('/api/reservas/delete/:id', reservaController.deleteById); // marcar completada
router.put('/api/reservas/reactivate/:id', reservaController.reactivateById);
router.get('/api/reservas/canceled', reservaController.retrieveAllReservasCanceladas); 
router.get('/api/reservas/completed', reservaController.retrieveAllEstadiasCompletadas); 

module.exports = router;
