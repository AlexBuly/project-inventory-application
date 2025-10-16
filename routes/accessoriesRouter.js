const { Router } = require("express");
const accessoriesRouter = Router();
const accessoriesController = require("../controllers/accessoriesController");

accessoriesRouter.get("/", accessoriesController.getAccessoriesController);

module.exports = accessoriesRouter;