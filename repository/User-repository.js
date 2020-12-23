var User = require("../models").User;
const bcrypt = require("bcrypt");

var UsersRepository = {
  findOneByEmail: function (uEmail) {
    /*this function will use to verify if user exists with email*/
    return User.findOne({
      where: {
        email: uEmail,
      },
    });
  },

  createtUser: async function (mUser) {
    const hash = bcrypt.hashSync(mUser.password, 10);
    return User.create({
      firstName: mUser.firstName,
      lastName: mUser.lastName,
      email: mUser.email,
      password: hash,
    });
  },
  deleteUserByEmail: async function (mEmail) {
    return User.destroy({
      where: {
        email: mEmail,
      },
    });
  } 
};
module.exports = UsersRepository;
