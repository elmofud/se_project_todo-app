import TodoCounter from "./TodoCounter.js";

class Todo {
  constructor(data, selector, handleTodoCheckbox) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleTodoCheckbox = handleTodoCheckbox;
  }
  _setEventListener() {
    this.todoDeleteBtn.addEventListener("click", () => {
      this.todoElement.remove();
    });

    this.todoCheckboxEl.addEventListener("change", (evt) => {
      this._data.completed = !this._data.completed;
      this._handleTodoCheckbox(evt.target.checked);
    });
  }

  _generateCheckboxEl() {
    this.todoCheckboxEl = this.todoElement.querySelector(".todo__completed");
    this.todoLabel = this.todoElement.querySelector(".todo__label");
    this.todoCheckboxEl.checked = this._data.completed;
    this.todoCheckboxEl.id = `todo-${this._data.id}`;
    this.todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this.todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this.todoElement.querySelector(".todo__name");
    const todoDate = this.todoElement.querySelector(".todo__date");
    this.todoDeleteBtn = this.todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    this.dueDate = new Date(this._data.date);
    if (!isNaN(this.dueDate)) {
      todoDate.textContent = `Due: ${this.dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._generateCheckboxEl();
    this._setEventListener();
    return this.todoElement;
  }
}

export default Todo;
