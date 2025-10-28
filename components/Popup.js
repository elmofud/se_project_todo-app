export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
  }

  handleEscapeClose(evt) {
    if (evt.key === `Escape`) {
      const openModal = document.querySelector(".popup_visible");
      if (openModal) {
        this.close();
      }
    }
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._popupCloseBtn.handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");

    console.log("close method");
  }

  setEventListeners() {
    this._popupCloseBtn.addEventListener("click", () => {
      this.close();
    });
  }
}
