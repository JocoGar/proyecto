module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define('empleado', {
      id_empleado: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      cargo: {
        type: Sequelize.STRING
      },
      salario: {
        type: Sequelize.FLOAT
      }
    });
  
    return Empleado;
  };
  