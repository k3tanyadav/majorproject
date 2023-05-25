const express = require('express');
const port = 8000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
//to create user session with encrypted cookies
const session = require('express-session');
const  passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

const app = express();

//use cookie-parser to read user session
app.use(cookieParser());

//use body parser to read form data
app.use(bodyParser.urlencoded({extended : false}));

//use static files
app.use(express.static('./assets'));

//use ejs layouts
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//extract stylesheets and scripts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use ejs views engine
app.set('view engine', 'ejs');
app.set('views', './views');

// use express session to create encrypted cookie
app.use(session({
    name : 'userID',
    secret : 'abcde',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : 100*60*1000
    },
    store : new MongoStore(
        {
            mongooseConnection : db,
            autoRemove : 'disabled'
        },
        function(err){
            if(err)console.log(err || 'connect-mongodb setup ok!');
        })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//all requests will be handled by routes
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log('could not run the server');
        return;
    }
    console.log(`server running on port ${port}`);
})