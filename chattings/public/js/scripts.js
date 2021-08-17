const socket = io('/chattings'); //? 네임스페이스 설정 (서버의 네임스페이스와 일치해야 웹 소켓 통신 가능)

const getDocumentById = (id) => document.getElementById(id) || null;

//* get DOM Element
const helloStrangerElement = getDocumentById('hello_stranger');
const chattingBoxElement = getDocumentById('chatting_box');
const formElement = getDocumentById('chat_form');

//* draw functions
const drawHelloStranger = (username) =>
  (helloStrangerElement.innerHTML = `Hello ${username} Stranger :)`);

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    //? 서버에서 return한 값을 받을 수 있다.
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
}

init();
