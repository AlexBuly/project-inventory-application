const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const itemsController = require("../controllers/itemsController");

const router = Router();

// ✅ Validation rules
const validateItem = [
  body("item_name")
    .trim()
    .notEmpty().withMessage("Item name is required.")
    .isLength({ max: 100 }).withMessage("Item name must be under 100 characters."),
  body("description")
    .trim()
    .notEmpty().withMessage("Description is required.")
    .isLength({ max: 255 }).withMessage("Description must be under 255 characters."),
  body("item_price")
    .notEmpty().withMessage("Price is required.")
    .isFloat({ min: 0 }).withMessage("Price must be a valid positive number."),
  body("category_id")
    .notEmpty().withMessage("Category is required.")
    .isInt().withMessage("Invalid category."),
  (req, res, next) => {
    const errors = validationResult(req);
    req.validationErrors = errors.array();
    next();
  }
];

// 🧭 Routes
router.get("/new", itemsController.renderNewItemForm);
router.post("/new", validateItem, itemsController.addNewItem);

router.get("/:id/edit", itemsController.renderEditItemForm);
router.post("/:id/edit", validateItem, itemsController.updateItem);

router.post("/:id/delete", itemsController.deleteItem);

router.get("/:category", itemsController.getItemsByCategory);

module.exports = router;
