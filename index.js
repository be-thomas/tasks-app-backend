// load modules
const bodyParser = require('body-parser');
const cors = require("cors");
const express = require('express');
const config = require("./config.json");

// Destructuring Configs
const { server: serverConfig, mongodb: mongodbConfig } = config;

const SERVER_PORT = serverConfig?.port || 3001
const SERVER_HOST = serverConfig?.host || 'localhost'

const MONGODB_PORT = mongodbConfig?.port || 27017
const MONGODB_HOST = mongodbConfig?.host || 'localhost'
const MONGODB_DB_NAME = mongodbConfig?.db_name || 'task_manager'



let app = express();
app.use(cors({ origin: "http://localhost:3000" }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(function(req, res, next) {
    req.config = config;
    next();
})
app.use('/', require('./indexRouter'));   



// Connect to database
const db = require('./models')
db.mongoose
    .connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected to MongoDB.");
    })
    .catch(err => {
        console.error("MongoDB Connection error", err);
        process.exit();
    })


// Run the server
app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Server Running on http://${SERVER_HOST}:${SERVER_PORT}`)
})

