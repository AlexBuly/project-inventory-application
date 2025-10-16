const getAccessoriesController = async (req, res) => {
    res.render("accessories", { title: "Accessories" });
};

module.exports = { getAccessoriesController }