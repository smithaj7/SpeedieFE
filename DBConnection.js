const sql = require("mssql");

// Create connection to database
const config = {
  server: 'speedieserver.database.windows.net',
  database: 'SpeedieData',
  user: 'speediebean',
  password: 'Spacejam123',

  options: {
      encrypt: true
      
  }
}


const poolPromise = new sql.ConnectionPool(config)
.connect()
.then(pool=> {
    return pool;
})
.catch(err=> {
    console.log(err)
})

module.exports = {
    poolPromise
};
