
const db = require('../config/db.config.js');
const Habitacion = db.habitacion;
const TipoHabitacion = db.tipoHabitacion;

exports.create = (req, res) => {
    let habitacion = {};

    try {
        habitacion.numero_habitacion = req.body.numero_habitacion;
        habitacion.id_tipo_habitacion = req.body.id_tipo_habitacion;
        habitacion.camas = req.body.camas;
        habitacion.sanitario = req.body.sanitario;
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
    Habitacion.findAll({
        where: { estado: 1 }
    })
        .then(habitacionInfos => {
            res.status(200).json({
                message: "¡Habitaciones obtenidas exitosamente!",
                habitaciones: habitacionInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener las habitaciones!",
                error: error
            });
        });
};

exports.getHabitacionById = (req, res) => {
    let habitacionId = req.params.id;
    Habitacion.findByPk(habitacionId)
        .then(habitacion => {
            if (!habitacion) {
                return res.status(404).json({
                    message: "No se encontró la habitación con id = " + habitacionId,
                    error: "404"
                });
            }
            res.status(200).json({
                message: "Habitación obtenida exitosamente con id = " + habitacionId,
                habitacion: habitacion
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener la habitación con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let habitacionId = req.params.id;
        let habitacion = await Habitacion.findByPk(habitacionId);

        if (!habitacion) {
            return res.status(404).json({
                message: "No se encontró la habitación para actualizar con id = " + habitacionId,
                error: "404"
            });
        } else {
            let updatedObject = {
                numero_habitacion: req.body.numero_habitacion,
                id_tipo_habitacion: req.body.id_tipo_habitacion,
                camas: req.body.camas,
                sanitario: req.body.sanitario,
                precio_noche: req.body.precio_noche,
                estado: req.body.estado
            };

            let result = await Habitacion.update(updatedObject, { returning: true, where: { id_habitacion: habitacionId } });

            res.status(200).json({
                message: "Actualización exitosa de la habitación con id = " + habitacionId,
                habitacion: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar la habitación con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let habitacionId = req.params.id;
        let habitacion = await Habitacion.findByPk(habitacionId);

        if (!habitacion) {
            return res.status(404).json({
                message: "No existe la habitación con id = " + habitacionId,
                error: "404",
            });
        } else {
            
            habitacion.estado = 0;
            await habitacion.save();
            res.status(200).json({
                message: "La habitación con id = " + habitacionId + " ha sido desactivada.",
                habitacion: habitacion,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede desactivar la habitación con id = " + req.params.id,
            error: error.message,
        });
    }
};
exports.retrieveAllDesactivadas = (req, res) => {
    Habitacion.findAll({
        where: { estado: 0 }
    })
        .then(habitacionInfos => {
            res.status(200).json({
                message: "¡Habitaciones desactivadas obtenidas exitosamente!",
                habitaciones: habitacionInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener las habitaciones desactivadas!",
                error: error
            });
        });
};
exports.reactivateById = async (req, res) => {
    try {
        let habitacionId = req.params.id;
        let habitacion = await Habitacion.findByPk(habitacionId);

        if (!habitacion) {
            return res.status(404).json({
                message: "No existe la habitación con id = " + habitacionId,
                error: "404",
            });
        } else {
            
            habitacion.estado = 1;
            await habitacion.save();  

            res.status(200).json({
                message: "Habitación reactivada exitosamente con id = " + habitacionId,
                habitacion: habitacion,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede reactivar la habitación con id = " + req.params.id,
            error: error.message,
        });
    }
};

exports.getHabitacionesWithTipo = (req, res) => {
    Habitacion.findAll({
        include: [
            {
                model: TipoHabitacion, 
                as: 'tipoHabitacion', 
                attributes: ['nombre', 'descripcion', 'capacidad']
            }
        ]
    })
    .then(habitaciones => {
        res.status(200).json({
            message: "Habitaciones con tipo obtenidas exitosamente",
            habitaciones: habitaciones
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Error al obtener habitaciones con tipo",
            error: error.message
        });
    });
};

exports.getHabitacionByIdConTipo = (req, res) => {
    const habitacionId = req.params.id; 

    Habitacion.findByPk(habitacionId, {
        include: [
            {
                model: TipoHabitacion,
                as: 'tipoHabitacion',
                attributes: ['nombre', 'descripcion', 'capacidad']
            }
        ]
    })
    .then(habitacion => {
        if (!habitacion) {
            return res.status(404).json({
                message: "No se encontró la habitación con id = " + habitacionId,
                error: "404"
            });
        }
        res.status(200).json({
            message: "Habitación obtenida exitosamente con id = " + habitacionId,
            habitacion: habitacion
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Error al obtener la habitación con id = " + habitacionId,
            error: error.message
        });
    });
};
