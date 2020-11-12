window.addEventListener('load', ()=> {

const editor = document.querySelector('#editor');
const lineNumber = document.querySelector('#lineNumber');

    const socket = io();  
    const room =  location.pathname;
    
    socket.on('connect', ()=> {
        socket.emit('joinRoom', room);

        socket.on('new user', (data)=> {
             if(data === 'new') socket.emit('message new user', {message:editor.value,room});
        });

        editor.addEventListener('input',()=>{
            socket.emit('message', {message:editor.value,room});
        })
        
        socket.on('newMessage', (message)=> {
            editor.value = message;
            countLine();
        });
    });



    editor.addEventListener('scroll', ()=> {
        lineNumber.scrollTop = editor.scrollTop;
    });
    lineNumber.addEventListener('scroll',()=> {
        editor.scrollTop = lineNumber.scrollTop;
    })

function countLine(){
    let linesCount = editor.value.split('\n');

    //if(message.split('\n').length !== linesCount.length) return;

    while(lineNumber.firstChild){
        lineNumber.removeChild(lineNumber.firstChild);
    };

    linesCount.forEach((line,index) => {
        let number = document.createElement('p');
        number.innerText = index + 1;
        lineNumber.appendChild(number);
    });
};



function download(filename,text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

const downloadBtn = document.querySelector('#download');
downloadBtn.addEventListener('click',()=>{
    download('codeshare.txt',editor.value);
});

});