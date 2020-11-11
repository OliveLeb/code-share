window.addEventListener('load', ()=> {

    const socket = io();

    const textarea = document.querySelector('#textarea');textarea.value
    const room =  location.pathname;
    
    socket.on('connect', ()=> {

        socket.emit('joinRoom', room);

        textarea.addEventListener('change', ()=> {
            socket.emit('message', {message:textarea.value,room});
        })

        socket.on('newMessage', (message)=> {
            textarea.value = message;
            console.log(message);
        })
            

    })

    
    const btn = document.querySelector('#show');
    btn.addEventListener('click', ()=> {
        console.log(textarea.value);
    })

});