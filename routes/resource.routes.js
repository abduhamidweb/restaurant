import express from 'express';
import ResourceController from '../controllers/resource.contr.js';

const router = express.Router();
const controller = new ResourceController();

// Create a new resource
router.post('/resources', controller.create);

// Get all resources
router.get('/resources', controller.findAll);

// Get a single resource by ID
router.get('/resources/:id', controller.findOne);

// Update a resource by ID
router.put('/resources/:id', controller.update);
// Delete a resource by ID
router.delete('/resources/:id', controller.delete);

export default router;