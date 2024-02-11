export class Password {
  chars = ''
  length = 16;
  isAllowedDuplicated = false;

  filter = {
    number: {
      allowed: true,
      apply: () => { const chars = '0123456789'; return this.chars = this.chars + chars }
    },
    uppercase: {
      allowed: true,
      apply: () => { const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; return this.chars = this.chars + chars }
    },
    symbol: {
      allowed: true,
      apply: () => { const chars = '!@#$%^&*()'; return this.chars = this.chars + chars }
    },
    lowercase: {
      allowed: true,
      apply: () => { const chars = 'abcdefghijklmnopqrstuvwxyz'; return this.chars = this.chars + chars }
    }
  }

  constructor(length = 16, isAllowedDuplicated = false,
    filters = {
      number: true,
      uppercase: true,
      lowercase: true,
      symbol: true,
      lowercase: true
    }) {
    this.length = length;
    this.isAllowedDuplicated = isAllowedDuplicated;
    const keys = Object.keys(filters);

    for (const key of keys) {
      if (this.filter[key]) {
        this.filter[key].allowed = filters[key]
      }
    }
  }



  getAllowedCharacters() {
    const keys = Object.keys(this.filter);

    for (const key of keys) {
      const filter = this.filter[key];
      filter.allowed === true && filter.apply()
    }

    return this.chars
  }

  getChar(string, limit) {
    let randomNumber = Math.floor(Math.random() * limit);
    const letter = string.substring(randomNumber, randomNumber + 1);
    return letter
  }

  get() {
    let password = '';
    const allowedChars = this.getAllowedCharacters()

    for (let i = 0; i < this.length; i++) {

      const letter = this.getChar(allowedChars, allowedChars.length);

      if (this.isAllowedDuplicated) {
        password = password + letter;
        return;
      }

      // Generate password without duplicate characters 
      // Allows duplicate charaters if there are no more unique characters
      if (!password.includes(letter) || this.length > allowedChars.length) {
        password += letter
      } else {
        
        let isUniquePassword = false;
        while (isUniquePassword !== true) {

          const letter = this.getChar(allowedChars, allowedChars.length);

          if (!password.includes(letter)) {
            password += letter;
            isUniquePassword = true
          }
        }

      }
    }

    return password;
  }
}