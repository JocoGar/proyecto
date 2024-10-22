const db = require('../config/db.config.js');
const TipoHabitacion = db.tipoHabitacion;

exports.create = (req, res) => {
    let tipoHabitacion = {};

    try {
        tipoHabitacion.nombre = req.body.nombre;
        tipoHabitacion.descripcion = req.body.descripcion;
        tipoHabitacion.capacidad = req.body.capacidad; 

        TipoHabitacion.create(tipoHabitacion).then(result => {
            res.status(200).json({
                message: "Tipo de habitación creado exitosamente con id = " + result.id_tipo_habitacion,
                tipoHabitacion: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el tipo de habitación!",
            error: error.message
        });
    }
};

exports.retrieveAllTipoHabitaciones = (req, res) => {
    TipoHabitacion.findAll()
        .then(tipoHabitaciones => {
            res.status(200).json({
                message: "¡Tipos de habitación obtenidos exitosamente!",
                tipoHabitaciones: tipoHabitaciones
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener los tipos de habitación!",
                error: error
            });
        });
};

exports.getTipoHabitacionById = (req, res) => {
    let tipoHabitacionId = req.params.id;
    TipoHabitacion.findByPk(tipoHabitacionId)
        .then(tipoHabitacion => {
            if (tipoHabitacion) {
                res.status(200).json({
                    message: "Tipo de habitación obtenido exitosamente con id = " + tipoHabitacionId,
                    tipoHabitacion: tipoHabitacion
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el tipo de habitación con id = " + tipoHabitacionId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener tipo de habitación con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let tipoHabitacionId = req.params.id;
        let tipoHabitacion = await TipoHabitacion.findByPk(tipoHabitacionId);

        if (!tipoHabitacion) {
            res.status(404).json({
                message: "No se encontró el tipo de habitación para actualizar con id = " + tipoHabitacionId,
                tipoHabitacion: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                capacidad: req.body.capacidad // Nuevo atributo
            };

            await TipoHabitacion.update(updatedObject, { returning: true, where: { id_tipo_habitacion: tipoHabitacionId } });

            res.status(200).json({
                message: "Actualización exitosa de un tipo de habitación con id = " + tipoHabitacionId,
                tipoHabitacion: { ...tipoHabitacion.dataValues, ...updatedObject }, // Incluye los datos antiguos con los nuevos
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el tipo de habitación con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let tipoHabitacionId = req.params.id;
        let tipoHabitacion = await TipoHabitacion.findByPk(tipoHabitacionId);

        if (!tipoHabitacion) {
            res.status(404).json({
                message: "No existe el tipo de habitación con id = " + tipoHabitacionId,
                error: "404",
            });
        } else {
            await tipoHabitacion.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del tipo de habitación con id = " + tipoHabitacionId,
                tipoHabitacion: tipoHabitacion,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar el tipo de habitación con id = " + req.params.id,
            error: error.message,
        });
    }
};
