const db = require('../config/db.config.js');
const Habitacion = db.Habitacion;

// Crear una nueva habitación
exports.create = (req, res) => {
    let habitacion = {};

    try {
        habitacion.numero_habitacion = req.body.numero_habitacion;
        habitacion.id_tipo_habitacion = req.body.id_tipo_habitacion;
        habitacion.capacidad = req.body.capacidad;
        habitacion.precio_noche = req.body.precio_noche;
        habitacion.estado = req.body.estado;

        Habitacion.create(habitacion).then(result => {
            res.status(200).json({
                message: "Habitación creada exitosamente con id = " + result.id_habitacion,
                habitacion: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear la habitación!",
            error: error.message
        });
    }
};

exports.retrieveAllHabitaciones = (req, res) => {
    Habitacion.findAll()
        .then(habitacionInfos => {
            res.status(200).json({
                message: "¡Habitaciones obtenidas exitosamente!",
                habitaciones: habitacionInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener las habitaciones!",
                error: error
            });
        });
};


exports.getHabitacionById = (req, res) => {
    let habitacionId = req.params.id_habitacion;
    Habitacion.findByPk(habitacionId)
        .then(habitacion => {
            res.status(200).json({
                message: "Habitación obtenida exitosamente con id = " + habitacionId,
                habitacion: habitacion
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener habitación con id!",
                error: error
            });
        });
};


exports.updateById = async (req, res) => {
    try {
        let habitacionId = req.params.id_habitacion;
        let habitacion = await Habitacion.findByPk(habitacionId);

        if (!habitacion) {
            res.status(404).json({
                message: "No se encontró la habitación para actualizar con id = " + habitacionId,
                habitacion: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                numero_habitacion: req.body.numero_habitacion,
                id_tipo_habitacion: req.body.id_tipo_habitacion,
                capacidad: req.body.capacidad,
                precio_noche: req.body.precio_noche,
                estado: req.body.estado
            };
            let result = await Habitacion.update(updatedObject, { returning: true, where: { id_habitacion: habitacionId } });

            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar la habitación con id = " + req.params.id_habitacion,
                    error: "No se pudo actualizar la habitación",
                });
            }

            res.status(200).json({
                message: "Actualización exitosa de la habitación con id = " + habitacionId,
                habitacion: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar la habitación con id = " + req.params.id_habitacion,
            error: error.message
        });
    }
};


exports.deleteById = async (req, res) => {
    try {
        let habitacionId = req.params.id_habitacion;
        let habitacion = await Habitacion.findByPk(habitacionId);

        if (!habitacion) {
            res.status(404).json({
                message: "No existe la habitación con id = " + habitacionId,
                error: "404",
            });
        } else {
            await habitacion.destroy();
            res.status(200).json({
                message: "Eliminación exitosa de la habitación con id = " + habitacionId,
                habitacion: habitacion,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar la habitación con id = " + req.params.id_habitacion,
            error: error.message,
        });
    }
};
