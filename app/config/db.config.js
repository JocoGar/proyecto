const env = require('./env.js');
const Sequelize = require('sequelize'); 
const { pool } = env; 

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    operatorAliases: false, 
    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle,
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize; 

db.tipoHabitacion = require('../models/tipoHabitacion.model.js')(sequelize, Sequelize);
db.tipoProdservice= require('../models/tipoProdservice.model.js')(sequelize, Sequelize);
db.facturaEncabezado= require('../models/facturaEncabezado.model.js')(sequelize, Sequelize);
db.facturaDetalle= require('../models/facturaDetalle.model.js')(sequelize, Sequelize);
db.usuario= require('../models/usuario.model.js')(sequelize, Sequelize);



db.cliente = require('../models/cliente.model.js')(sequelize, Sequelize);
db.reserva = require('../models/reserva.model.js')(sequelize, Sequelize);
db.habitacion = require('../models/habitacion.model.js')(sequelize, Sequelize);
db.empleado = require('../models/empleado.model.js')(sequelize, Sequelize);
db.prodService = require('../models/prodService.model.js')(sequelize, Sequelize);





// Reservas con Clientes y Habitaciones
db.reserva.belongsTo(db.cliente, { foreignKey: 'id_cliente' });
db.reserva.belongsTo(db.habitacion, { foreignKey: 'id_habitacion' });
db.cliente.hasMany(db.reserva, { foreignKey: 'id_cliente' });
db.habitacion.hasMany(db.reserva, { foreignKey: 'id_habitacion' });

// FacturaDetalle con FacturaEncabezado y ProdServices
db.facturaDetalle.belongsTo(db.facturaEncabezado, { foreignKey: 'id_factura_encabezado' });
db.facturaDetalle.belongsTo(db.prodService, { foreignKey: 'id_producto_servicio' });
db.facturaEncabezado.hasMany(db.facturaDetalle, { foreignKey: 'id_factura_encabezado' });
db.prodService.hasMany(db.facturaDetalle, { foreignKey: 'id_producto_servicio' });

// FacturaDetalle con Reserva
db.facturaDetalle.belongsTo(db.reserva, { foreignKey: 'id_reserva' });
db.reserva.hasMany(db.facturaDetalle, { foreignKey: 'id_reserva' });


// FacturaEncabezado con Clientes
db.facturaEncabezado.belongsTo(db.cliente, { foreignKey: 'id_cliente' });
db.cliente.hasMany(db.facturaEncabezado, { foreignKey: 'id_cliente' });

// Habitaciones con TipoHabitaciones
db.habitacion.belongsTo(db.tipoHabitacion, { foreignKey: 'id_tipo_habitacion' });
db.tipoHabitacion.hasMany(db.habitacion, { foreignKey: 'id_tipo_habitacion' });

// ProdServices con TipoProdServices
db.prodService.belongsTo(db.tipoProdservice, { foreignKey: 'id_tipo_prodservice' });
db.tipoProdservice.hasMany(db.prodService, { foreignKey: 'id_tipo_prodservice' });

// Empleados con Usuarios
db.empleado.belongsTo(db.usuario, { foreignKey: 'id_usuario' });
db.usuario.hasMany(db.empleado, { foreignKey: 'id_usuario' });


module.exports = db;