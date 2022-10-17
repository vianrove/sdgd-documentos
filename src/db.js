const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password:"2001",
    database: "GestionDocumental"
});

connection.connect((err)=>{
    if(err) throw err;
    console.log("Connect to Database")
});

//metodos :

function insert( data, callback){
    let insertQuery = `INSERT INTO Users values (0,'${data.name}','${data.lastName}','${data.email}',${data.Password},'${data.direccion}',${data.phoneNumber},${data.suscrito})`;
    connection.query(insertQuery, (err, result)=>{
        if(err) throw err;
        callback(result);
        connection.end(); 
    });
}
//Consulta y devuelve listado de documentos
function read(callback){
    let readQuery = `select * from documents`;
    connection.query(readQuery, (err, result)=>{
        if(err) throw err;
        callback(result);
        connection.end();  
    });
}

//Acutaliza Usuario del estado de su Suscripcion true o false
function update( data, callback){
    let UpdateQuery = `UPDATE Users SET suscrito = ${data.suscrito} where id = ${data.id}`;
    connection.query(UpdateQuery, (err, result)=>{
        if(err) throw err;
        callback(result); 
        connection.end(); 
    })
}
// elimina documentos
function dbDelete(data, callback){
    let deleteQuery = `DELETE FROM Users where id = ${data}`;
    connection.query(deleteQuery,(err, result)=>{
        if(err) throw err;
        callback(result); 
        connection.end();
    });
}

module.exports = {insert, read, update, dbDelete }