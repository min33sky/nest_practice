const socket = io('/');

const getDocumentById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getDocumentById('hello_stranger');
const chattingBoxElement = getDocumentById('chatting_box');
const formElement = getDocumentById('chat_form');

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    //? 서버에서 return한 값을 받을 수 있다.
    console.log(data);
  });

  socket.on('hello_user', (data) => {
    console.log(data);
  });
}

function init() {
  helloUser();
}

init();
