const pool = require("../db/pool");

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

module.exports = { getAccessoriesController }