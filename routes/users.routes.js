// Import required modules
import express from "express"
const router = express.Router();
import UserService from "../controllers/users.contr.js"
import {
    JWT
} from "../utils/jwt.js";

// Create an instance of the UserService class
const userService = new UserService();

// Define routes for the users API
router.get('/users', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                error: 'User not found'
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

router.post('/users', async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({
            message: "User created successfully",
            token: JWT.SIGN({
                id: user._id
            }),
            data: user
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
router.post('/register/users', async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({
            message: "oke siz admin ekansiz",
            token: JWT.SIGN({
                id: user._id
            }),
            data: user
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
router.put('/users/:id', async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                error: 'User not found'
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                error: 'User not found'
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// Export the router
export default router;