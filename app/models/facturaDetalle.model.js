module.exports = (sequelize, Sequelize) => {

    const facturaDetalle = sequelize.define("facturadetalle", {
        id_factura_detalle: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_factura_encabezado: {
            type: Sequelize.INTEGER
        },
        producto: {
            type: Sequelize.STRING
        },
        servicio: {
            type: Sequelize.STRING
        },
        precio_unitario: {
            type: Sequelize.FLOAT
        },
        cantidad: {
            type: Sequelize.INTEGER
        }
     }, {
         tableName: 'factura_detalle'

    });
    return facturaDetalle;
};