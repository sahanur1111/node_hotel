const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const passport = require("./auth");



app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req. body
const PORT = process.env.PORT || 4000;

// MIDDLEWARE FUNCTION**********************
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}Request URL: ${req.originalUrl}]`
  );
  next(); //move to next middleware
};
app.use(logRequest); //passing middleware whole app



app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate("local", {
  session: false,
});
app.get("/",function (req, res) {
  // app.get("/",logRequest, function (req, res) {  //passing middleware = logRequest just single route
  res.send("Welcome to Hotel Management System");
});


// data base connected
db.connect();

//import the  router files

const personRoutes = require("./routes/personRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

//use the routers
app.use("/person",localAuthMiddleware, personRoutes);
app.use("/menu", menuItemRoutes);
// app.use("/menu",logRequest, menuItemRoutes); // passing middleware

app.listen(4000, () => {
  console.log("ssahanur alam kohinur parvin sonali sahil");
});

// i am sahanur
