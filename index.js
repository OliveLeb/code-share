const server = require('./server');
const io = require('socket.io')(server);


let allClients = [];

io.on('connection', (socket)=> {

    allClients.push(socket);
    const lastClient = allClients[allClients.length - 1];

    socket.on('joinRoom',(room)=>{
            socket.join(room);
            socket.to(room).broadcast.emit('new user','new');
    });

    socket.on('message', ({message,room})=> {
         socket.to(room).emit('newMessage', message);
    });

    socket.on('message new user', ({message,room}) => {
        io.sockets.to(room).to(lastClient.id).emit('newMessage', message);
    });

    socket.on('disconnect', ()=> {
        let i = allClients.indexOf(socket);
        allClients.splice(i, 1);
    })

});