const db = require('../config/db.config.js');
const FacturaEncabezado = db.facturaEncabezado;

exports.create = (req, res) => {
    let factura = {};

    try {
        factura.fecha = req.body.fecha;
        factura.id_cliente = req.body.id_cliente;
        factura.nombre_cliente = req.body.nombre_cliente;
        factura.total = req.body.total;

        FacturaEncabezado.create(factura).then(result => {
            res.status(200).json({
                message: "Factura creada exitosamente con id = " + result.id_factura_encabezado,
                factura: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear la factura!",
            error: error.message
        });
    }
};

exports.retrieveAllFacturas = (req, res) => {
    FacturaEncabezado.findAll()
        .then(facturas => {
            res.status(200).json({
                message: "¡Facturas obtenidas exitosamente!",
                facturas: facturas
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener las facturas!",
                error: error
            });
        });
};

exports.getFacturaById = (req, res) => {
    let facturaId = req.params.id;
    FacturaEncabezado.findByPk(facturaId)
        .then(factura => {
            res.status(200).json({
                message: "Factura obtenida exitosamente con id = " + facturaId,
                factura: factura
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener la factura con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let facturaId = req.params.id;
        let factura = await FacturaEncabezado.findByPk(facturaId);

        if (!factura) {
            res.status(404).json({
                message: "No se encontró la factura para actualizar con id = " + facturaId,
                factura: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                fecha: req.body.fecha,
                id_cliente: req.body.id_cliente,
                nombre_cliente: req.body.nombre_cliente,
                total: req.body.total
            };

            let result = await FacturaEncabezado.update(updatedObject, { returning: true, where: { id_factura_encabezado: facturaId } });

            res.status(200).json({
                message: "Actualización exitosa de la factura con id = " + facturaId,
                factura: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar la factura con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let facturaId = req.params.id;
        let factura = await FacturaEncabezado.findByPk(facturaId);

        if (!factura) {
            res.status(404).json({
                message: "No existe la factura con id = " + facturaId,
                error: "404",
            });
        } else {
            await factura.destroy();
            res.status(200).json({
                message: "Eliminación exitosa de la factura con id = " + facturaId,
                factura: factura,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar la factura con id = " + req.params.id,
            error: error.message,
        });
    }
};
