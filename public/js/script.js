window.addEventListener('load', ()=> {

    const socket = io();

    const textarea = document.querySelector('#textarea');textarea.value
    const room =  location.pathname;
    
    socket.on('connect', ()=> {

        socket.emit('joinRoom', room);

        socket.on('new user', (data)=> {
             if(data === 'new') socket.emit('message new user', {message:textarea.value,room});
        });

        textarea.addEventListener('input', ()=> {
            socket.emit('message', {message:textarea.value,room});
        });

        socket.on('newMessage', (message)=> {
            textarea.value = message;
        });
            

    })

    
    const btn = document.querySelector('#show');
    btn.addEventListener('click', ()=> {
        console.log(textarea.value);
    })

});