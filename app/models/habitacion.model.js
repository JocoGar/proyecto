module.exports = (sequelize, Sequelize) => {
    const Habitacion = sequelize.define('habitacion', {
      id_habitacion: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      numero_habitacion: {
        type: Sequelize.STRING
      },
      id_tipo_habitacion: {
        type: Sequelize.INTEGER
      },
      capacidad: {
        type: Sequelize.INTEGER
      },
      precio_noche: {
        type: Sequelize.FLOAT
      },
      estado: {
        type: Sequelize.STRING
      }
    });
  
    return Habitacion;
  };
  