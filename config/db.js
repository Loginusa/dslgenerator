const sql = require('mssql')
const config = {
    user: 'esales',
    password: 'dbesales123##',
    database: 'dbesales_dev',
    server: 'esalesdev.enesis.com', //esalesdev.enesis.com
    port: 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL')
        return pool
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
    sql, poolPromise
}