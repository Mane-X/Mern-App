const express = require("express");
const router = express.Router();

// Import requireSignin middlewear
const { requireSignin } = require("../controllers/auth.controllers");

// Import Controllers
const { addCar, viewCars,deleteCar } = require("../controllers/carSold.controller");

router.get('/cars', requireSignin, viewCars);
router.post("/cars/new", requireSignin, addCar);
router.delete("/cars/:_id", requireSignin, deleteCar);

module.exports = router;
