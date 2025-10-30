const pool = require("../db/pool");

const renderNewInstrumentForm = (req, res) => {
  res.render("newInstrument", { title: "Add Instrument" });
};

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
    const { item_name, description, item_price } = req.body;
    await pool.query(
      `
        INSERT INTO item (item_name, description, category_id, item_price)
        VALUES ($1, $2, 1, $3);
      `,
      [item_name, description, item_price]
    );
    res.redirect("/instruments"); // redirect back to list
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

module.exports = { renderNewInstrumentForm, getInstrumentsController, addInstrument };