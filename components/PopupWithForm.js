import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      const name = input.name;
      const value = input.value;
      inputValues[name] = value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();

      this._handleFormSubmit(inputValues);
    });
  }
}
