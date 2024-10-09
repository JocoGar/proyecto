module.exports = (sequelize, Sequelize) => {

    const tipoHabitacion = sequelize.define("tipohabitacion", {
        id_tipo_habitacion: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        precio_base: {
            type: Sequelize.FLOAT
        }
     }, {
         tableName: 'tipo_habitacion'

    });
    return tipoHabitacion;
};