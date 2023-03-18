'use strict';

const commentName = document.getElementById('comment-name');
const commentBody = document.getElementById('comment-body');
const commentDate = document.getElementById('comment-date');

const errorName = document.getElementById('error-name');
const errorBody = document.getElementById('error-body');

const formGroup = document.querySelector('.form-group');

document.getElementById('form').addEventListener('submit', function (e) {
  e.preventDefault();
  //Валидация формы
  validateForm();

  // Создаем DOM-элементы для нового комментария
  showComents();

  // Очищаем поля формы после отправки комментария
  clearForm();
});

function showComents() {
  let commentItem = document.createElement('div');
  commentItem.classList.add('field-comments');

  let nameElement = document.createElement('h3');
  nameElement.textContent = ucFirst(commentName.value);

  let commentElement = document.createElement('p');
  commentElement.textContent = ucFirst(commentBody.value);

  let dateElement = document.createElement('p');
  dateElement.classList.add('text__time');
  dateElement.textContent = commentDate.value;

  commentItem.appendChild(dateElement);
  commentItem.appendChild(nameElement);
  commentItem.appendChild(commentElement);

  document.getElementById('comment-list').appendChild(commentItem);

  let out = ` <div class="field-row">
 	  <a href="#" ><img class="img__basket img" src="./img/basket.svg" alt="basket">
	  </a>
	  <a href="#" ><img class="img__like img" src="./img/like.svg" alt="like"></a>
	 </div>`;
  commentItem.innerHTML += out;

  commentItem.addEventListener('click', function (event) {
    if (event.target.matches('.img__basket')) {
      event.preventDefault();
      deleteComment(event.target);
    } else if (event.target.matches('.img__like')) {
      event.preventDefault();
      addLike(event.target);
    }
  });
}

function deleteComment(deleteButton) {
  deleteButton.closest('.field-comments').remove();
}

function addLike(button) {
  if (button.getAttribute('src') === './img/like.svg')
    button.setAttribute('src', './img/like2.svg');
  else button.setAttribute('src', './img/like.svg');
}

function clearForm() {
  commentName.value = '';
  commentBody.value = '';
  commentDate.value = '';
}
function ucFirst(str) {
  let res = str !== '' ? str[0].toUpperCase() + str.slice(1) : 'Строка пуста';
  return res;
}
//Валидация формы
function validateForm() {
  let isValid = true; // переменная флага валидации
  let fields = document.querySelectorAll('.comment-input');
  let errors = checkFields(fields);
  let fieldDate = document.getElementById('comment-date');

  if (errors.length > 0) {
    e.preventDefault();
  }

  checkFields(fields);

  if (fieldDate.value === '') {
    fieldDate.value = showDate();
  } else if (fieldDate.value === new Date()) {
  }
  return isValid; // возвращаем флаг валидации
}

function checkFields(fields) {
  let errors = [];

  // Проходим по всем полям на форме и проверяем их на ошибки
  fields.forEach(function (field) {
    if (field.value.trim() === '') {
      errors.push(field);

      addErrorText();
      field.classList.add('error');
    }
    field.addEventListener('input', function () {
      // Проверяем содержимое поля на наличие ошибок
      if (field.value.trim() !== '' && field.classList.contains('error')) {
        // Если ошибки больше нет, удаляем класс с ошибкой
        removeErrorText();
        field.classList.remove('error');
      }
    });
  });

  return errors;
}

function addErrorText() {
  commentName.value.trim() === ''
    ? (errorName.style.display = 'block')
    : (errorName.style.display = 'none');

  commentBody.value.trim() === ''
    ? (errorBody.style.display = 'block')
    : (errorBody.style.display = 'none');
}

function removeErrorText(field) {
  if (commentName.value.trim() !== '') {
    errorName.style.display = 'none';
  }
  if (commentBody.value.trim() !== '') {
    errorBody.style.display = 'none';
  }
}

function showDate() {
  let currentDate = new Date();
  let hours = currentDate.getHours();
  let min = currentDate.getMinutes();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let formattedTime = `${hours}:${min < 10 ? '0' : ''}${min}`;
  console.log(day, month, year);
  if (
    day === new Date().getDate() &&
    year === new Date().getFullYear() &&
    month === new Date().getMonth() + 1
  ) {
    return `сегодня, ${formattedTime}`;
  } else if (
    day === new Date().getDate() - 1 &&
    year === new Date().getFullYear() &&
    month === new Date().getMonth() + 1
  ) {
    return `вчера, ${formattedTime}`;
  } else {
    return ` ${formattedTime}${day < 10 ? '0' : ''}${day}.${
      month < 10 ? '0' : ''
    }${month}.${year} `;
  }
}
