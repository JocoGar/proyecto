
const db = require('../config/db.config.js');
const Reserva = db.reserva;
const Cliente = db.cliente;
const Habitacion = db.habitacion;

exports.create = async (req, res) => {
    try {
        const reservaData = {
            check_in: req.body.check_in,
            check_out: req.body.check_out,
            id_cliente: req.body.id_cliente,
            id_habitacion: req.body.id_habitacion,
            estado: req.body.estado || 1 
        };

        const reserva = await Reserva.create(reservaData);
        res.status(201).json({
            message: "Reserva creada exitosamente con id = " + reserva.id_reserva,
            reserva: reserva
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear la reserva!",
            error: error.message
        });
    }
};

exports.retrieveAllReservas = (req, res) => {
    Reserva.findAll({
        where: {estado: 1},
        include: [
            {
                model: Cliente,
                as: 'cliente',
                attributes: ['nombre', 'apellido', 'telefono', 'email']
            },
            {
                model: Habitacion,
                as: 'habitacion',
                attributes: ['numero_habitacion', 'precio_noche']
            }
        ]
    })
        .then(reservas => {
            res.status(200).json({
                message: "¡Reservas obtenidas exitosamente!",
                reservas: reservas
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener las reservas!",
                error: error.message
            });
        });
};

exports.getReservaById = (req, res) => {
    const reservaId = req.params.id;

    Reserva.findByPk(reservaId, {
        include: [
            {
                model: Cliente,
                as: 'cliente',
                attributes: ['nombre', 'apellido', 'telefono', 'email']
            },
            {
                model: Habitacion,
                as: 'habitacion',
                attributes: ['numero_habitacion', 'precio_noche']
            }
        ]
    })
        .then(reserva => {
            if (!reserva) {
                return res.status(404).json({
                    message: "No se encontró la reserva con id = " + reservaId,
                    error: "404"
                });
            }
            res.status(200).json({
                message: "Reserva obtenida exitosamente con id = " + reservaId,
                reserva: reserva
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener la reserva con id!",
                error: error.message
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        const reservaId = req.params.id;
        const reserva = await Reserva.findByPk(reservaId);

        if (!reserva) {
            return res.status(404).json({
                message: "No se encontró la reserva para actualizar con id = " + reservaId,
                error: "404"
            });
        }

        const updatedObject = {
            check_in: req.body.check_in,
            check_out: req.body.check_out,
            id_cliente: req.body.id_cliente,
            id_habitacion: req.body.id_habitacion,
            estado: req.body.estado
        };

        await Reserva.update(updatedObject, { returning: true, where: { id_reserva: reservaId } });

        res.status(200).json({
            message: "Actualización exitosa de la reserva con id = " + reservaId,
            reserva: updatedObject
        });
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar la reserva con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        const reservaId = req.params.id;
        const reserva = await Reserva.findByPk(reservaId);

        if (!reserva) {
            return res.status(404).json({
                message: "No existe la reserva con id = " + reservaId,
                error: "404"
            });
        }

        reserva.estado = 0; 
        await reserva.save();

        res.status(200).json({
            message: "La reserva con id = " + reservaId + " ha sido marcada como completada.",
            reserva: reserva
        });
    } catch (error) {
        res.status(500).json({
            message: "No se puede completar la reserva con id = " + req.params.id,
            error: error.message
        });
    }
};


exports.reactivateById = async (req, res) => {
    try {
        const reservaId = req.params.id;
        const reserva = await Reserva.findByPk(reservaId);

        if (!reserva) {
            return res.status(404).json({
                message: "No existe la reserva con id = " + reservaId,
                error: "404"
            });
        }

        reserva.estado = 1; 
        await reserva.save();

        res.status(200).json({
            message: "Reserva reactivada exitosamente con id = " + reservaId,
            reserva: reserva
        });
    } catch (error) {
        res.status(500).json({
            message: "No se puede reactivar la reserva con id = " + req.params.id,
            error: error.message
        });
    }
};
exports.cancelarReservaById = async (req, res) => {
    try {
        const reservaId = req.params.id;
        const reserva = await Reserva.findByPk(reservaId);

        if (!reserva) {
            return res.status(404).json({
                message: "No existe la reserva con id = " + reservaId,
                error: "404"
            });
        }

        reserva.estado = 2; 
        await reserva.save();

        res.status(200).json({
            message: "Reserva cancelada exitosamente con id = " + reservaId,
            reserva: reserva
        });
    } catch (error) {
        res.status(500).json({
            message: "No se puede cancelar la reserva con id = " + req.params.id,
            error: error.message
        });
    }
};
exports.retrieveAllReservasCanceladas = (req, res) => {
    Reserva.findAll({
        where: { estado: 2 }, 
        include: [
            {
                model: Cliente,
                as: 'cliente',
                attributes: ['nombre', 'apellido', 'telefono', 'email']
            },
            {
                model: Habitacion,
                as: 'habitacion',
                attributes: ['numero_habitacion', 'precio_noche']
            }
        ]
    })
    .then(reservas => {
        res.status(200).json({
            message: "¡Reservas canceladas obtenidas exitosamente!",
            reservas: reservas
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "¡Error al obtener las reservas canceladas!",
            error: error.message
        });
    });
};
exports.retrieveAllEstadiasCompletadas = (req, res) => {
    Reserva.findAll({
        where: { estado: 0 }, 
        include: [
            {
                model: Cliente,
                as: 'cliente',
                attributes: ['nombre', 'apellido', 'telefono', 'email']
            },
            {
                model: Habitacion,
                as: 'habitacion',
                attributes: ['numero_habitacion', 'precio_noche']
            }
        ]
    })
    .then(reservas => {
        res.status(200).json({
            message: "¡Estadías completadas obtenidas exitosamente!",
            reservas: reservas
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "¡Error al obtener las estadías completadas!",
            error: error.message
        });
    });
};
