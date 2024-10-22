module.exports = (sequelize, Sequelize) => {
    const TipoHabitacion = sequelize.define("tipoHabitacion", {
        id_tipo_habitacion: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        capacidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'tipo_habitaciones'
    });
    return TipoHabitacion;
};
