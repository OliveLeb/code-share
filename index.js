const server = require('./server');
const io = require('socket.io')(server);

io.on('connection', (socket)=> {

    socket.on('joinRoom',(room)=>{
            socket.join(room);
    });

    socket.on('message', ({message,room})=> {
         io.sockets.to(room).emit('newMessage', message);
    });

});