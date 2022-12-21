const express = require("express");
const router = require("./routes/index");
const userRouter = require("./routes/users");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const app = express();
const PORT = process.env.process || 5000;
// passport config
require("./config/passport")(passport);

// DB config
require("./config/keys").connectToMongoDB(); // Connect to MongoDB
require("dotenv").config();

// Ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

// bodyparser
app.use(express.urlencoded({ extended: false }));

// express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
// connect flash
app.use(flash());
// routes

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
// app.use("/", require("./routes/index"));
app.use("/", router);
app.use("/users", userRouter);

app.listen(PORT, console.log(`Server started on port ${PORT}`));
