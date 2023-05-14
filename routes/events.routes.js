import express from "express"
const router = express.Router();
import FoodController from "../controllers/events.contr.js";


// CREATE
router.post('/events', FoodController.createFoodItem);

// READ ALL
router.get('/events', FoodController.getAllFoodItems);

// READ ONE
router.get('/events/:id', FoodController.getFoodItemById);

// UPDATE
router.put('/events/:id', FoodController.updateFoodItemById);

// DELETE
router.delete('/events/:id', FoodController.deleteFoodItemById);
export default router;