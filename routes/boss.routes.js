import express from 'express';
import BossController from '../controllers/boss.contr.js';

const router = express.Router();
const bossController = new BossController();

// Create a new boss
router.post('/boss', bossController.create);
router.post('/boss/login', bossController.login);

// Get all bosses
router.get('/boss', bossController.findAll);

// Get a single boss by ID
router.get('/boss/:id', bossController.findOne);

// Update a boss by ID
router.patch('/boss/:id', bossController.update);

// Delete a boss by ID
router.delete('/boss/:id', bossController.delete);

export default router;