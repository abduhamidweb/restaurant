import {
    Router
} from 'express';
import UserController from '../controllers/users.contr.js';

const router = Router();

// Get all users
router.get('/users', UserController.getUsers);

// Get a single user
router.get('/users/:id', UserController.getUserById);

// Create a new user
router.post('/users', UserController.createUser);

// Update an existing user
router.put('/users/:id', UserController.updateUser);

// Delete a user
router.delete('/users/:id', UserController.deleteUser);

export default router;
