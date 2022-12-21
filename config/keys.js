const moogoose = require("mongoose");
require("dotenv").config();

const MongoURI = process.env.MongoURI;

// connect to mongodb
function connectToMongoDB() {
  moogoose.set("strictQuery", false);
  moogoose.connect(MongoURI);

  moogoose.connection.on("connected", () => {
    console.log("Connected to MongoDB successfully");
  });

  moogoose.connection.on("error", (err) => {
    console.log("Error connecting to MongoDB", err);
  });
}

module.exports = { connectToMongoDB };
