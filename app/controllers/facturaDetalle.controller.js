const db = require('../config/db.config.js');
const FacturaDetalle = db.facturaDetalle;
const FacturaEncabezado = db.facturaEncabezado;
const Reserva = db.reserva;
const ProductoServicio = db.prodService;
const Cliente = db.cliente;
const Habitacion = db.habitacion;


exports.create = (req, res) => {
    let facturaDetalle = {};

    try {
        facturaDetalle.id_factura_encabezado = req.body.id_factura_encabezado;
        facturaDetalle.id_reserva = req.body.id_reserva;
        facturaDetalle.id_producto_servicio = req.body.id_producto_servicio;
        facturaDetalle.cantidad = req.body.cantidad;
        facturaDetalle.precio_unitario = req.body.precio_unitario;

        FacturaDetalle.create(facturaDetalle).then(result => {
            res.status(200).json({
                message: "Detalle de factura creado exitosamente con id = " + result.id_factura_detalle,
                facturaDetalle: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el detalle de la factura!",
            error: error.message
        });
    }
};


exports.retrieveAllDetalles = (req, res) => {
    FacturaDetalle.findAll({
        include: [
            {
                model: FacturaEncabezado,
                attributes: ['fecha', 'id_cliente', 'total'],
                include: [{
                    model: Cliente,
                    attributes: ['nombre', 'apellido'] 
                }]
            },
            {
                model: Reserva,
                attributes: ['id_habitacion'],
                include: [{
                    model: Habitacion,
                    attributes: ['numero_habitacion']
                }]
            },
            {
                model: ProductoServicio,
                attributes: ['nombre', 'descripcion', 'precio']
            }
        ]
    })
    .then(detalleInfos => {
        res.status(200).json({
            message: "¡Detalles de facturas obtenidos exitosamente!",
            detalles: detalleInfos
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "¡Error al obtener los detalles de las facturas!",
            error: error
        });
    });
};

exports.getDetalleById = (req, res) => {
    let detalleId = req.params.id;
    FacturaDetalle.findByPk(detalleId, {
        include: [
            {
                model: FacturaEncabezado,
                attributes: ['fecha', 'id_cliente', 'total'],
                include: [{
                    model: Cliente,
                    attributes: ['nombre', 'apellido'] 
                }]
            },
            {
                model: Reserva,
                attributes: ['id_habitacion'],
                include: [{
                    model: Habitacion,
                    attributes: ['numero_habitacion'] 
                }]
            },
            {
                model: ProductoServicio,
                attributes: ['nombre', 'descripcion', 'precio']
            }
        ]
    })
    .then(detalle => {
        if (!detalle) {
            return res.status(404).json({
                message: "Detalle de factura no encontrado con id = " + detalleId,
            });
        }
        res.status(200).json({
            message: "Detalle de factura obtenido exitosamente con id = " + detalleId,
            detalle: detalle
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "¡Error al obtener el detalle de la factura con id!",
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
                message: "No se encontró el detalle de la factura para actualizar con id = " + detalleId,
                detalle: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                id_factura_encabezado: req.body.id_factura_encabezado,
                id_reserva: req.body.id_reserva,
                id_producto_servicio: req.body.id_producto_servicio,
                cantidad: req.body.cantidad,
                precio_unitario: req.body.precio_unitario
            };

            await FacturaDetalle.update(updatedObject, { returning: true, where: { id_factura_detalle: detalleId } });

            res.status(200).json({
                message: "Actualización exitosa del detalle de la factura con id = " + detalleId,
                detalle: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el detalle de la factura con id = " + req.params.id,
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
                message: "No existe el detalle de la factura con id = " + detalleId,
                error: "404",
            });
        } else {
            await detalle.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del detalle de la factura con id = " + detalleId,
                detalle: detalle,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar el detalle de la factura con id = " + req.params.id,
            error: error.message,
        });
    }
};
