const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();
const port = process.env.PORT || 9999;
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const entryRoutes = require("./routes/entryRoutes");
const sessionConfig = require("./sessionConfig");
const session = require("express-session");
// const models = require("./models");

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use("/", express.static("public"));
app.use(session(sessionConfig));

app.use("/", entryRoutes);

// app.get("/", function(req, res){
//     res.render("index");
// })


app.listen(port, function(){
    console.log("You are running Gabble on port:", port);
})