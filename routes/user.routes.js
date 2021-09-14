const express = require("express");
const passport = require("passport");
const router = express.Router();

// user validation DLA CHETNYCH
const isLogged = (req, res, next) => {
  if (!req.user) {
    res.redirect("/no-permission");
  } else {
    next();
  }
};
// app.use((req, res, next) => {
//   res.validate = (url) => {
//     if (req.user) res.render(url);
//     else res.render("noPermission");
//   };
// });
//res.sendFile(path.join(__dirname, `/views/${name}`)); jak juz to cos takiego?
router.get("/logged", isLogged, (req, res) => {
  // console.log(req.user._json.picture);
  res.render("logged", {
    isLogged: true,
    picURL: req.user._json.pictiure,
    userName: req.user.displayName,
  });
});

router.get("/user", isLogged, (req, res) => {
  res.render("profile");
});

router.get("/user/settings", isLogged, (req, res) => {
  res.render("profileSettings");
});

// router.get(
//   "/profile",
//   passport.authenticate("google", {
//     scope: ["email", "profile"],
//     // successRedirect:
//     failureRedirect: "/no-permission",
//   }),
//   (req, res) => {
//     // res.validate("profile");
//     if (isLogged()) res.render("profile");
//   }
// );
// router.get(
//   "/profile/settings",
//   passport.authenticate("google", {
//     scope: ["email", "profile"],
//     // successRedirect:
//     failureRedirect: "/no-permission",
//   }),
//   (req, res) => {
//     // res.validate("profileSettings");
//     if (isLogged()) res.render("profileSettings");
//   }
// );

router.get("/user/auth/loggedOut", isLogged, (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/no-permission", (req, res) => {
  res.render("noPermission");
});

module.exports = router;
