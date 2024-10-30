const db = require('../config/db.config.js');
const Cliente = db.cliente;
const { Op } = db.Sequelize; 

exports.create = (req, res) => {
    let cliente = {};

    try {
        cliente.nombre = req.body.nombre;
        cliente.apellido = req.body.apellido;
        cliente.telefono = req.body.telefono;
        cliente.email = req.body.email;
        cliente.direccion = req.body.direccion;

        Cliente.create(cliente).then(result => {
            res.status(200).json({
                message: "Cliente creado exitosamente con id = " + result.id_cliente,
                cliente: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el cliente!",
            error: error.message
        });
    }
};

exports.retrieveAllClientes = (req, res) => {
    Cliente.findAll()
        .then(clienteInfos => {
            res.status(200).json({
                message: "¡Clientes obtenidos exitosamente!",
                clientes: clienteInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener los clientes!",
                error: error
            });
        });
};

exports.getClienteById = (req, res) => {
    let valorBusqueda = req.params.id;

    
    let whereClause = {};
    if (!isNaN(valorBusqueda)) {
      
        whereClause = {
            [Op.or]: [  
                { id_cliente: valorBusqueda },
                { telefono: valorBusqueda }
            ]
        };
    } else if (valorBusqueda.includes("@")) {
        
        whereClause.email = valorBusqueda;
    } else {
        
        whereClause = {
            [Op.or]: [  
                { nombre: valorBusqueda },
                { apellido: valorBusqueda }
            ]
        };
    }


    Cliente.findOne({ where: whereClause })
        .then(cliente => {
            if (!cliente) {
                return res.status(404).json({
                    message: "No se encontró un cliente con el criterio proporcionado.",
                    error: "404"
                });
            }
            res.status(200).json({
                message: "Cliente obtenido exitosamente",
                cliente: cliente
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener el cliente!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            return res.status(404).json({
                message: "No se encontró el cliente para actualizar con id = " + clienteId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                telefono: req.body.telefono,
                email: req.body.email,
                direccion: req.body.direccion
            };

            let result = await Cliente.update(updatedObject, { returning: true, where: { id_cliente: clienteId } });

            res.status(200).json({
                message: "Actualización exitosa de un cliente con id = " + clienteId,
                cliente: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el cliente con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let clienteId = req.params.id;
        let cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            return res.status(404).json({
                message: "No existe el cliente con id = " + clienteId,
                error: "404",
            });
        } else {
            await cliente.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del cliente con id = " + clienteId,
                cliente: cliente,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar el cliente con id = " + req.params.id,
            error: error.message,
        });
    }
};

