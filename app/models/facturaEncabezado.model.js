module.exports = (sequelize, Sequelize) => {

    const facturaEncabezado = sequelize.define("facturaencabezado", {
        id_factura_encabezado: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fecha: {
            type: Sequelize.DATE
        },
        id_cliente: {
            type: Sequelize.INTEGER
        },
        nombre_cliente: {
            type: Sequelize.STRING
        },
        total: {
            type: Sequelize.FLOAT
        }
     }, {
         tableName: 'factura_encabezado'

    });
    return facturaEncabezado;
};