import express from "express"
const router = express.Router();
import FoodController from "../controllers/specials.contr.js";


// CREATE
router.post('/specials', FoodController.createFoodItem);

// READ ALL
router.get('/specials', FoodController.getAllFoodItems);

// READ ONE
router.get('/specials/:id', FoodController.getFoodItemById);

// UPDATE
router.put('/specials/:id', FoodController.updateFoodItemById);

// DELETE
router.delete('/specials/:id', FoodController.deleteFoodItemById);
export default router;