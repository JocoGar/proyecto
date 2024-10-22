const db = require('../config/db.config.js'); 
const ProdService = db.prodService;
const TipoProdService = db.tipoProdservice;

exports.create = (req, res) => {
    let prodService = {};

    try {
        prodService.nombre = req.body.nombre;
        prodService.descripcion = req.body.descripcion;
        prodService.precio = req.body.precio;
        prodService.id_tipo_prodservice = req.body.id_tipo_prodservice;

        ProdService.create(prodService).then(result => {
            res.status(200).json({
                message: "Producto/Servicio creado exitosamente con id = " + result.id_producto_servicio,
                prodService: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el producto/servicio!",
            error: error.message
        });
    }
};

exports.retrieveAllProdServices = (req, res) => {
    ProdService.findAll()
        .then(prodServiceInfos => {
            res.status(200).json({
                message: "¡Productos/Servicios obtenidos exitosamente!",
                prodServices: prodServiceInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener los productos/servicios!",
                error: error
            });
        });
};


exports.getProdServiceById = (req, res) => {
    let prodServiceId = req.params.id;
    ProdService.findByPk(prodServiceId)
        .then(prodService => {
            if (!prodService) {
                return res.status(404).json({
                    message: "No se encontró el producto/servicio con id = " + prodServiceId,
                    error: "404"
                });
            }
            res.status(200).json({
                message: "Producto/Servicio obtenido exitosamente con id = " + prodServiceId,
                prodService: prodService
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener el producto/servicio con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let prodServiceId = req.params.id;
        let prodService = await ProdService.findByPk(prodServiceId);

        if (!prodService) {
            return res.status(404).json({
                message: "No se encontró el producto/servicio para actualizar con id = " + prodServiceId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                id_tipo_prodservice: req.body.id_tipo_prodservice
            };

            let result = await ProdService.update(updatedObject, { returning: true, where: { id_producto_servicio: prodServiceId } });

            res.status(200).json({
                message: "Actualización exitosa del producto/servicio con id = " + prodServiceId,
                prodService: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el producto/servicio con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.getProdServicesWithTipo = (req, res) => {
    ProdService.findAll({
        include: [
            {
                model: TipoProdService,
                as: 'tipoProdService',
                attributes: ['nombre_tipo', 'descripcion']
            }
        ]
    })
    .then(prodServices => {
        res.status(200).json({
            message: "Productos/Servicios con tipo obtenidos exitosamente",
            prodServices: prodServices
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Error al obtener productos/servicios con tipo",
            error: error.message
        });
    });
};

exports.getProdServiceByIdConTipo = (req, res) => {
    const prodServiceId = req.params.id; 

    ProdService.findByPk(prodServiceId, {
        include: [
            {
                model: TipoProdService,
                as: 'tipoProdService',
                attributes: ['nombre_tipo', 'descripcion']
            }
        ]
    })
    .then(prodService => {
        if (!prodService) {
            return res.status(404).json({
                message: "No se encontró el producto/servicio con id = " + prodServiceId,
                error: "404"
            });
        }
        res.status(200).json({
            message: "Producto/Servicio obtenido exitosamente con id = " + prodServiceId,
            prodService: prodService
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Error al obtener el producto/servicio con id = " + prodServiceId,
            error: error.message
        });
    });
};


exports.deleteById = async (req, res) => {
    try {
        let prodServiceId = req.params.id;
        let prodService = await ProdService.findByPk(prodServiceId);

        if (!prodService) {
            return res.status(404).json({
                message: "No se encontró el producto/servicio para eliminar con id = " + prodServiceId,
                error: "404"
            });
        } else {
            await ProdService.destroy({ where: { id_producto_servicio: prodServiceId } });

            res.status(200).json({
                message: "Producto/Servicio eliminado exitosamente con id = " + prodServiceId,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar el producto/servicio con id = " + req.params.id,
            error: error.message
        });
    }
};
