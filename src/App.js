const {insert, read, update, dbDelete} = require('./db')
const express = require('express');

const app = express();
const port = 8000;

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('\tBienvenido a Libreria (API) ')
})

app.get('/catalogo',(req,res)=>{
    read((result)=>{
        if(result.length == 0){
            res.status(500).json({"status":"error interno"})
        }
        res.json(result)
    })
})

app.post('/Add',(req, res)=>{
    insert(req.body, (result)=>res.json(result))
})



app.put('/update',(req,res)=>{
    update(req.body, (result)=>res.status(200).json(result))
})



app.delete('/delete',(req,res)=>{
    dbDelete(req.body.ISBN, (result)=>res.json(result))
})

app.use((req,res)=>{
    res.status(404).send({"status":"Error 404"}) 
})

app.listen(port,()=>console.log(`Express iniciado en el puerto ${port}...`));
