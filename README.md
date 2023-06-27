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