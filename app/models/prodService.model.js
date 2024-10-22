module.exports = (sequelize, Sequelize) => { 
  const ProdService = sequelize.define("prodService", {
      id_producto_servicio: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
      },
      nombre: {
          type: Sequelize.STRING,
          allowNull: false
      },
      descripcion: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      precio: {
          type: Sequelize.FLOAT,
          allowNull: false
      },
      id_tipo_prodservice: {
          type: Sequelize.INTEGER,
          references: {
              model: 'tipo_prodservices',
              key: 'id_tipo_prodservice'
          }
      }
  }, {
      tableName: 'prod_services'
  });
  return ProdService;
};
  