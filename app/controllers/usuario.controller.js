const db = require('../config/db.config.js');
const Usuario = db.usuario;

exports.create = (req, res) => {
    let usuario = {};

    try {
        usuario.nombre_usuario = req.body.nombre_usuario;
        usuario.email = req.body.email;
        usuario.password = req.body.password;
        usuario.rol = req.body.rol;
        usuario.estado = req.body.estado;

        Usuario.create(usuario).then(result => {
            res.status(200).json({
                message: "Usuario creado exitosamente con id = " + result.id_usuario,
                usuario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el usuario!",
            error: error.message
        });
    }
};

exports.retrieveAllUsuarios = (req, res) => {
    Usuario.findAll({ where: { estado: 1 } })
        .then(usuarios => {
            res.status(200).json({
                message: "¡Usuarios obtenidos exitosamente!",
                usuarios: usuarios
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener los usuarios!",
                error: error
            });
        });
};

exports.getUsuarioById = (req, res) => {
    let usuarioId = req.params.id;
    Usuario.findByPk(usuarioId)
        .then(usuario => {
            if (!usuario) {
                return res.status(404).json({
                    message: "Usuario no encontrado con id = " + usuarioId
                });
            }
            res.status(200).json({
                message: "Usuario obtenido exitosamente con id = " + usuarioId,
                usuario: usuario
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener el usuario con id!",
                error: error
            });
        });
};

exports.updateById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No se encontró el usuario para actualizar con id = " + usuarioId,
                usuario: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre_usuario: req.body.nombre_usuario,
                email: req.body.email,
                password: req.body.password,
                rol: req.body.rol,
                estado: req.body.estado
            };

            await Usuario.update(updatedObject, { returning: true, where: { id_usuario: usuarioId } });

            res.status(200).json({
                message: "Actualización exitosa de un usuario con id = " + usuarioId,
                usuario: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el usuario con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => { 
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No existe el usuario con id = " + usuarioId,
                error: "404",
            });
        } else {
            usuario.estado = 0; 
            await usuario.save();

            res.status(200).json({
                message: "Usuario desactivado exitosamente con id = " + usuarioId,
                usuario: usuario, 
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede desactivar el usuario con id = " + req.params.id,
            error: error.message,
        });
    }
};

exports.retrieveAllUsuariosDesactivados = (req, res) => {
    Usuario.findAll({ where: { estado: 0 } })
        .then(usuarios => {
            res.status(200).json({
                message: "¡Usuarios desactivados obtenidos exitosamente!",
                usuarios: usuarios
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener los usuarios desactivados!",
                error: error
            });
        });
};

exports.reactivarUsuario = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No existe el usuario con id = " + usuarioId,
                error: "404",
            });
        } else {
            usuario.estado = 1;
            await usuario.save();

            res.status(200).json({
                message: "Usuario reactivado exitosamente con id = " + usuarioId,
                usuario: usuario, 
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede reactivar el usuario con id = " + req.params.id,
            error: error.message,
        });
    }
};
