module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        id_usuario: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_usuario: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rol: {
            type: Sequelize.STRING,
            allowNull: false
        },
        estado: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'usuarios'
    });
    return Usuario;
};
