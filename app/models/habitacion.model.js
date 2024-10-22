module.exports = (sequelize, Sequelize) => {
    const Habitacion = sequelize.define("habitacion", {
        id_habitacion: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        numero_habitacion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        id_tipo_habitacion: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'tipo_habitaciones',
                key: 'id_tipo_habitacion'
            }
        },
        camas:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        sanitario:{
            type: Sequelize.STRING,
            defaultValue: false
        },
        precio_noche: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        estado: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'habitaciones'
    });
    return Habitacion;
};
