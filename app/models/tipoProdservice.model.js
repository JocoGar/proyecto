module.exports = (sequelize, Sequelize) => {

    const tipoProdservice = sequelize.define("tipoprodservice", {
        id_tipo_prodservice: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_servicio: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        precio: {
            type: Sequelize.FLOAT
        }
     }, {
         tableName: 'tipo_prod_services'

    });
    return tipoProdservice;
};