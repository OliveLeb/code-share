window.addEventListener('load', ()=> {

const editor = document.querySelector('#editor');
const langage = document.querySelector('#langage');
const mime = document.querySelectorAll('[data-mime]');
const option = document.querySelectorAll('option');

    var codemirror = CodeMirror.fromTextArea(editor, {
        lineNumbers: true,
        theme: 'darcula',
        scrollbarStyle:'simple',
        autoCloseBrackets:true,
        autoCloseTags:true
    });

    langage.addEventListener('change',()=> {
        if(langage.value === 'text') return codemirror.setOption('mode',false)
        for(let i=0;i<mime.length;i++) {
            if(langage.selectedIndex === i) {
                codemirror.setOption('mode',langage.value)
                CodeMirror.autoLoadMode(codemirror,mime[i].value)
            }
        }
    });

    const socket = io();  
    const room =  location.pathname;
    
    socket.on('connect', ()=> {
        socket.emit('joinRoom', room);
        socket.on('new user', (data)=> {
             if(data === 'new') socket.emit('message new user', {message:codemirror.getValue(),room});
        });

        codemirror.on('keyup',(codemirror)=> {
            socket.emit('message', {message:codemirror.getValue(),room});
        });
         
        socket.on('newMessage', (message)=> {
            codemirror.setValue(message)
        });
    });




function download(filename,text) {
    filename = `codeshare-${Date.now()}.txt`;
    text = editor.value;
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

const downloadBtn = document.querySelector('#download');
downloadBtn.addEventListener('click',download);

const menuBtn = document.querySelector('#menuBtn');
const menu = document.querySelector('#menu');
menuBtn.addEventListener('click', ()=> {
    menu.classList.toggle('active');
});


});