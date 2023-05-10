import express from "express"
const router = express.Router();
import HeroController from "../controllers/hero.contr.js";


// CREATE
router.post('/hero', HeroController.createFoodItem);

// READ ALL
router.get('/hero', HeroController.getAllFoodItems);

// READ ONE
router.get('/hero/:id', HeroController.getFoodItemById);

// UPDATE
router.put('/hero/:id', HeroController.updateFoodItemById);

// DELETE
router.delete('/hero/:id', HeroController.deleteFoodItemById);
export default router;