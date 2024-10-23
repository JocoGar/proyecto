const db = require('../config/db.config.js');
const Empleado = db.empleado;
const Usuario = db.usuario; 

exports.create = async (req, res) => {
    let empleado = {};

    try {
        empleado.nombre = req.body.nombre;
        empleado.apellido = req.body.apellido;
        empleado.telefono = req.body.telefono;
        empleado.email = req.body.email;
        empleado.cargo = req.body.cargo;
        empleado.salario = req.body.salario;
        empleado.estado = req.body.estado;
        empleado.id_usuario = req.body.id_usuario; 

        const result = await Empleado.create(empleado);
        res.status(200).json({
            message: "Empleado creado exitosamente con id = " + result.id_empleado,
            empleado: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el empleado!",
            error: error.message
        });
    }
};

exports.retrieveAllEmpleados = async (req, res) => {
    try {
        const empleadoInfos = await Empleado.findAll({
            where: { estado: 1 },
            include: [{
                model: Usuario, // Agregamos el modelo Usuario
                attributes: ['nombre_usuario'], // Solo queremos el nombre_usuario
            }],
        });
        res.status(200).json({
            message: "¡Empleados obtenidos exitosamente!",
            empleados: empleadoInfos
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error al obtener los empleados!",
            error: error
        });
    }
};

exports.getEmpleadoById = async (req, res) => {
    let empleadoId = req.params.id;
    try {
        const empleado = await Empleado.findByPk(empleadoId, {
            include: [{
                model: Usuario, // Agregamos el modelo Usuario
                attributes: ['nombre_usuario'], // Solo queremos el nombre_usuario
            }],
        });
        
        if (!empleado) {
            return res.status(404).json({
                message: "No se encontró el empleado con id = " + empleadoId,
                error: "404"
            });
        }
        
        res.status(200).json({
            message: "Empleado obtenido exitosamente con id = " + empleadoId,
            empleado: empleado
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error al obtener el empleado con id!",
            error: error
        });
    }
};

exports.updateById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            return res.status(404).json({
                message: "No se encontró el empleado para actualizar con id = " + empleadoId,
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                telefono: req.body.telefono,
                email: req.body.email,
                cargo: req.body.cargo,
                salario: req.body.salario,
                estado: req.body.estado,
                id_usuario: req.body.id_usuario // Aseguramos que se actualice el id_usuario
            };

            await Empleado.update(updatedObject, { where: { id_empleado: empleadoId } });

            const updatedEmpleado = await Empleado.findByPk(empleadoId, {
                include: [{
                    model: Usuario,
                    attributes: ['nombre_usuario'],
                }],
            });

            res.status(200).json({
                message: "Actualización exitosa del empleado con id = " + empleadoId,
                empleado: updatedEmpleado,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el empleado con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            return res.status(404).json({
                message: "No existe el empleado con id = " + empleadoId,
                error: "404",
            });
        } else {
            empleado.estado = 0;  
            await empleado.save();
            res.status(200).json({
                message: "El empleado con id = " + empleadoId + " ha sido desactivado.",
                empleado: empleado,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede desactivar el empleado con id = " + req.params.id,
            error: error.message,
        });
    }
};

exports.retrieveAllDesactivados = async (req, res) => {
    try {
        const empleadoInfos = await Empleado.findAll({
            where: { estado: 0 },
            include: [{
                model: Usuario,
                attributes: ['nombre_usuario'],
            }],
        });
        res.status(200).json({
            message: "¡Empleados desactivados obtenidos exitosamente!",
            empleados: empleadoInfos
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Error al obtener los empleados desactivados!",
            error: error
        });
    }
};

exports.reactivateById = async (req, res) => {
    try {
        let empleadoId = req.params.id;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            return res.status(404).json({
                message: "No existe el empleado con id = " + empleadoId,
                error: "404",
            });
        } else {
            empleado.estado = 1;  
            await empleado.save();  

            res.status(200).json({
                message: "Empleado reactivado exitosamente con id = " + empleadoId,
                empleado: empleado,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede reactivar el empleado con id = " + req.params.id,
            error: error.message,
        });
    }
};
