module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define('cliente', {
      id_cliente: {
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
      direccion: {
        type: Sequelize.STRING
      }
    });
  
    return Cliente;
  };
  