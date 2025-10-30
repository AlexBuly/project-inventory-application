const { Router } = require("express");
const instrumentsRouter = Router();
const instrumentsController = require("../controllers/instrumentsController");

instrumentsRouter.get("/", instrumentsController.getInstrumentsController);
instrumentsRouter.get("/newInstrument", instrumentsController.renderNewInstrumentForm);
instrumentsRouter.post("/newInstrument", instrumentsController.addInstrument);

module.exports = instrumentsRouter;