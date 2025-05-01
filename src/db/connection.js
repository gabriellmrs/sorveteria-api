import mysql from 'mysql2/promise'
const {DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE} = process.env

export async function connectToDataBase() {
    try {
    const conexao = await mysql.createConnection({
        host:DB_SERVER,
        password:DB_PASSWORD,
        database:DB_DATABASE,
        user:DB_USER
    })
    console.log('CONEXÂO FEITA COM SUCESSO!!!')
    return conexao
}
catch(err){
    console.log(`NÃO FOI POSSIVEL SE CONECTAR AO BANCO ${err}`)
}
}
connectToDataBase()