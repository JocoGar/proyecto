module.exports = (sequelize, Sequelize) => {
    const FacturaEncabezado = sequelize.define("facturaEncabezado", {
        id_factura_encabezado: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull: false
        },
        id_cliente: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'clientes',
                key: 'id_cliente'
            }
        },
        total: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    }, {
        tableName: 'factura_encabezado'
    });
    return FacturaEncabezado;
};
