const { Router } = require("express");
const itemsController = require("../controllers/itemsController");
const router = Router();

router.get("/new", itemsController.renderNewItemForm);
router.post("/new", itemsController.addNewItem);

router.get("/:id/edit", itemsController.renderEditItemForm);
router.post("/:id/edit", itemsController.updateItem);
router.get("/:category", itemsController.getItemsByCategory);

router.post("/:id/delete", itemsController.deleteItem);

module.exports = router;
