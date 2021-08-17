const socket = io('/chattings'); //? 네임스페이스 설정 (서버의 네임스페이스와 일치해야 웹 소켓 통신 가능)

const getDocumentById = (id) => document.getElementById(id) || null;

//* get DOM Element
const helloStrangerElement = getDocumentById('hello_stranger');
const chattingBoxElement = getDocumentById('chatting_box');
const formElement = getDocumentById('chat_form');

//* global socket handler
socket.on('user_connected', (username) => drawNewChat(`${username} connected`));

socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawNewChat(`${username}: ${chat}`);
});

socket.on('disconnect_user', (username) => drawNewChat(`${username}: bye...`));

//* draw functions
const drawHelloStranger = (username) =>
  (helloStrangerElement.innerHTML = `Hello ${username} Stranger :)`);

const drawNewChat = (message, isMe = false) => {
  const wrapperChatBox = document.createElement('div');
  wrapperChatBox.className = 'clearfix';
  let chatBox;
  if (!isMe)
    chatBox = `
      <div class='bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix break-all'>
        ${message}
      </div>
      `;
  else
    chatBox = `
      <div class='bg-white w-3/4 ml-auto mr-4 my-2 p-2 rounded-lg clearfix break-all'>
        ${message}
      </div>
      `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    // 내 화면에 그려주기
    drawNewChat(`me: ${inputValue}`, true);
    event.target.elements[0].value = '';
  }
};

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    //? 서버에서 return한 값을 받을 수 있다.
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
  formElement.addEventListener('submit', handleSubmit);
}

init();
