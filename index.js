const express = require('express');
const port = 8000;

const app = express();

//use ejs layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

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