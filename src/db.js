const mysql2 = require('mysql2');

const { userdb, password_db, database, host, portdb } = require('./config')

const connection = mysql2.createConnection({
    host: host,
    user: userdb,
    password:password_db,
    database: database,
    port: portdb
});

connection.connect((err)=>{
    if(err) throw err;
    console.log("Connect to Database")
});

//metodos :

function insert(data, callback){
    let insertQuery = `INSERT INTO documents values (0,"${data.Title}",${data.muestra},${data.venta},${data.precio},"${data.img1}","${data.img2}");`;
    connection.query(insertQuery, (err, result)=>{
        if(err) throw err;
        callback(result);
        //connection.end(); 
    });
}
//Consulta y devuelve listado de documentos
function read(callback){
    let readQuery = `select * from documents`;
    connection.query(readQuery, (err, result)=>{
        if(err) throw err;
        callback(result);
        //connection.end();  
    });
}

function readSpecific(data, callback){
    let SpecificQuery = `select  documents.ISBN, documents.Title, tipo.TypeDocument from documents, tipo where tipo.TypeDocument = '${data}' and tipo.fk_ISBN = documents.ISBN; `;
    connection.query(SpecificQuery, (err, result)=>{
        if(err) throw err;
        callback(result);
        //connection.end();
    })
}

function readSpecific2(data, callback){
    let SpecificQuery = `select * from documents where ISBN = '${data}'; `;
    connection.query(SpecificQuery, (err, result)=>{
        if(err) throw err;
        callback(result);
        //connection.end();
    })
}


function update(data, callback){
    let UpdateQuery = `UPDATE documents SET muestra = ${data.muestra}, venta=${data.venta}, precio=${data.precio} where ISBN = ${data.ISBN}`;
    connection.query(UpdateQuery, (err, result)=>{
        if(err) throw err;
        callback(result); 
        //connection.end(); 
    })
}
// elimina documentos
function dbDelete(data, callback){
    let deleteQuery = `DELETE FROM documents where ISBN = ${data}`;
    connection.query(deleteQuery,(err, result)=>{
        if(err) throw err;
        callback(result); 
        //connection.end();
    });
}

module.exports = {insert, read, update, dbDelete, readSpecific, readSpecific2 }
