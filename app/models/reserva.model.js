module.exports = (sequelize, Sequelize) => {
    const Reserva = sequelize.define("reserva", {
        id_reserva: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        check_in: {
            type: Sequelize.DATE,
            allowNull: false
        },
        check_out: {
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
        id_habitacion: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'habitaciones',
                key: 'id_habitacion'
            }
        },
        estado: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'reservas'
    });
    return Reserva;
};
