const pool = require("../db/pool");

const renderNewAccessoryForm = (req, res) => {
  res.render("newAccessory", { title: "Add Accessory" });
};

const getAccessoriesController = async (req, res) => {
    try {
        const { rows: items }  = await pool.query(
             `SELECT item_name, description, item_price, categoryname 
             FROM item
             INNER JOIN category ON item.category_id = category.id
             WHERE category_id = 2;`
        )
        res.render("accessories", { title: "Accessories", items });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving table");
    }
};

const addAccessory = async (req, res) => {
   try {
    const { item_name, description, item_price } = req.body;
    await pool.query(
      `
        INSERT INTO item (item_name, description, category_id, item_price)
        VALUES ($1, $2, 2, $3);
      `,
      [item_name, description, item_price]
    );
    res.redirect("/accessories"); // redirect back to list
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = {renderNewAccessoryForm, getAccessoriesController, addAccessory }