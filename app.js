const express = require("express");
const path = require("path");
const pool = require("./db/pool");
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

// Middleware to fetch all categories for header
app.use(async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM category ORDER BY id ASC;");
    res.locals.categories = rows; // available in all EJS templates
    next();
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.locals.categories = [];
    next();
  }
});

// Routers
const indexRouter = require("./routes/indexRouter");
const itemsRouter = require("./routes/itemsRouter");
const categoriesRouter = require("./routes/categoriesRouter");

app.use("/", indexRouter);
app.use("/items", itemsRouter);
app.use("/categories", categoriesRouter);


app.listen(PORT, () =>
  console.log(`App running at http://localhost:${PORT}`)
);
