module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define("empleado", {
        id_empleado: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apellido: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telefono: {
            type: Sequelize.STRING,
            allowNull: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cargo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        salario: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        estado: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_usuario: { 
            type: Sequelize.INTEGER,
            allowNull: true, 
            references: {
                model: 'usuarios', 
                key: 'id_usuario' 
            }
        }
    }, {
        tableName: 'empleados'
    });
    return Empleado;
};
