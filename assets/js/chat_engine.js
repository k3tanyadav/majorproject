// connect to chat server from user side
class ChatEngine{
    constructor(chatboxId, userEmail){
        this.chatboxId = $(`#${chatboxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.handleConnection();
        }
    }

    handleConnection() {

        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established via sockets!');

            // emit an event asking the chat server to let us connect to a chatroom
            self.socket.emit('join_room',{
                user_email : self.userEmail,
                chatroom : 'playhouse'
            });

            // an event listener in case a new user joins the chatroom 
            self.socket.on('user_joined',function(data){
                console.log('new user joined!!', data);
            })

            //emit event when sending a new message
            $('#send-message').click((e)=>{
                e.preventDefault();
                
                let message = $('#chat-input').val();

                if(message != ''){
                    self.socket.emit('send_message',{
                        message : message,
                        user_email : self.userEmail,
                        chatroom : 'playhouse'
                    })
                }
            });

            //listen for a new message
            self.socket.on('recieve_message', function(data){
                let messageType = 'other-message';

                if(data.user_email == self.userEmail){
                    messageType = 'my-message';
                }

                //create the message html element
                let newMessage = $('<p>');
                newMessage.addClass(messageType);
                newMessage.html(data.message);

                // add the message to the chatbox
                $('#chat-messages').append(newMessage);
            }) 
        })
    }
}