var express = require("express");
const passport = require("../utils/passport");
const usrRepo = require("../repository/User-repository");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/",
  })
);

router.post("/register", async (req, res) => {
  //	console.log(req.body);
  if (!req.body.password || !req.body.email) {
    res.send("Please enter valid username/password");
  }
  const curUser = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  };
  const user = await usrRepo.createtUser(curUser).then((error) => {
    res.send(error);
  });
  if (user) {
    res.redirect("/login");
  }
});

router.get("/logout", function (req, res) {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
