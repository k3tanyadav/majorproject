const development = {
    name : 'development',
    asset_path : './assets',
    session_cookie_key : 'abcde',
    db : 'project_db',

    google_client_id : '230117372210-uvch37di5kr5beo67ufqlr1kli11qoqh.apps.googleusercontent.com',
    google_client_secret : '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',
    google_client_callback_url : 'http://localhost:8000/users/auth/google/callback',

    jwt_secret : 'something',

    smtp : {
        service : 'gmail',
        host : 'smtp.gmail.com',
        port : 587,
        secure : false,
        auth : {
            user : 'ketany798@gmail.com',
            pass : 'ivaeyajpqmbxsawj' //using gmail app passwords instead of real password
        }
    }
}

const production = {
    name : 'production',
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key : process.env.CODEIAL_SESSION_COOKIE_KEY,
    db : process.env.CODEIAL_DB,

    google_client_id : process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_client_callback_url : process.env.CODEIAL_GOOGLE_CALLBACK_URL,

    jwt_secret : process.env.CODEIAL_JWT_SECRET,

    smtp : {
        service : 'gmail',
        host : 'smtp.gmail.com',
        port : 587,
        secure : false,
        auth : {
            user : process.env.CODEIAL_GMAIL_USERNAME,
            pass : process.env.CODEIAL_GMAIL_APPS_PASSWORD //using gmail app passwords instead of real password
        }
    }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);