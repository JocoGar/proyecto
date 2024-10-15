const db = require('../config/db.config.js');
const Empleado = db.Empleado;

// Crear un nuevo empleado
exports.create = (req, res) => {
    let empleado = {};

    try {
        empleado.nombre = req.body.nombre;
        empleado.apellido = req.body.apellido;
        empleado.telefono = req.body.telefono;
        empleado.email = req.body.email;
        empleado.cargo = req.body.cargo;
        empleado.salario = req.body.salario;

        Empleado.create(empleado).then(result => {
            res.status(200).json({
                message: "Empleado creado exitosamente con id = " + result.id_empleado,
                empleado: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el empleado!",
            error: error.message
        });
    }
};

// Obtener todos los empleados
exports.retrieveAllEmpleados = (req, res) => {
    Empleado.findAll()
        .then(empleadoInfos => {
            res.status(200).json({
                message: "¡Empleados obtenidos exitosamente!",
                empleados: empleadoInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener los empleados!",
                error: error
            });
        });
};

// Obtener un empleado por ID
exports.getEmpleadoById = (req, res) => {
    let empleadoId = req.params.id_empleado;
    Empleado.findByPk(empleadoId)
        .then(empleado => {
            res.status(200).json({
                message: "Empleado obtenido exitosamente con id = " + empleadoId,
                empleado: empleado
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "¡Error al obtener empleado con id!",
                error: error
            });
        });
};

// Actualizar un empleado por ID
exports.updateById = async (req, res) => {
    try {
        let empleadoId = req.params.id_empleado;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "No se encontró el empleado para actualizar con id = " + empleadoId,
                empleado: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                telefono: req.body.telefono,
                email: req.body.email,
                cargo: req.body.cargo,
                salario: req.body.salario
            };
            let result = await Empleado.update(updatedObject, { returning: true, where: { id_empleado: empleadoId } });

            if (!result) {
                res.status(500).json({
                    message: "No se puede actualizar el empleado con id = " + req.params.id_empleado,
                    error: "No se pudo actualizar el empleado",
                });
            }

            res.status(200).json({
                message: "Actualización exitosa del empleado con id = " + empleadoId,
                empleado: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el empleado con id = " + req.params.id_empleado,
            error: error.message
        });
    }
};

// Eliminar un empleado por ID
exports.deleteById = async (req, res) => {
    try {
        let empleadoId = req.params.id_empleado;
        let empleado = await Empleado.findByPk(empleadoId);

        if (!empleado) {
            res.status(404).json({
                message: "No existe el empleado con id = " + empleadoId,
                error: "404",
            });
        } else {
            await empleado.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del empleado con id = " + empleadoId,
                empleado: empleado,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar el empleado con id = " + req.params.id_empleado,
            error: error.message,
        });
    }
};
