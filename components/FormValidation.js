class FormValidator {
  constructor(settings, formEl) {
    console.log(settings);
    console.log(formEl);
    this._settings = settings;
    this._FormEl = formEl;
    this._inputSelector = settings._inputSelector;
    this._submitButtonSelector = settings._submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings._inputErrorClass;
  }
  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(this._formEl, this._settings);
  }
}
export default FormValidator;
