const express = require("express");
const path = require("path");
const app = express();
const pool = require("./db/pool");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 3000;
const indexRouter = require("./routes/indexRouter");
const itemsRouter = require("./routes/itemsRouter");

app.use(async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM category ORDER BY id ASC;");
    res.locals.categories = rows; // available to every EJS file
    next();
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.locals.categories = [];
    next();
  }
});

app.use("/", indexRouter);
app.use("/items", itemsRouter);

app.listen(PORT, () =>
  console.log(`App running at http://localhost:${PORT}`)
);

