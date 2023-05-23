const express = require('express');
const port = 8000;

const app = express();

app.listen(port, function(err){
    if(err){
        console.log('could not run the server');
        return;
    }
    console.log(`server running on port ${port}`);
})