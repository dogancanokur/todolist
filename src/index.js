function addTodo() {
  event.preventDefault();
  const newTodo = $("#todo").val().trim();

  if (newTodo == "") {
    showAlert("danger", "Enter a todo.");
  } else {
    addTodoToUi(newTodo);
    showAlert("success", "Success");
  }

  $("#todo").val("");
}

$(document).ready(function () {
  $("#todo-form").on("submit", addTodo);
});

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  $(".card-body:eq(0)").append(alert);

  setTimeout(function () {
    alert.remove();
  }, 1000);
}

function addTodoToUi(todo) {
  let createdHtml =
    '<li class="list-group-item d-flex justify-content-between">' +
    todo +
    '<a href="#" class="delete-item"><i class = "fa fa-remove"></i></a></li>';
  $(createdHtml).appendTo(".list-group");
}
