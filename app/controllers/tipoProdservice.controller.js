const db = require('../config/db.config.js');
const TipoProdService = db.tipoProdservice;

exports.create = (req, res) => {
    let tipoProdService = {};

    try {
        tipoProdService.nombre_tipo = req.body.nombre_tipo; 
        tipoProdService.descripcion = req.body.descripcion;

        TipoProdService.create(tipoProdService).then(result => {
            res.status(200).json({
                message: "Servicio creado exitosamente con id = " + result.id_tipo_prodservice,
                tipoProdService: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el servicio!",
            error: error.message
        });
    }
};

exports.retrieveAllTipoProdServices = (req, res) => {
    TipoProdService.findAll()
        .then(tipoProdServiceInfos => {
            res.status(200).json({
                message: "¡Servicios obtenidos exitosamente!",
                servicios: tipoProdServiceInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener los servicios!",
                error: error
            });
        });
};

exports.getTipoProdServiceById = (req, res) => {
    let tipoProdServiceId = req.params.id;
    TipoProdService.findByPk(tipoProdServiceId)
        .then(tipoProdService => {
            if (!tipoProdService) {
                return res.status(404).json({
                    message: "No se encontró el servicio con id = " + tipoProdServiceId,
                    error: "404"
                });
            }
            res.status(200).json({
                message: "Servicio obtenido exitosamente con id = " + tipoProdServiceId,
                tipoProdService: tipoProdService
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener el servicio con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let tipoProdServiceId = req.params.id;
        let tipoProdService = await TipoProdService.findByPk(tipoProdServiceId);

        if (!tipoProdService) {
            return res.status(404).json({
                message: "No se encontró el servicio para actualizar con id = " + tipoProdServiceId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre_tipo: req.body.nombre_tipo, // Cambiado de nombre_servicio a nombre_tipo
                descripcion: req.body.descripcion
            };

            let result = await TipoProdService.update(updatedObject, { returning: true, where: { id_tipo_prodservice: tipoProdServiceId } });

            res.status(200).json({
                message: "Actualización exitosa de un servicio con id = " + tipoProdServiceId,
                tipoProdService: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el servicio con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let tipoProdServiceId = req.params.id;
        let tipoProdService = await TipoProdService.findByPk(tipoProdServiceId);

        if (!tipoProdService) {
            return res.status(404).json({
                message: "No existe el servicio con id = " + tipoProdServiceId,
                error: "404",
            });
        } else {
            await tipoProdService.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del servicio con id = " + tipoProdServiceId,
                tipoProdService: tipoProdService,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar el servicio con id = " + req.params.id,
            error: error.message,
        });
    }
};
