const bcrypt = require('bcrypt');

class Users {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  add({
    username,
    password,
  }) {
    if (!username || !password) return false;

    this.data.push({
      id: +new Date(),
      username,
      password: bcrypt.hashSync(password, 10),
    });
    return true;
  }
}

module.exports = Users;
