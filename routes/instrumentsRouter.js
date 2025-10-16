const { Router } = require("express");
const instrumentsRouter = Router();
const instrumentsController = require("../controllers/instrumentsController");

instrumentsRouter.get("/", instrumentsController.getInstrumentsController);

module.exports = instrumentsRouter;