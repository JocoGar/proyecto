const db = require('../config/db.config.js');
const Reserva = db.Reserva;

// Crear una nueva reserva
exports.create = (req, res) => {
    let reserva = {};

    try {
        reserva.fecha_reserva = req.body.fecha_reserva;
        reserva.hora_reserva = req.body.hora_reserva;
        reserva.id_cliente = req.body.id_cliente;
        reserva.id_habitacion = req.body.id_habitacion;
        reserva.id_empleado = req.body.id_empleado;
        reserva.estado = req.body.estado;

        Reserva.create(reserva).then(result => {
            res.status(200).json({
                message: "Reserva creada exitosamente con id = " + result.id_reserva,
                reserva: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear la reserva!",
            error: error.message
        });
    }
};

// Obtener todas las reservas
exports.retrieveAllReservas = (req, res) => {
    Reserva.findAll()
        .then(reservaInfos => {
            res.status(200).json({
                message: "¡Reservas obtenidas exitosamente!",
                reservas: reservaInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener las reservas!",
                error: error
            });
        });
};

// Obtener una reserva por ID
exports.getReservaById = (req, res) => {
    let reservaId = req.params.id_reserva;
    Reserva.findByPk(reservaId)
        .then(reserva => {
            res.status(200).json({
                message: "Reserva obtenida exitosamente con id = " + reservaId,
                reserva: reserva
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener reserva con id!",
                error: error
            });
        });
};

// Actualizar una reserva por ID
exports.updateById = async (req, res) => {
    try {
        let reservaId = req.params.id_reserva;
        let reserva = await Reserva.findByPk(reservaId);

        if (!reserva) {
            res.status(404).json({
                message: "No se encontró la reserva para actualizar con id = " + reservaId,
                reserva: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                fecha_reserva: req.body.fecha_reserva,
                hora_reserva: req.body.hora_reserva,
                id_cliente: req.body.id_cliente,
                id_habitacion: req.body.id_habitacion,
                id_empleado: req.body.id_empleado,
                estado: req.body.estado
            };
            let result = await Reserva.update(updatedObject, { returning: true, where: { id_reserva: reservaId } });

            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar la reserva con id = " + req.params.id_reserva,
                    error: "No se pudo actualizar la reserva",
                });
            }

            res.status(200).json({
                message: "Actualización exitosa de la reserva con id = " + reservaId,
                reserva: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar la reserva con id = " + req.params.id_reserva,
            error: error.message
        });
    }
};

// Eliminar una reserva por ID
exports.deleteById = async (req, res) => {
    try {
        let reservaId = req.params.id_reserva;
        let reserva = await Reserva.findByPk(reservaId);

        if (!reserva) {
            res.status(404).json({
                message: "No existe la reserva con id = " + reservaId,
                error: "404",
            });
        } else {
            await reserva.destroy();
            res.status(200).json({
                message: "Eliminación exitosa de la reserva con id = " + reservaId,
                reserva: reserva,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar la reserva con id = " + req.params.id_reserva,
            error: error.message,
        });
    }
};
