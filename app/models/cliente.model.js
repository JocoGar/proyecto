module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
        id_cliente: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apellido: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telefono: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        direccion: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: 'clientes'
    });
    return Cliente;
};
