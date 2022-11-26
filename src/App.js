const {insert, read, update, dbDelete, readSpecific, readSpecific2} = require('./db.js')
const express = require('express');
const { config } =  require('dotenv')
const cors = require('cors')
config()
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());

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

app.get('/catalogo/search/isbn',(req,res)=>{
    if(req.body.ISBN == null){
        res.status(404).json({"message":"Not found"});
    }else{
        readSpecific2(req.body.ISBN,(result)=>{
            if(result.length == 0){
                res.status(404).json({"message":"Not found"})
            }
            res.json(result)
        })
    }   
})

app.get('/catalogo/search/type',(req,res)=>{
    if(req.body.type == null){
        res.status(404).json({"message":"Not found"});
    }else{
        readSpecific(req.body.type,(result)=>{
            if(result.length == 0 ){
                res.status(404).json({"message":"Not found"})
            }
            res.json(result)
        })
    }  
})

app.post('/Add',(req, res)=>{
    if(req == null){
        res.status(404).json({"message":"Not found"});
    }else{
       insert(req.body, (result)=>res.json(result))
    }
})



app.put('/update',(req,res)=>{
    if(req.body.ISBN == null){
        res.status(404).json({"message":"Not found"});
    }else{
        update(req.body, (result)=>res.status(200).json(result))
    }
})



app.delete('/delete/:id',(req,res)=>{
    /*if(req.body.ISBN == null){
        res.status(404).json({"message":"Not found"});
    }else{*/
       dbDelete(parseInt(req.params.id), (result)=>res.json(result))
    //}
})

app.use((req,res)=>{
    res.status(404).send({"status":"Error 404"}) 
})

app.listen(PORT,()=>console.log(`Express iniciado en el puerto ... ${PORT}`));