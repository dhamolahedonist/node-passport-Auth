const express = require("express");
const router = require("./routes/index");
const userRouter = require("./routes/users");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const app = express();

// DB config
const db = require("./config/keys").MongoURI;

// connect to mongo

mongoose.set("strictQuery", false);
mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Mongodb connected...."))
  .catch((err) => console.log(err));

// Ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
// routes
// app.use("/", require("./routes/index"));
app.use("/", router);
app.use("/users", userRouter);

const PORT = process.env.process || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
