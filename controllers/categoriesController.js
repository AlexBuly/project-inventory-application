const pool = require("../db/pool");
const { body, validationResult } = require("express-validator");

const getAllCategories = async (req, res) => {
    try {
        const { rows: categories} = await pool.query("SELECT * FROM category ORDER BY id ASC;");
        res.render("categories", { title: "All Categories", categories});
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving categories");
    }
}

const renderNewCategoryForm = (req, res) => {
  res.render("categoryForm", { title: "Add New Category", category: null, errors: [] });
};

const addNewCategory = [
    body("categoryname").trim().notEmpty().withMessage("Category name is required."),
    async (req, res) => {
        const errors = validationResult(req);
        const { categoryname } = req.body;

        if (!errors.isEmpty()) {
            return res.render("categoryForm", {
                title: "Add New Category",
                category: { categoryname },
                errors: errors.array(),
            });
        }

        try {
            await pool.query("INSERT INTO category (categoryname) VALUES ($1);", [categoryname]);
            res.redirect("/categories");
        } catch (err) {
            console.error(err);
            res.status(500).send("Error adding category");
        }
    }
];

const renderEditCategoryForm = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM category WHERE id = $1;", [id]);
    if (rows.length === 0) return res.status(404).send("Category not found");

    res.render("categoryForm", { title: "Edit Category", category: rows[0], errors: [] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving category for edit");
  }
};

const updateCategory = [
  body("categoryname").trim().notEmpty().withMessage("Category name is required."),
  async (req, res) => {
    const { id } = req.params;
    const { categoryname } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("categoryForm", {
        title: "Edit Category",
        category: { id, categoryname },
        errors: errors.array(),
      });
    }

    try {
      await pool.query("UPDATE category SET categoryname = $1 WHERE id = $2;", [categoryname, id]);
      res.redirect("/categories");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating category");
    }
  },
];

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM category WHERE id = $1;", [id]);
    res.redirect("/categories");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting category");
  }
};

module.exports = {
    getAllCategories,
    renderNewCategoryForm,
    addNewCategory,
    renderEditCategoryForm,
    updateCategory,
    deleteCategory
}