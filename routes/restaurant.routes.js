import express from 'express';
import RestaurantController from '../controllers/restuarant.contr.js';

const router = express.Router();
const controller = new RestaurantController();

// Create a new restaurant
router.post('/restaurants', controller.create);

// Get all restaurants
router.get('/restaurants', controller.findAll);

// Get a single restaurant by ID
router.get('/restaurants/:id', controller.findOne);

// Update a restaurant by ID
router.put('/restaurants/:id', controller.update);

// Delete a restaurant by ID
router.delete('/restaurants/:id', controller.delete);

export default router;