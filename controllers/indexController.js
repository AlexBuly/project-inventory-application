const pool = require("../db/pool");

const getIndexController = async(req, res) => {
    try {
        const { rows: items } = await pool.query(`
            SELECT item.*, category.categoryname
            FROM item
            INNER JOIN category ON item.category_id = category.id
            ORDER BY item.item_id ASC;
    `);
        res.render("index", {
        title: "All items",
        items,
        categories: res.locals.categories || [],
        });
    } catch (err) {
        console.error("Error fetching all items:", err);
        res.status(500).send("Error retrieving all items");
    }
};

module.exports = { getIndexController }