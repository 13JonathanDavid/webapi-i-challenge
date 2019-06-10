// implement your API here

const express = require('express');
// const {check, validationResult } = require('express-validator/check');
const db = require('./data/db.js');
const port = 3333;

const server = express();
server.use(express.json());

server.post('/api/users',[], (req,res)=> {
    const {name, bio} = req.body;
    console.log({
        name : name,
        bio : bio,
    })
    db.insert({
        name : name,
        bio : bio})
    .then( () => { 
        res.status(200).json({'success':true})})
    .catch(() => { 
        res.status(500).json({'success':false});
    });
}
);

server.get('/api/users',[], (req,res)=> {
       db.find()
    .then( (data) => { 
        res.status(200).json({'success':true, users: data})})
    .catch(() => { 
        res.status(500).json({'success':false});
    });
});

server.get('/api/users/:id',[], (req,res)=> {
    const {id} = req.params;
    console.log(id);
    db.findById(id)
 .then( (data) => {
     if (typeof data && data.length >= 1)
        res.status(200).json({'success':true, user: data});
    else  
        res.status(403).json({'success':false, user: data});
 })
 .catch(() => { 
     res.status(500).json({'success':false});
 });
});



server.listen(port,()=>{
    console.log(`I am listening on part ${port}`);
});