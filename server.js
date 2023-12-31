if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const express = require("express");
const app = express();
const loginRoute = require("./src/routes/loginRoute");
const logoutRoute = require("./src/routes/logoutRoute");
const registerRoute = require("./src/routes/registerRoute");
const homeRoute = require("./src/routes/homeRoute");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

app.use(expressLayouts);
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/home", homeRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/register", registerRoute);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");
app.set("layout", "layouts/mainLayout");

async function connectDB () {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB Database`);
    app.listen(process.env.PORT, () => console.log(`Listening on server port!`));
  } catch (error) {
    return error;
  }
}
connectDB();

app.get("*", (req, res) => {
  res.render("errors/normal_404", {layout: "layouts/defaultLayout"});
});
