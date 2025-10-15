const express = require("express");
const path = require("path");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 3000;
const indexRouter = require("./routes/indexRouter");

app.use("/", indexRouter);

app.listen(PORT, () =>
  console.log(`App running at http://localhost:${PORT}`)
);

