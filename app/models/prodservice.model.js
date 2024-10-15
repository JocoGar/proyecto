module.exports = (sequelize, Sequelize) => {
    const ProdService = sequelize.define('prodService', {
      id_producto_servicio: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      precio: {
        type: Sequelize.FLOAT
      },
      tipo: {
        type: Sequelize.STRING
      }
    });
  
    return ProdService;
  };
  