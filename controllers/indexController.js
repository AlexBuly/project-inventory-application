const getIndexController = async(req, res) => {
    res.render("index", { title: "Home" });
};

module.exports = { getIndexController }