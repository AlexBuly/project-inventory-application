const pool = require("../db/pool");

const getAccessoriesController = async (req, res) => {
    try {
        const { rows: category }  = await pool.query(
            "SELECT * FROM category WHERE id = 2 ORDER BY id ASC;"
        )
        res.render("accessories", { title: "Accessories", category});
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving table");
    }
};

module.exports = { getAccessoriesController }