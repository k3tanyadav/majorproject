const express = require('express');
const port = 8000;

const app = express();

const db = require('./config/mongoose');

//use body parser to read form data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : false}));

//use static files
app.use(express.static('./assets'));

//use ejs layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//extract stylesheets and scripts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//all requests will be handled by routes
app.use('/', require('./routes'));

// use ejs views engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log('could not run the server');
        return;
    }
    console.log(`server running on port ${port}`);
})