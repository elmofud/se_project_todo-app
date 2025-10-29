import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");

const todoList = document.querySelector(".todos__list");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (evt) => {
    console.log(evt.target.name.value);
    console.log(evt.target.date.value);
  },
});
addTodoPopup.setEventListeners();

//call section instance's renderItems method
const section = new Section({
  items: initialTodos,
  renderer: (todoData) => {
    const todo = new Todo(todoData, "#todo-template");
    const todoElement = todo.getView();
    return todoElement;
    //section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

/*const openModal = (modal) => {
  modal.classList.add("popup_visible");
  addTodoForm.reset();
};*/

/*const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};*/

const renderTodo = (todoData) => {
  const todo = new Todo(todoData, "#todo-template");
  const todoElement = todo.getView();
  section.addItem(todoElement);
};

addTodoButton.addEventListener("click", () => {
  //openModal(addTodoPopupEl);
  addTodoPopup.open();
});

//addTodoCloseBtn.addEventListener("click", () => {
//closeModal(addTodoPopupEl);
//addTodoPopup.close();
//});

/*addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  renderTodo(values);

  //closeModal(addTodoPopupEl);
  addTodoPopup.close();
  addTodoForm.reset();
  newFormValidator.resetValidation();
});*/
section.renderItems();
/*initialTodos.forEach((item) => {
  renderTodo(item);
});*/

const newFormValidator = new FormValidator(validationConfig, addTodoForm);
newFormValidator.enableValidation();
