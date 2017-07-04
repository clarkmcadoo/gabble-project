const express = require("express");
const entryRoutes = express.Router();
const models = require("../models");
const sessionConfig = require("../sessionConfig");
const session = ("../express-session");

// entryRoutes.use(session(sessionConfig));

entryRoutes.get("/", function(req, res){
    res.render("index");
})

entryRoutes.get("/signup", function(req, res){
    res.render("signup");
})

entryRoutes.get("/login", function(req, res){
    res.render("login");
})

entryRoutes.get("/home", function(req, res){
    res.render("home");
})

entryRoutes.post("/newUser", function(req, res){
    var newUser = req.body;
    
    var newUserAccount = models.user.build({name: newUser.displayname, username: newUser.username, password: newUser.password});

    newUserAccount.save().then(function(savedAccount){})
    .catch(function(err){res.status(500).send(err);});

    res.redirect("/");
})

entryRoutes.post("/login", function(req, res){
    if(!req.body || !req.body.username || !req.body.password){
        return res.redirect("login");
    }

    var incomingUser = req.body;
    console.log("incoming user",incomingUser);

    models.user.findOne({where:
    {username: incomingUser.username}})
    .then(function (user) {
        if(user.username === incomingUser.username && user.password === incomingUser.password){
            return res.redirect("home");
            // sessionConfig.user = user;  
        }else{
            res.redirect("/");
        }
})

})


module.exports = entryRoutes;