// implement your API here

const express = require('express');
// const {check, validationResult } = require('express-validator/check');
const db = require('./data/db.js');
const port = 3333;

const server = express();
server.use(express.json());

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    if (bio === undefined || name === undefined ||
        bio === "" || name === "")
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });

    console.log({
        name: name,
        bio: bio,
    });
    db.insert({
        name: name,
        bio: bio
    })
        .then((user) => {
            res.status(201).json({ 'success': true, user: user })
        })
        .catch(() => {
            res.status(500).json({ error : "There was an error while saving the user to the database"  });
        });

});

server.get('/api/users', [], (req, res) => {
    db.find()
        .then((data) => {
            res.status(404).json({ 'success': true, users: data })
        })
        .catch(() => {
            res.status(500).json({ error: "The users information could not be retrieved." });
        });
});

server.get('/api/users/:id', [], (req, res) => {
    const { id } = req.params;
    console.log(id);
    db.findById(id)
        .then((data) => {
            if (typeof data)
                res.status(200).json({ 'success': true, user: data });
            else
                res.status(403).json({ 'success': false, user: data });
        })
        .catch(() => {
            res.status(500).json({ 'success': false });
        });
});

server.delete('/api/users/:id', [], (req, res) => {
    const { id } = req.params;
    db.findById(id).then((condemnedUser) => {
        const usr = condemnedUser;
        db.remove(id)
            .then((data) => {
                if (typeof data && data == true && usr) {
                    res.status(200).json({ 'success': true, user: usr });
                }
                else {
                    res.status(403).json({ 'success': false });
                }
            })
    })
        .catch(() => {
            res.status(500).json({ 'success': false });
        });
});

server.put('/api/users/:id', [], (req, res) => {
    const obj = { ...req.body }
    console.log(obj);
    const { id } = req.params;
    console.log(id);
    db.findById(id).then((user) => {
        db.update(id, obj).then((data) => {
            x = {}
            if (typeof data && data == true) {
                const updateUser = { ...user, ...obj };
                res.status(200).json({ 'success': true, user: { ...updateUser } });
            }
            else {
                res.status(403).json({ 'success': false });
            }
        })
    })
        .catch(() => {
            res.status(500).json({ 'success': false });
        });
});
server.listen(port, () => {
    console.log(`I am listening on part ${port}`);
});