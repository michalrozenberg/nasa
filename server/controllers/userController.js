const User = require('../models/userModel')
const jwt = require('jsonwebtoken');

const create = (req, res) => {
    console.log(req.body);
    const add = new User(req.body)
    add.save().then(user => {
        let token = jwt.sign({ email: req.body.email, password: req.body.password }, process.env.SECREET)
        console.log(`user${user}`);
        res.status(201).json({ "messege": "Successfully", user, token });
    }).catch(e => { console.log(e); res.status(500).send(e) })
}
const login = (req, res) => {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }).then(user => {
        if (user) {
            let token = jwt.sign({ email: req.body.email, password: req.body.password }, process.env.SECREET)
            console.log(token);
            console.log(user);
            res.status(200).json({ "messege": "Successfully", user, token });
        }
        else {
            res.status(404).send("The user is undefined")
            console.log('the user undifind');
        }
    }).catch(e => { res.status(500).send(`Error....: ${e}`) })
}


module.exports = {create, login}