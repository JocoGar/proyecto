module.exports = (sequelize, Sequelize) => {
    const FacturaDetalle = sequelize.define("facturaDetalle", {
        id_factura_detalle: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_factura_encabezado: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'factura_encabezado',
                key: 'id_factura_encabezado'
            }
        },
        id_reserva: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'reservas',
                key: 'id_reserva'
            }
        },
        id_producto_servicio: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'prod_services',
                key: 'id_producto_servicio'
            }
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        precio_unitario: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    }, {
        tableName: 'factura_detalle'
    });
    return FacturaDetalle;
};