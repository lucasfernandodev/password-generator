import { Password } from "./password.js";

export function generatePassword() {

  const buttonSubmit = document.querySelector(".button-submit");
  const display = document.getElementById('password-display');
  const filters = { lowercase: true, number: true, symbol: true, uppercase: true }


  function verifyFilters() {
    const options = document.querySelectorAll('.filter__opt input[type="checkbox"]');
    const optionsValid = [];
    options.forEach(opt => !!opt.checked === true && optionsValid.push(!!opt.checked))
    return optionsValid.length >= 2 ? true : false;
  }

  function verifyPasswordLength() {
    const inputLength = parseInt(document.querySelector('.filter__opt input[type="number"]').value);
    return inputLength >= 8 && inputLength <= 250 ? true : false;
  }

  function listenUpdatefilters() {
    const options = document.querySelectorAll('.filter__opt input[type="checkbox"]');
    options.forEach(opt => {
      function handle() {
        const name = opt.getAttribute("name");
        const value = !!opt.checked;
        filters[name] = value;

        if (!verifyFilters()) {
          buttonSubmit.setAttribute("disabled", true)
          buttonSubmit.classList.add('tooltip-visible')
        } else {
          if (verifyPasswordLength()) {
            buttonSubmit.removeAttribute("disabled")
            buttonSubmit.classList.remove('tooltip-visible')
          }
        }
      }

      opt.addEventListener("click", handle)
    })
  }

  function listenUpdatePasswordLength() {
    const inputLenghtPassword = document.querySelector('.filter__opt input[type="number"]')
    inputLenghtPassword.addEventListener("keyup", () => {

      if (!verifyPasswordLength()) {
        
        const tooltip = document.querySelector(`.tooltip[data-root='${inputLenghtPassword.id}']`);
        if(parseInt(inputLenghtPassword.value) > 250){
          tooltip.innerText = 'A senha deve ter no máximo 250 caracteres.'
        }
        
        if(parseInt(inputLenghtPassword.value) < 8){
          tooltip.innerText = 'A senha deve ter no mínimo 8 caracteres.'
        }

        buttonSubmit.setAttribute("disabled", true)
        inputLenghtPassword.classList.add('tooltip-visible')
      } else {
        verifyFilters() && buttonSubmit.removeAttribute("disabled");
        inputLenghtPassword.classList.remove('tooltip-visible')
      }
    })
  }


  function StartingGeneratingPassword(e) {
    e.preventDefault();

    let isAllowedDuplicated = !!(document.getElementById('pass-allow-duplicate').checked);

    const length = parseInt(document.querySelector('.filter__opt input[type="number"]').value) || 16

    if (verifyFilters() && verifyPasswordLength()) {
      const passwordGenerator = new Password(length, isAllowedDuplicated, filters);

      const password = passwordGenerator.get();
      display.value = password;
    }
  }




  function start() {
    listenUpdatefilters()
    listenUpdatePasswordLength()
    buttonSubmit.addEventListener('click', StartingGeneratingPassword)
  }

  return {
    start
  }
}