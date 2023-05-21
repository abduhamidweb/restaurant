import bossSchema from '../schemas/boss.schema.js';
import Restaurant from '../schemas/restuarant.schema.js';
import {
    JWT
} from '../utils/jwt.js';
import path from "path"
import fs from "fs"

function pathJoin(filename) {
    const newPath = filename.split(' ').join('-');
    return path.normalize(newPath);
}

function isFile(filePath) {
    try {
        return fs.statSync(filePath).isFile()
    } catch (error) {
        return false
    }
}
class RestaurantController {
    // Create a new restaurant
    async create(req, res) {
        const restaurant = new Restaurant(req.body);
        try {
            await bossSchema.findByIdAndUpdate("644bf1d933bf77f600a944ff", {
                $push: {
                    restaurant: restaurant._id
                }
            })
            await restaurant.save();
            res.status(201).send(restaurant);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // Get all restaurants
    async findAll(req, res) {
        try {
            const restaurants = await Restaurant.find();
            res.send(restaurants);
        } catch (error) {
            res.status(500).send(error);
        }
    }
    // Get a single restaurant by ID
    async findOne(req, res) {
        try {
            const restaurant = await Restaurant.findById(req.params.id).
            populate('resource').populate("workers").populate("users").populate('foods').
            populate('zakaz').populate('contactUs').populate('hero').populate('choose').
            populate('photos').populate('events').populate('space');

            if (!restaurant) {
                return res.status(404).send();
            }
            res.send(restaurant);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Update a restaurant by ID
    async update(req, res) {
        try {
            let {
                rest_name,
                rest_year,
                description,
                contact,
            } = req.body;
            let restaurantOld = await Restaurant.findById(req.params.id);
            if (req.files) {
                let {
                    file
                } = req.files;
                if (file.truncated) throw new Error('you must send max 50 mb file');
                let types = file.name.split('.')
                let typeImg = types[types.length - 1]
                const random = Math.floor(Math.random() * 9000 + 1000)
                let userUploadusername = pathJoin("restaurant" + rest_name + random + '.' + typeImg)
                await file.mv(
                    path.join(
                        process.cwd(),
                        'public',
                        'restaurant',
                        userUploadusername
                    )
                );
                req.body.rest_img = userUploadusername;
                const restaurant = await Restaurant.findByIdAndUpdate(
                    req.params.id,
                    req.body, {
                        new: true
                    }
                );
                await restaurant.save();

                if (isFile(path.join(process.cwd(), 'public', 'restaurant', restaurantOld.rest_img))) {
                    fs.unlinkSync(path.join(process.cwd(), 'public', "restaurant", restaurantOld.rest_img))
                }
                if (!restaurant) {
                    return res.status(404).send();
                }
                res.send({
                    data: restaurant,
                    success: "ok",
                });
            } else {
                const restaurant = await Restaurant.findByIdAndUpdate(
                    req.params.id,
                    req.body, {
                        new: true
                    }
                );
                if (!restaurant) {
                    return res.status(404).send();
                }
                await restaurant.save();
                res.send({
                    data: restaurant,
                    success: "ok",
                });
            }
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // Delete a restaurant by ID
    async delete(req, res) {
        try {
            const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
            if (!restaurant) {
                return res.status(404).send();
            }
            if (isFile(path.join(process.cwd(), 'public', 'restaurant', restaurant.rest_img))) {
                fs.unlinkSync(path.join(process.cwd(), 'public', "restaurant", restaurant.rest_img))
            }
            res.send(restaurant);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default RestaurantController;