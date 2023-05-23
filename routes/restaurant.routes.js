import express from 'express';
import RestaurantController from '../controllers/restuarant.contr.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();
const controller = new RestaurantController();

// Create a new restaurant
router.post('/restaurants', authMiddleware, controller.create);

// Get all restaurants
router.get('/restaurants', authMiddleware, controller.findAll);

router.get('/restaurants/user', controller.findAll);

// Get a single restaurant by ID
router.get('/restaurantsadmin/:id', authMiddleware, controller.findOne);
router.get('/restaurants/:id', controller.findOne);

// Update a restaurant by ID
router.put('/restaurants/:id', authMiddleware, controller.update);

// Delete a restaurant by ID
router.delete('/restaurants/:id', authMiddleware, controller.delete);
export default router;