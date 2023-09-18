if (process.env.NODE_ENV !== "production") {require("dotenv").config()}
const flash = require("express-flash");
const methodOverride = require("method-override");
const expressSession = require("express-session");
const initPassport = require("./src/passport-config");
const bcrypt = require("bcrypt");
const express = require("express");
const passport = require("passport");
const app = express();
const PORT_NO = process.env.PORT;
const users = [];

initPassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
  );
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.listen(PORT_NO, () => console.log(`Listening on port ${PORT_NO}`));

app.get("/", checkAuthenticated, (req, res) => {
  res.render("index", {name: req.user.name});
});
app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register");
});
app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login");
});

app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPwd = await bcrypt.hash(req.body.password, 10); //hashes pwd
    const newUser = {
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPwd
    }
    users.push(newUser);
    res.redirect("/login");
  } catch (err) {
    res.redirect("/register");
  }
});
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}));

app.delete("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {return next(err);}
  });
  res.redirect("/login");
});

function checkAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}
function checkNotAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}