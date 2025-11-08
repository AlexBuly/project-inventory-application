const pool = require("../db/pool");
const { validationResult } = require("express-validator");

// List all items in a category
const getItemsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const { rows: items } = await pool.query(
      `
      SELECT item.*, category.categoryname 
      FROM item 
      INNER JOIN category ON item.category_id = category.id 
      WHERE LOWER(category.categoryname) = LOWER($1)
      ORDER BY item.item_id ASC;
      `,
      [category]
    );

    res.render("items", {
      title: `${category.charAt(0).toUpperCase() + category.slice(1)}`,
      category,
      items,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving items");
  }
};

// Render new item form
const renderNewItemForm = async (req, res) => {
  res.render("itemForm", {
    title: "Add New Item",
    item: null,
    errors: [],
  });
};

// Add new item
const addNewItem = async (req, res) => {
  const errors = validationResult(req);
  const { item_name, description, item_price, category_id } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).render("itemForm", {
      title: "Add New Item",
      item: req.body,
      errors: errors.array(),
    });
  }

  try {
    await pool.query(
      `
      INSERT INTO item (item_name, description, item_price, category_id)
      VALUES ($1, $2, $3, $4);
      `,
      [item_name, description, item_price, category_id]
    );
    const { rows } = await pool.query("SELECT categoryname FROM category WHERE id = $1", [category_id]);
    res.redirect(`/items/${rows[0].categoryname.toLowerCase()}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding item");
  }
};

// Render edit form
const renderEditItemForm = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM item WHERE item_id = $1;", [id]);
    if (rows.length === 0) return res.status(404).send("Item not found");

    res.render("itemForm", {
      title: "Edit Item",
      item: rows[0],
      errors: [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving item for edit");
  }
};

// 🧩 Update item
const updateItem = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  const { item_name, description, item_price, category_id } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).render("itemForm", {
      title: "Edit Item",
      item: { item_id: id, ...req.body },
      errors: errors.array(),
    });
  }

  try {
    await pool.query(
      `
      UPDATE item
      SET item_name = $1, description = $2, item_price = $3, category_id = $4
      WHERE item_id = $5;
      `,
      [item_name, description, item_price, category_id, id]
    );
    const { rows } = await pool.query("SELECT categoryname FROM category WHERE id = $1", [category_id]);
    res.redirect(`/items/${rows[0].categoryname.toLowerCase()}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating item");
  }
};

// 🧩 Delete item
const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("DELETE FROM item WHERE item_id = $1 RETURNING category_id;", [id]);
    const { rows: cat } = await pool.query("SELECT categoryname FROM category WHERE id = $1", [rows[0].category_id]);
    res.redirect(`/items/${cat[0].categoryname.toLowerCase()}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting item");
  }
};

module.exports = {
  getItemsByCategory,
  renderNewItemForm,
  addNewItem,
  renderEditItemForm,
  updateItem,
  deleteItem,
};
