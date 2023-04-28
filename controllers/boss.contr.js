import Boss from '../schemas/boss.schema.js';
import {
    JWT
} from './../utils/jwt.js';

class BossController {

    // Create a new Boss
    async create(req, res) {
        try {
            const boss = new Boss(req.body);
            await boss.save();
            res.status(201).send({
                data: boss,
                token: JWT.SIGN({
                    id: boss._id
                })
            });
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // Get all Bosses
    async findAll(req, res) {
        try {
            const bosses = await Boss.find();
            res.send(bosses);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Get a single Boss by ID
    async findOne(req, res) {
        try {
            const boss = await Boss.findById(req.params.id);
            if (!boss) {
                return res.status(404).send();
            }
            res.send(boss);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Update a Boss by ID
    async update(req, res) {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['bossname', 'password', 'email'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));
        if (!isValidOperation) {
            return res.status(400).send({
                error: 'Invalid updates!'
            });
        }
        try {
            const boss = await Boss.findById(req.params.id);
            if (!boss) {
                return res.status(404).send();
            }
            updates.forEach(update => boss[update] = req.body[update]);
            await boss.save();
            res.send(boss);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // Delete a Boss by ID
    async delete(req, res) {
        try {
            const boss = await Boss.findByIdAndDelete(req.params.id);
            if (!boss) {
                return res.status(404).send();
            }
            res.send(boss);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default BossController;