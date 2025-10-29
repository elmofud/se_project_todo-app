import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupform = this._popupElement.querySelector(".popup__form");
  }
  setEventListeners() {
    super.setEventListeners();

    this._popupform.addEventListener("submit", (evt) => {
      evt.prevetDefault();
      this._handleFormSubmit();
    });
  }
}
