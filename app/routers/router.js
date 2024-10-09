const express = require('express');
const router = express.Router();
const tipoHabitacionController = require('../controllers/tipoHabitacion.controller.js');

// Rutas para tipoHabitacion
router.post('/api/tipohabitaciones/create', tipoHabitacionController.create);
router.get('/api/tipohabitaciones/all', tipoHabitacionController.retrieveAllTipoHabitaciones);
router.get('/api/tipohabitaciones/onebyid/:id', tipoHabitacionController.getTipoHabitacionById);
router.put('/api/tipohabitaciones/update/:id', tipoHabitacionController.updateById);
router.delete('/api/tipohabitaciones/delete/:id', tipoHabitacionController.deleteById);

module.exports = router;
