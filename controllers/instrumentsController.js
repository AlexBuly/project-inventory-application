const getInstrumentsController = async (req, res) => {
    res.render("instruments", { title: "Intruments" });
};

module.exports = { getInstrumentsController }