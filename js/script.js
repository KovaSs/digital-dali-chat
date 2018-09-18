window.addEventListener('DOMContentLoaded', function() {

  let chatInput = document.querySelector('.down-block__input'),
      contentBlock = document.querySelector('.content-block'),
      userNameField = document.querySelector('.textfield'),
      body = document.querySelector('body'),
      chreckLocation = window.location.toString(),
      newMessage = [];

  // Рендеринг сообщений из Localstorage в зависимости от страницы
  if(chreckLocation.match(/chat/ig)) {
    renderStorageMessage();
  }

  // Функция по добавлению сообщения на страницу
  function createMessage() {
    let message = document.createElement('div'),
        username = document.createElement('div');
    message.classList.add('content-block__message');
    message.textContent = chatInput.value;
    username.classList.add('content-block__username');
    username.textContent = `${localStorage.getItem('username')}`;
    newMessage.push([localStorage.getItem('username'), chatInput.value]);
    contentBlock.appendChild(message);
    message.appendChild(username);
    chatInput.value = "";
    saveMessageLS();
  }
  // Сохраняем сообщения в Localstorage
  function saveMessageLS() {
    let lsmessage = JSON.stringify(newMessage);
    localStorage.setItem('message', `${lsmessage}`);
  }
  // Рендерим сообщения на страницу из Localstorage
  function renderStorageMessage() {
    let saveMessage = JSON.parse(localStorage.getItem('message'));
    if(saveMessage !=null){
      newMessage = saveMessage;
      for (let i = 0; i < saveMessage.length; i++) {
        let message = document.createElement('div'),
            username = document.createElement('div');
        message.classList.add('content-block__message');
        message.textContent = saveMessage[i][1];
        username.classList.add('content-block__username');
        username.textContent = saveMessage[i][0];
        contentBlock.appendChild(message);
        message.appendChild(username);
      }
    }
  }

  // Функция ввода и сохранения в Localstorage значения Username
  function saveUserName(e) {
    let userNameLabel = document.querySelector('label[for="name"]');
    localStorage.setItem('username', `${userNameField.value}`);
    if(userNameField.value != '') {
      location.href = 'chat.html';
    } else {
      userNameField.style.borderBottom = "2px solid #FF1E1E";
      userNameLabel.style.color = "#FF1E1E";
      userNameField.onfocus = function() {
        userNameField.style.borderBottom = "";
        userNameLabel.style.color = "";
      }
    } 
  }
  // Делегирование событий
  body.addEventListener('click', (e) => {
    e.preventDefault();
    let target = e.target;
    // Отправление сообщения при нажатии кнопки отправления
    if(target.classList.contains('down-block__btn') || target.parentElement.classList.contains('down-block__btn')) {
      if(chatInput.value != '')
      createMessage();
    }
    // Сохранение Username при клике
    if(target.classList.contains('submit__img') && target.value != '') {
      saveUserName(target);
    }
    // Возвращение на главную страницу
    if(target.parentElement.classList.contains('head-block__link')) {
      location.href = 'index.html';
    }
    // Очищение истории сообщений
    if(target.classList.contains('head-block__clear') || target.parentElement.classList.contains('head-block__clear')) {
      localStorage.removeItem('message');
      contentBlock.innerHTML = '';
    }
  });

  // Событие при нажатии клавиши Enter
  body.addEventListener('keypress', (e) => {
    if(e.keyCode == 13 && chatInput.value != 0) {
      createMessage();
    }
  });
});