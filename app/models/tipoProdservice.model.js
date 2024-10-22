module.exports = (sequelize, Sequelize) => {
    const TipoProdService = sequelize.define("tipoProdService", {
        id_tipo_prodservice: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_tipo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: 'tipo_prodservices'
    });
    return TipoProdService;
};
