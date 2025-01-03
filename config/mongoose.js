const { error } = require('console');
const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://127.0.0.1/${env.db}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to DB'));

db.once('open', function(){
    console.log('succesfully connected to database');
})

module.exports = db;