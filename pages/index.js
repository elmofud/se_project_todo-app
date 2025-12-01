import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleTodoCheckbox(completed) {
  todoCounter.updateCompleted(completed);
}

function handleTodoDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const { name, date: inputDate } = inputValues;
    const date = new Date(inputDate);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    renderTodo(values);

    addTodoPopup.close();
    addTodoForm.reset();
    newFormValidator.resetValidation();
  },
});

addTodoPopup.sfotEventListeners();

const section = new Section({
  items: initialTodos,
  renderer: (todoData) => {
    const todo = new Todo(
      todoData,
      "#todo-template",
      handleTodoCheckbox,
      handleTodoDelete
    );
    const todoElement = todo.getView();
    return todoElement;
  },
  containerSelector: ".todos__list",
});

const renderTodo = (todoData) => {
  const todo = new Todo(
    todoData,
    "#todo-template",
    handleTodoCheckbox,
    handleTodoDelete
  );

  const todoElement = todo.getView();
  section.addItem(todoElement);
  todoCounter.updateTotal(true);
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

section.renderItems();

const newFormValidator = new FormValidator(validationConfig, addTodoForm);
newFormValidator.enableValidation();
