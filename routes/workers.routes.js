// Import required modules
import express from "express"
const router = express.Router();
import WorkerService from './../controllers/workers.contr.js';
import {
    JWT
} from "../utils/jwt.js";

// Create an instance of the workerService class
const workerService = new WorkerService();

// Define routes for the worker API
router.get('/worker', async (req, res) => {
    try {
        const worker = await workerService.getAllworkers();
        res.status(200).json(worker);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
router.get('/workeradmin', async (req, res) => {
    try {
        const worker = await workerService.getAlladmin();
        res.status(200).json(worker);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
router.get('/worker/:id', async (req, res) => {
    try {
        const user = await workerService.getUserById(req.params.id);
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

router.post('/worker', async (req, res) => {
    try {
        const worker = await workerService.createworker(req);
        res.status(201).json({
            message: "worker created successfully",
            token: JWT.SIGN({
                id: worker._id
            }),
            data: worker 
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
router.post('/workerisadmin', async (req, res) => {
    try {
        const worker = await workerService.isAdmin(req.body);
        res.status(201).json({
            message: "welcome admin",
            token: JWT.SIGN({
                id: worker._id
            }),
            res_id: worker.res_id,
            data: worker
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});
router.post('/register/worker', async (req, res) => {
    try {
        const user = await workerService.registerUser(req.body);
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
router.put('/worker/:id', async (req, res) => {
    try {
        const user = await workerService.updateUser(req.params.id, req.body);
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

router.delete('/worker/:id', async (req, res) => {
    try {
        const user = await workerService.deleteUser(req.params.id);
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