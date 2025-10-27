const pool = require("../db/pool");

const getInstrumentsController = async (req, res) => {
    try {
        const { rows: category }  = await pool.query(
            "SELECT * FROM category ORDER BY id ASC;"
        )
        res.render("instruments", { title: "Intruments", category });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving table");
    }
};

module.exports = { getInstrumentsController };