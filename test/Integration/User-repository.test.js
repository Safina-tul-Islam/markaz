const chai = require("chai");
const expect = require("chai").expect;
chai.use(require("chai-as-promised"));
var faker = require("faker");
const bcrypt = require("bcrypt");
const usrRepo = require("../../repository/User-repository");

const dummyUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

describe("UserRepository functions", () => {
  before(() => {});

  it("Insert Dummy User to database", async function () {
    const user = await usrRepo.createtUser(dummyUser);
    expect(user.email).to.equal(dummyUser.email);
    expect(user.dataValues).to.have.any.keys(
      "id",
      "firstName",
      "lastName",
      "email",
      "password"
    );
  });

  it("Existing email re insertion Should Throw Unique Key Error", async function () {
    await expect(usrRepo.createtUser(dummyUser)).to.be.rejected.then(function (
      error
    ) {
      expect(error).to.have.property("name", "SequelizeUniqueConstraintError");
    });
  });

  it("Respository is expected to return null if No email found", async () => {
    const user = await usrRepo.findOneByEmail(faker.internet.email());
    expect(user).to.be.null;
  });

  it("Find User by Email and validate password", async () => {
    const user = await usrRepo.findOneByEmail(dummyUser.email);
    const match = await bcrypt.compare(dummyUser.password, user.password);
    expect(user).to.exist;
    expect(user.email).to.equal(dummyUser.email);
    expect(match).to.be.true;
  });

  it("Finally Delete dummy User from database", async function () {
    await usrRepo.deleteUserByEmail(dummyUser.email);
  });
});
