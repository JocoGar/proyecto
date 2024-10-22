const env={
    host: 'dpg-csasb8l6l47c73f3b4t0-a.oregon-postgres.render.com',
    port: 5432,
    username: 'dbproyecto_10867_user',
    password: 'uiFoyt1q132hkerBO1JWtf9OgqEMgv9O',
    database: 'dbproyecto_10867',
  dialect: 'postgres',
  
  pool:{
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    
  }
  }
  module.exports =env;