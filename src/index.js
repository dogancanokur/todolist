const alertTypes = Object.freeze({
  WARNING: "warning",
  SUCCESS: "success",
  DANGER: "danger",
});

function addTodo() {
  event.preventDefault();
  const newTodo = $("#todo").val().trim();

  if (newTodo == "") {
    showAlert(alertTypes.DANGER, "Enter a todo.");
  } else {
    addTodoToUi(newTodo);
    addTodoToStorage(newTodo);
    showAlert(alertTypes.SUCCESS, "Success");
  }

  $("#todo").val("");
}

function showAlert(type, message) {
  if (!Object.values(alertTypes).includes(type)) {
    return;
  }
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
    '<span href="#" class="delete-item" style="color: crimson;"><i class="fa fa-remove"></i></span></li>';
  $(createdHtml)
    .appendTo(".list-group")
    .on("click", function () {
      deleteTodo();
    });
}

function getTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("todos"));
  }
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodo() {
  let todo = $(event.target).closest("li").textContent;
  // remove from localStorage
  let todos = getTodosFromStorage();
  todos.forEach(function (todo, index) {
    todos.splice(index, 1);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  // remove from screen
  $(event.target).closest("li").remove();
  showAlert(alertTypes.WARNING, "Successfully removed.");
}

function addLocalStoragedTodosToScreen() {
  getTodosFromStorage().forEach((element) => {
    addTodoToUi(element);
  });
}

$(document).ready(function () {
  addLocalStoragedTodosToScreen();

  $("#todo-form").on("submit", addTodo);

  $(".delete-item").on("click", () => {
    deleteTodo();
  });

  $("#clear-todos").on("click", () => {
    localStorage.setItem("todos", "[]");
    $(".list-group li").remove();
    showAlert(alertTypes.WARNING, "All todos removed.");
  });

  $("#filter").on("change keyup paste", (event) => {
    const filterValue = event.target.value.toLowerCase();
    $.each($(".list-group li"), (idx, elm) => {
      if (elm.textContent.indexOf(filterValue) === -1) {
        //   if (!elm.textContent.includes(filterValue)) {
        elm.setAttribute("style","display: none !important");
    } else {
        elm.setAttribute("style","display: block");
      }
    });
  });
});
