const express = require("express");
const path = require("path");
app.set("view engine", "ejs");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`App running at http://localhost:${PORT}`)
);

