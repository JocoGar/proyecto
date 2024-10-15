module.exports = (sequelize, Sequelize) => {
    const Reserva = sequelize.define('reserva', {
      id_reserva: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      fecha_reserva: {
        type: Sequelize.DATE
      },
      hora_reserva: {
        type: Sequelize.TIME
      },
      id_cliente: {
        type: Sequelize.INTEGER
      },
      id_habitacion: {
        type: Sequelize.INTEGER
      },
      id_empleado: {
        type: Sequelize.INTEGER
      },
      estado: {
        type: Sequelize.STRING
      }
    });
  
    return Reserva;
  };
  