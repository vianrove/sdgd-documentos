 const { config } = require("dotenv");

config()

const userdb = process.env.user || 'root'
const password_db = process.env.password || ''
const database = process.env.database || ''
const portdb = process.env.db_port || 3306
const host = process.env.host || ''

module.exports = { userdb,password_db, database, portdb, host } 
