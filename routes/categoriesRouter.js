const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");
const router = Router();

router.get("/", categoriesController.getAllCategories);
router.get("/new", categoriesController.renderNewCategoryForm);
router.post("/new", categoriesController.addNewCategory);
router.get("/:id/edit", categoriesController.renderEditCategoryForm);
router.post("/:id/edit", categoriesController.updateCategory);
router.post("/:id/delete", categoriesController.deleteCategory);

module.exports = router;
