import express from "express"
const router = express.Router();
import FoodController from "../controllers/foods.contr.js";


// CREATE
router.post('/foods', FoodController.createFoodItem);

// READ ALL
router.get('/foods', FoodController.getAllFoodItems);

// READ ONE
router.get('/foods/:id', FoodController.getFoodItemById);

// UPDATE
router.put('/foods/:id', FoodController.updateFoodItemById);

// DELETE
router.delete('/foods/:id', FoodController.deleteFoodItemById);
export default router;