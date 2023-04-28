import Resource from '../schemas/resource.schema.js';
import Restaurant from '../schemas/restuarant.schema.js';

class ResourceController {

    // Create a new resource
    async create(req, res) {
        const resource = new Resource(req.body);
        try {
            await Restaurant.findByIdAndUpdate(req.body.res_id, {
                $push: {
                    resource: resource._id
                }
            })
            await resource.save();
            res.status(201).send(resource);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // Get all resources
    async findAll(req, res) {
        try {
            const resources = await Resource.find();
            res.send(resources);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Get a single resource by ID
    async findOne(req, res) {
        try {
            const resource = await Resource.findById(req.params.id);
            if (!resource) {
                return res.status(404).send();
            }
            res.send(resource);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Update a resource by ID
    async update(req, res) {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['title', 'description', 'space', 'videoLink', 'res_id'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({
                error: 'Invalid updates!'
            });
        }

        try {
            const resource = await Resource.findByIdAndUpdate(
                req.params.id,
                req.body, {
                    new: true
                }
            );
            if (!resource) {
                return res.status(404).send();
            }
            res.send(resource);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // Delete a resource by ID
    async delete(req, res) {
        try {
            const resource = await Resource.findByIdAndDelete(req.params.id);
            if (!resource) {
                return res.status(404).send();
            }
            res.send(resource);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default ResourceController;