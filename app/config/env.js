const env={
    host: 'dpg-crq2120gph6c73a5t1k0-a.oregon-postgres.render.com',
    port: 5432,
    username: 'dbparcial_10867_user',
    password: '19H16uC6HcTdaaDvOw8KdUcZH3LPawFn',
    database: 'dbparcial_10867',
  dialect: 'postgres',
  
  pool:{
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    
  }
  }
  module.exports =env;