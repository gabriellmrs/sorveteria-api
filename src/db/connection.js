import mysql from 'mysql2/promise'
const {DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE, DB_PORT} = process.env

export async function connectToDataBase() {
    try {
    const conexao = await mysql.createConnection({
        host:DB_SERVER,
        password:DB_PASSWORD,
        database:DB_DATABASE,
        user:DB_USER,
        port: DB_PORT
    })
    console.log('CONEXÂO FEITA COM SUCESSO!!!')
    return conexao
}
catch(err){
    console.log(`NÃO FOI POSSIVEL SE CONECTAR AO BANCO ${err}`)
}
}
connectToDataBase()