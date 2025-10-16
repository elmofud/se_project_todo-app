import { v4 as uuidv4 } from "https://jspm.dev/uuid";
console.log(uuidv4());

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");

const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  addTodoForm.reset();
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
  newFormValidator.resetValidation();
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id };
  const todo = new Todo(values, "#todo-template");
  const todoElement = todo.getView();

  todosList.append(todoElement);

  closeModal(addTodoPopup);
  addTodoForm.reset();
});

initialTodos.forEach((item) => {
  const todo = new Todo(item, "#todo-template");
  const todoElement = todo.getView();
  todosList.append(todoElement);
});

const newFormValidator = new FormValidator(validationConfig, addTodoForm);
newFormValidator.enableValidation();
