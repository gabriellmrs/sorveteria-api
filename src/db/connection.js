import mysql from 'mysql2/promise'
const { DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE, DB_PORT } = process.env

let pool

export function connectToDataBase() {
    if (!pool) {
        pool = mysql.createPool({
            host: DB_SERVER,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_DATABASE,
            port: DB_PORT,
            waitForConnections: true,
            connectionLimit: 15, // número máximo de conexões simultâneas
            queueLimit: 0
        })
        console.log("POOL DE CONEXÕES CRIADO!")
    }
    return pool
}
