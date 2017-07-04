const express = require("express");
const entryRoutes = express.Router();
const models = require("../models");



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
    res.redirect("home");
})


module.exports = entryRoutes;