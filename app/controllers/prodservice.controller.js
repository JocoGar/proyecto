const db = require('../config/db.config.js');
const ProdService = db.ProdService;

// Crear un nuevo producto o servicio
exports.create = (req, res) => {
    let prodService = {};

    try {
        prodService.nombre = req.body.nombre;
        prodService.descripcion = req.body.descripcion;
        prodService.precio = req.body.precio;
        prodService.tipo = req.body.tipo;

        ProdService.create(prodService).then(result => {
            res.status(200).json({
                message: "Producto o servicio creado exitosamente con id = " + result.id_producto_servicio,
                prodService: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el producto o servicio!",
            error: error.message
        });
    }
};

// Obtener todos los productos o servicios
exports.retrieveAllProdServices = (req, res) => {
    ProdService.findAll()
        .then(prodServiceInfos => {
            res.status(200).json({
                message: "¡Productos o servicios obtenidos exitosamente!",
                prodServices: prodServiceInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los productos o servicios!",
                error: error
            });
        });
};

// Obtener un producto o servicio por ID
exports.getProdServiceById = (req, res) => {
    let prodServiceId = req.params.id_producto_servicio;
    ProdService.findByPk(prodServiceId)
        .then(prodService => {
            res.status(200).json({
                message: "Producto o servicio obtenido exitosamente con id = " + prodServiceId,
                prodService: prodService
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener producto o servicio con id!",
                error: error
            });
        });
};

// Actualizar un producto o servicio por ID
exports.updateById = async (req, res) => {
    try {
        let prodServiceId = req.params.id_producto_servicio;
        let prodService = await ProdService.findByPk(prodServiceId);

        if (!prodService) {
            res.status(404).json({
                message: "No se encontró el producto o servicio para actualizar con id = " + prodServiceId,
                prodService: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: req.body.precio,
                tipo: req.body.tipo
            };
            let result = await ProdService.update(updatedObject, { returning: true, where: { id_producto_servicio: prodServiceId } });

            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar el producto o servicio con id = " + req.params.id_producto_servicio,
                    error: "No se pudo actualizar el producto o servicio",
                });
            }

            res.status(200).json({
                message: "Actualización exitosa del producto o servicio con id = " + prodServiceId,
                prodService: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el producto o servicio con id = " + req.params.id_producto_servicio,
            error: error.message
        });
    }
};

// Eliminar un producto o servicio por ID
exports.deleteById = async (req, res) => {
    try {
        let prodServiceId = req.params.id_producto_servicio;
        let prodService = await ProdService.findByPk(prodServiceId);

        if (!prodService) {
            res.status(404).json({
                message: "No existe el producto o servicio con id = " + prodServiceId,
                error: "404",
            });
        } else {
            await prodService.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del producto o servicio con id = " + prodServiceId,
                prodService: prodService,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar el producto o servicio con id = " + req.params.id_producto_servicio,
            error: error.message,
        });
    }
};
