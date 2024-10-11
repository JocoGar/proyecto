module.exports = (sequelize, Sequelize) => {

    const usuario = sequelize.define("usuario", {
        id_usuario: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_usuario: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        rol: {
            type: Sequelize.STRING
        }
     }, {
         tableName: 'usuario'

    });
    return usuario;
};