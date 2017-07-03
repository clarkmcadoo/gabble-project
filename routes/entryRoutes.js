const express = require("express");
const entryRoutes = express.Router();
const models = require("../models");



entryRoutes.get("/", function(req, res){
    res.render("index");
})

entryRoutes.get("/signup", function(req, res){
    res.render("signup");
})


// app.post("/addTodo", function(require, response) {
//   //selector for the add task input box value
//   var newTodo = require.body.todo;
//   //check if a value is entered in input box
//   if (newTodo.length != 0) {
//       console.log('item was not undefined'+ newTodo);
//     //create a new todo list item  
//     var newItem = models.todo.build({ item: newTodo, completed: false });
//     newItem.save().then(function(savedTodo) {}).catch(function(err) {
//       response.status(500).send(err);
//     });

entryRoutes.post("/newUser", function(req, res){
    var newUser = req.body;
    
    var newUserAccount = models.user.build({name: newUser.displayname, username: newUser.username, password: newUser.password});

    newUserAccount.save().then(function(savedAccount){})
    .catch(function(err){res.status(500).send(err);});

    res.redirect("/");
})


module.exports = entryRoutes;