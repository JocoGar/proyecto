const db = require('../config/db.config.js');
const FacturaDetalle = db.facturaDetalle;

exports.create = (req, res) => {
    let detalle = {};

    try {
        detalle.id_factura_encabezado = req.body.id_factura_encabezado;
        detalle.producto = req.body.producto;
        detalle.servicio = req.body.servicio;
        detalle.precio_unitario = req.body.precio_unitario;
        detalle.cantidad = req.body.cantidad;

        FacturaDetalle.create(detalle).then(result => {
            res.status(200).json({
                message: "Detalle de factura creado exitosamente con id = " + result.id_factura_detalle,
                detalle: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el detalle de factura!",
            error: error.message
        });
    }
};

exports.retrieveAllDetalles = (req, res) => {
    FacturaDetalle.findAll()
        .then(detalles => {
            res.status(200).json({
                message: "¡Detalles de factura obtenidos exitosamente!",
                detalles: detalles
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener los detalles de factura!",
                error: error
            });
        });
};

exports.getDetalleById = (req, res) => {
    let detalleId = req.params.id;
    FacturaDetalle.findByPk(detalleId)
        .then(detalle => {
            res.status(200).json({
                message: "Detalle de factura obtenido exitosamente con id = " + detalleId,
                detalle: detalle
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener el detalle de factura con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let detalleId = req.params.id;
        let detalle = await FacturaDetalle.findByPk(detalleId);

        if (!detalle) {
            res.status(404).json({
                message: "No se encontró el detalle de factura para actualizar con id = " + detalleId,
                detalle: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                id_factura_encabezado: req.body.id_factura_encabezado,
                producto: req.body.producto,
                servicio: req.body.servicio,
                precio_unitario: req.body.precio_unitario,
                cantidad: req.body.cantidad
            };

            let result = await FacturaDetalle.update(updatedObject, { returning: true, where: { id_factura_detalle: detalleId } });

            res.status(200).json({
                message: "Actualización exitosa del detalle de factura con id = " + detalleId,
                detalle: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el detalle de factura con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let detalleId = req.params.id;
        let detalle = await FacturaDetalle.findByPk(detalleId);

        if (!detalle) {
            res.status(404).json({
                message: "No existe el detalle de factura con id = " + detalleId,
                error: "404",
            });
        } else {
            await detalle.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del detalle de factura con id = " + detalleId,
                detalle: detalle,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar el detalle de factura con id = " + req.params.id,
            error: error.message,
        });
    }
};
