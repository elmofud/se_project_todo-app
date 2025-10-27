export default class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const todoElement = this._renderer(item);
      this.addItem(todoElement); //call the renderer and pass it to the item ans argument
    });
  }

  addItem(todoElement) {
    this._container.append(todoElement);
  }
}
