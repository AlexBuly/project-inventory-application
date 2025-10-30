const { Router } = require("express");
const accessoriesRouter = Router();
const accessoriesController = require("../controllers/accessoriesController");

accessoriesRouter.get("/", accessoriesController.getAccessoriesController);
accessoriesRouter.get("/newAccessory", accessoriesController.renderNewAccessoryForm);
accessoriesRouter.post("/newAccessory", accessoriesController.addAccessory);

module.exports = accessoriesRouter;