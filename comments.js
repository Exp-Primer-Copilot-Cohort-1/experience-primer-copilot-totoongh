//Create web server
var http = require('http');
//Import the express module
var express = require('express');
//Create an express app
var app = express();
//Import the body-parser module
var bodyParser = require('body-parser');
//Import the mongoose module
var mongoose = require('mongoose');
//Import the Comments model
var Comments = require('./models/comments');
//Import the Promotions model
var Promotions = require('./models/promotions');
//Import the Leaders model
var Leaders = require('./models/leaders');
//Import the Dishes model
var Dishes = require('./models/dishes');
//Import the Favorites model
var Favorites = require('./models/favorites');
//Import the passport module
var passport = require('passport');
//Import the authenticate module
var authenticate = require('./authenticate');
//Import the config file
var config = require('./config');
//Import the cors module
var cors = require('cors');

//Connect to the MongoDB server
var url = config.mongoUrl;
var connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

//Use the promise returned by mongoose.connect() to log a message
connect.then((db) => {
    console.log("Connected correctly to the server");
}, (err) => { console.log(err); });

//Use the body-parser module to parse the data in the body of the request
app.use(bodyParser.json());

//Use the passport module to initialize the passport
app.use(passport.initialize());

//Use the cors module
app.use(cors());

//Create an express router
var router = express.Router();

//Create a middleware to handle the authentication
function auth(req, res, next) {
    //Check if the user is authenticated
    if (!req.user) {
        //Create an error
        var err = new Error('You are not authenticated!');
        //Set the error status code
        err.status = 403;
        //Call the next middleware to handle the error
        return next(err);
    }
    else {
        //Call the next middleware
        next();
    }
}

//Create a middleware to handle the authentication of the admin
function authAdmin(req, res, next) {
    //Check if the user is authenticated
    if (!req.user.admin) {
        //Create an error
        var err = new Error('You are not authorized to perform this operation!');
        //Set the error status code
        err.status = 403;
    }
    //Call the next middleware
    next();
}
