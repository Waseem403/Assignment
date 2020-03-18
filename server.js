const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const flash = require('connect-flash');
const session = require('express-session');



//Init express app
const app = express();


// Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


//setting the view engine
app.use(expressLayouts);
app.set("view engine", "ejs");


//Db config
const db = require("./confiq/keys").MongoURI;

//Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true,useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Connect flash
app.use(flash());


// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
  
// Use Routes
app.use("/",require("./Routes/addsalary"))
app.use("/salary",require("./Routes/searchsalary"))

app.use(function (req, res, next) {
  res.status(404).render("404");
});



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));