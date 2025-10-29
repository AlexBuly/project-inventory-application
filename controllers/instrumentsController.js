const pool = require("../db/pool");

const getInstrumentsController = async (req, res) => {
    try {
        const { rows: items }  = await pool.query(
            `SELECT item_name, description, item_price, categoryname 
             FROM item
             INNER JOIN category ON item.category_id = category.id
             WHERE category_id = 1;`
        )
        res.render("instruments", { title: "Instruments", items });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving table");
    }
};

const addInstrument = async (req, res) => {
    try {
        res.render("newInstrument", {title: "Add Instrument"});
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

module.exports = { getInstrumentsController, addInstrument };