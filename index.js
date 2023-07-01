const express = require('express');
const port = 8000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
//to create user session with encrypted cookies
const session = require('express-session');
const  passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const env = require('./config/environment');

const app = express();

//set up chat server that runs with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat-sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server listening on port 5000');

//use cookie-parser to read user session
app.use(cookieParser());

//use body parser to read form data
app.use(bodyParser.urlencoded({extended : false}));

//use static files
app.use(express.static(env.asset_path));
//to make uploads path available to browser(multer) 
app.use('/uploads', express.static(__dirname + '/uploads'));

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
    secret : env.session_cookie_key,
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

//use connect-flash to show flash messages on website(uses session cookies)
app.use(flash());
app.use(customMware.setFlash);

//all requests will be handled by routes
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log('could not run the server');
        return;
    }
    console.log(`server running on port ${port}`);
})