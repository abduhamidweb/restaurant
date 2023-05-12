import express from "express"
const router = express.Router();
import HeroController from "../controllers/photos.contr.js";


// CREATE
router.post('/photo', HeroController.createFoodItem);

// READ ALL
router.get('/photo', HeroController.getAllFoodItems);

// READ ONE
router.get('/photo/:id', HeroController.getFoodItemById);

// UPDATE
router.put('/photo/:id', HeroController.updateFoodItemById);

// DELETE
router.delete('/photo/:id', HeroController.deleteFoodItemById);
export default router;