import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupform = this._popupElement.querySelector(".popup__form");
    this._inputList = this._popupform.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const InputValues = {};
    this._inputList.forEach((input) => {
      const name = input.name;
      const value = input.value;
      InputValues[name] = value;
    });
    return InputValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupform.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();

      this._handleFormSubmit(inputValues);
    });
  }
}
