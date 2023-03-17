// создаём массив для хранения комментариев
let comments = JSON.parse(localStorage.getItem("comments")) || [];
html();

// очистить локалстор
// localStorage.setItem("comments", JSON.stringify([]));

//отправка комментария по нажатию на Enter
document.getElementById("comment").addEventListener("keypress", function (e) {
  if (e.keyCode === 13 && !event.shiftKey) {
    event.preventDefault();
    document.getElementById("submit").click();
  } else if (e.keyCode === 16 && e.keyCode === 13) {
    document.getElementById("comment").append((this.innerHTML = "\n"));
  }
});

// клик по кнопке
function validateForm() {
  event.preventDefault();
  let userName = document.getElementById("name").value;
  let comment = document.getElementById("comment").value;

  const commentDate =
    document.getElementById("date").value ||
    new Date().toISOString().substring(0, 10);

  if (userName && comment) {
    saveComment({
      userName: userName,
      comment: comment,
      date: commentDate,
      like: 0,
    });
  }
  // очищаем поля после пуша;
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
  document.getElementById("date").value = "";
}

// сохранение данных в локалстор
function saveComment(comment) {
  if (comment) {
    comments.push(comment);
    updateComments();
  }
}

// отрисовка комментариев
function html() {
  let out = "";
  comments.forEach(function (comment, index) {
    out += "<div class='comment'>";
    out += '<div class="comment-header">';
    out += ` <p class="comment-author"> ${comment.userName}:</p>`;
    out += `<p class="comment-text"> ${comment.comment}</p>`;
    out += "</div>";
    out += `<div class="comment-footer"> <div class="comment-date"> ${addCommentDate(
      comment
    )} </div>`;
    out += `<button id="like" type="button" class="like-button" value="${index}" onclick="return likeComment(this)"><i class="fa fa-heart"></i> <span class="like-count" id="like-count"> ${showLikes(
      comment
    )} </span></button>`;
    out += `<button id="remove" type="button" class="delete-button" value="${index}" onclick="return removeComment(this)"><i class="fa fa-trash"></i></button>`;

    out += "</div></div>";
  });
  document.getElementById("comments").innerHTML = out;
}

// удаление
function removeComment(i) {
  comments.splice(i.value, 1);
  updateComments();
}

// нlike
function likeComment(index) {
  let obj = comments.find((e, i) => i == index.value);
  console.log(index.value);
  obj.like++;

  updateComments();
}

function showLikes(comment) {
  return comment.like > 0 ? comment.like : "";
}

// обновление локалстор и страницы
function updateComments() {
  localStorage.setItem("comments", JSON.stringify(comments));
  html();
}

function addCommentDate(comment) {
  const today = new Date();
  const commentDateObj = new Date(comment.date);
  console.log("1", commentDateObj.toDateString());
  if (commentDateObj.toDateString() == today.toDateString()) {
    return "сегодня, " + today.toLocaleTimeString("ru-RU").slice(0, 5);
  } else if (
    commentDateObj.toDateString() ==
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    ).toDateString()
  ) {
    return "вчера, " + today.toLocaleTimeString("ru-RU").slice(0, 5);
  } else {
    return `${comment.date}, ${today.toLocaleTimeString("ru-RU").slice(0, 5)}`;
  }
}
