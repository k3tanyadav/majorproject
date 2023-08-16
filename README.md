// set up node mailer for the website :-
    . npm install nodemailer
    . set up configuration for communication b/w websiteand mailing service(gmail)
    . mailing function
    . templates to style the mail

// parallel and delayed jobs
    . handle sending mails, notifications etc in an optimised manner
    . use npm kue (queue) to enqueue a mail job into a queue
    . install redis 

// set up adding and removing friends
    . define friendship schema between two users
    . reference the formed friendship in the user document in database
    . AJAX request to handle adding and removing friends dynamically
    . display all friends of a signed-in user on the home page 

// make a chat engine using websocket.io
    . display a chatbox on home page if user is signed in
    . npm install socket.io
    . create a http chat server
    . connect to the chat server from frontend and backend(socket.io CDN and configFile respectively)
    . join a chatroom
    . send, broadcast and recieve a message in the chatroom

// development and production environment
    . use system environment variables to securely access the keys and passwords
        used in the code

// logging
    . when the appplication is deployed to run from a remote server, logging is necessarry to detect and debug problems
    . npm install morgan
    . npm install rotating-file-stream(to write logs into a new file when cuurent log file reaches specified limit)

// gulp
    . npm install del (for deleting the files in 'public' directory before rebuilding)
    . npm install gulp-cssnano (for compressing css files)
    . npm install gulp-uglify-es (for compressing js files)
    . npm install gulp-imagemin (for compressing image files)
    . npm install gulp-rev for renaming the static files being sent with an added hash to avoid caching if the files already exist in memory 
    . use dynamic 'import' instead of 'require' as gulp tasks are not being detected

// the files renamed by gulp-rev need to be referenced correctly
    . so, we'll be using a helper function that's available to the views locals

//untrack the environment file(confidential leak) ***********