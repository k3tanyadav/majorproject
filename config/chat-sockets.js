// connect to the chat server from server side
module.exports.chatSockets = function(socketServer){

    let io = require('socket.io')(socketServer,{
        cors : {
            origin : '*'
        }
    });

    // event listener for when a user wants to connect to chat server
    io.sockets.on('connection', function(socket){
        console.log('new connection recieved', socket.id);

        // listen for disconnect event(user disconnects and reconnects if they refresh home page)
        socket.on('disconnect',function(){
            console.log('socket disconnected');
        });

        // event listener for a user asking to join a chatroom 
        socket.on('join_room', function(data){
            console.log('request to join a chat room recieved!', data);

            //join the chatroom
            socket.join(data.chatroom);

            //emit an event to all users in that chatroom that a new user joined
            io.in(data.chatroom).emit('user_joined',data);
        });

        // listen for a new message
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('recieve_message',data);
        })
    })
}