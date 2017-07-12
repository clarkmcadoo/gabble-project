const express = require("express");
const entryRoutes = express.Router();
const models = require("../models");
const session = require("express-session");
const sessionConfig = require("../sessionConfig");
const checkAuth = require("../checkAuth");


entryRoutes.use(session(sessionConfig));

// const sessionConfig = require("../sessionConfig");
// const session = ("../express-session");

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

entryRoutes.get("/gab/:id", checkAuth, (req, res) =>{
    models.message
    .findOne({
        where: {id: req.params.id},
        include: {
            model: models.user,
            as: "author"
        }
    }).then(function(specificMessage){
        var authority = false;
        // console.log("This is the author:", specificMessage.authorid, req.session.user.id);
        if (specificMessage.authorid === req.session.user.id){
            authority = true;
        }
        res.render("gab", {messages: specificMessage, name: req.session.user.name, delete: authority})
    });
});



entryRoutes.get("/home", checkAuth, function(req, res){
  var authority = true;
    
  models.message
    .findAll({
      include: 
        {
          model: models.user,
          as: "author"
        }
    })
    .then(function(foundMessages) {
      res.render("home", {messages: foundMessages, name: req.session.user.name});
    });

});

entryRoutes.get("/creategab", checkAuth, (req, res) => {
    res.render("creategab");
})

entryRoutes.get("/logoff", (req, res)=> {
    req.session.destroy();
    res.redirect("/");
})


entryRoutes.post("/signup", function(req, res){
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


    models.user.findOne({where:
    {username: incomingUser.username}})
    .then(function (visitingUser) {
        if(visitingUser.username === incomingUser.username && visitingUser.password === incomingUser.password){
            req.session.user = visitingUser;  
    
            return res.redirect("home");
        }else{
            res.redirect("/");
        }
})
})

entryRoutes.post("/creategab", (req, res) =>{
    var  newMessage = req.body.gab;
    var newGab = models.message.build({content: newMessage, authorid: req.session.user.id});
    newGab.save().then(function(savedMessage){})
    .catch(function(err){res.status(500).send(err);});


    res.redirect("home");

})

entryRoutes.post("/like", (req, res)=>{
    // console.log("This is from the like click:",req.body.likeclick, "liker:", req.session.user.id);

    var newLike = models.like.build({content: true, likerid: req.session.user.id, messageid: req.body.likeclick});
    newLike.save().then(function(savedLike){
        return res.redirect("home");        
    })
    .catch(function(err){res.status(500).send(err);})


})

entryRoutes.post("/delete", (req, res)=>{
    // console.log("this works:",req.body.id);

    models.message.destroy({where:{id: req.body.id}}).then(()=>{
        return res.redirect("home");
    }).catch(err=>{
        res.send("Error");
    })
})



module.exports = entryRoutes;