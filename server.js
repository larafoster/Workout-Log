const express = require("express");
const mongoose = require("mongoose");
const logger = require('morgan'); //added per package.json

const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger("dev")); //custom method : morgan

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

/* mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
  //seed file
}); */
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout-app-osu',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
);
// routes
app.use(require("./routes/api.js"));
app.use(require("./routes/views.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
