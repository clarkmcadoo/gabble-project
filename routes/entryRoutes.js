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

entryRoutes.get("/", function(req, res) {
  res.render("index");
});

entryRoutes.get("/signup", function(req, res) {
  res.render("signup");
});

entryRoutes.get("/login", function(req, res) {
  res.render("login");
});

entryRoutes.get("/gab/:id", checkAuth, (req, res) => {
  var deleteAuthority;

  models.message
    .findOne({
    //   where: { id: req.params.id },
    //   include: [{
    //     model: models.user,
    //     as: "author"
    //   },{
    //     model: models.like,
    //     as: "liked",
    //     // as: "likes",
    //     // include: {model: models.user, as: "liker"}
    //   }]
      
    // })
      where: { id: req.params.id },
      include: [{
        model: models.user,
        as: "author"
      },
        {
          model: models.like,
          as: "liked",
          include: { model: models.user, as: "liker" }
        }
      ]
    })
    .then(function(specificMessage) {

      
      if (specificMessage.authorid === req.session.user.id) {
        deleteAuthority = true;
      }
      // console.log("This is the specificMessage:",specificMessage.liked[0].liker.name);
        var listOfLikers = [];
        for (i=0; i<specificMessage.liked.length; i++){
          listOfLikers.push(specificMessage.liked[i].liker.name);
      }
      console.log(listOfLikers);
      
          res.render("gab", {
            messages: specificMessage,
            name: req.session.user.name,
            delete: deleteAuthority,
            likes: specificMessage.liked.length,
            likers: listOfLikers
          });
    });
});

entryRoutes.get("/home", checkAuth, function(req, res) {
  var authority = true;

  models.message
    .findAll({
      include: {
        model: models.user,
        as: "author"
      }
    })
    .then(function(foundMessages) {
      res.render("home", {
        messages: foundMessages,
        name: req.session.user.name
      });
    });
});

entryRoutes.get("/creategab", checkAuth, (req, res) => {
  res.render("creategab");
});

entryRoutes.get("/logoff", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

entryRoutes.post("/signup", function(req, res) {
  var newUser = req.body;

  var newUserAccount = models.user.build({
    name: newUser.displayname,
    username: newUser.username,
    password: newUser.password
  });

  newUserAccount.save().then(function(savedAccount) {}).catch(function(err) {
    res.status(500).send(err);
  });

  res.redirect("/");
});

entryRoutes.post("/login", function(req, res) {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.redirect("login");
  }

  var incomingUser = req.body;

  models.user
    .findOne({
      where: { username: incomingUser.username }
    })
    .then(function(visitingUser) {
      if (
        visitingUser.username === incomingUser.username &&
        visitingUser.password === incomingUser.password
      ) {
        req.session.user = visitingUser;

        return res.redirect("home");
      } else {
        res.redirect("/");
      }
    });
});

entryRoutes.post("/creategab", (req, res) => {
  var newMessage = req.body.gab;
  var newGab = models.message.build({
    content: newMessage,
    authorid: req.session.user.id
  });
  newGab.save().then(function(savedMessage) {}).catch(function(err) {
    res.status(500).send(err);
  });

  res.redirect("home");
});

entryRoutes.post("/like", (req, res) => {


  var newLike = models.like.build({
      content: true,
    likerid: req.session.user.id,
    messageid: req.body.likeclick
  });
  newLike
    .save()
    .then(function(savedLike) {
      console.log("NEW LIKE CREATED!!!!")
      return res.redirect("home");
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

entryRoutes.post("/delete", (req, res) => {

models.like.destroy({ where: {messageid: req.body.messageid}}).then(()=>{
  models.message
    .destroy({ where: { id: req.body.messageid } })
    .then(() => {
      return res.redirect("home");
    })
    .catch(err => {
      res.send("Error from /delete route.");
    });
})
});

module.exports = entryRoutes;
