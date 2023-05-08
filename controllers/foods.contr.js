import Food from "../schemas/foods.schema.js";
import Restaurant from './../schemas/restuarant.schema.js';
import path from "path"
import fs from "fs"

function pathJoin(filename) {
    const newPath = filename.split(' ').join('-');
    return path.normalize(newPath);
}
class FoodController {
    // Create new food item
    static async createFoodItem(req, res) {
        try {
            let {
                name,
                type,
                calories,
                price,
                isAvailable,
                description,
                res_id,
            } = req.body;
            console.log(name,
                type,
                calories,
                price,
                isAvailable,
                description,
                res_id, );
            let {
                file
            } = req.files;
            if (file.truncated) throw new Error('you must send max 50 mb file');
            let types = file.name.split('.')
            let typeImg = types[types.length - 1]
            const random = Math.floor(Math.random() * 9000 + 1000)
            let userUploadusername = pathJoin(name + random + '.' + typeImg)
            await file.mv(
                path.join(
                    process.cwd(),
                    'public',
                    'imgs',
                    userUploadusername
                )
            )
            req.body.imgLink = userUploadusername;
            const foodItem = new Food({
                name,
                type,
                calories,
                price,
                isAvailable,
                imgLink: userUploadusername,
                description,
                res_id,
            });
            await Restaurant.findByIdAndUpdate(req.body.res_id, {
                $push: {
                    foods: foodItem._id
                }
            })
            await foodItem.save();
            res.status(201).json(foodItem);
        } catch (err) {
            console.log('err :', err);
            res.status(400).json({
                message: err.message
            });
        }
    }

    // Get all food items
    static async getAllFoodItems(req, res) {
        try {
            const foodItems = await Food.find();
            res.json(foodItems);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    // Get single food item by id
    static async getFoodItemById(req, res) {
        try {
            const foodItem = await Food.findById(req.params.id);
            if (!foodItem) {
                return res.status(404).json({
                    message: 'Food item not found'
                });
            }
            res.json(foodItem);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }

    // Update a food item by id
    static async updateFoodItemById(req, res) {
        try {
            let {
                file
            } = req.files;
            if (file.truncated) throw new Error('you must send max 50 mb file')
            let types = file.name.split('.')
            let type = types[types.length - 1]
            const random = Math.floor(Math.random() * 9000 + 1000)
            let userUploadusername = pathJoin(req.body.name + random + '.' + type)
            await file.mv(
                path.join(
                    process.cwd(),
                    'public',
                    'imgs',
                    userUploadusername
                )
            )
            const foodItem = await Food.findById(req.params.id);

            function isFile(filePath) {
                try {
                    return fs.statSync(filePath).isFile()
                } catch (error) {
                    return false
                }
            }
            if (!foodItem) {
                return res.status(404).json({
                    message: 'Food item not found'
                });
            }
            req.body.imgLink = userUploadusername
            if (file) {
                if (isFile(path.join(process.cwd(), 'public', 'imgs', foodItem.imgLink))) {
                    fs.unlinkSync(path.join(process.cwd(), 'public', "imgs", foodItem.imgLink))
                }
            }
            foodItem.name = req.body.name || foodItem.name;
            foodItem.type = req.body.type || foodItem.type;
            foodItem.calories = req.body.calories || foodItem.calories;
            foodItem.price = req.body.price || foodItem.price;
            foodItem.isAvailable = req.body.isAvailable || foodItem.isAvailable;
            foodItem.imgLink = req.body.imgLink || foodItem.imgLink;
            foodItem.description = req.body.description || foodItem.description;
            foodItem.res_id = req.body.res_id || foodItem.res_id;
            const updatedFoodItem = await foodItem.save();
            res.json(updatedFoodItem);
        } catch (err) {
            res.status(400).json({
                message: err.message
            });
        }
    }
    // Delete a food item by id
    static async deleteFoodItemById(req, res) {
        try {
            const foodItem = await Food.findById(req.params.id);
            console.log('foodItem :', foodItem);
            if (!foodItem) {
                return res.status(404).json({
                    message: 'Food item not found'
                });
            }
            await foodItem.deleteOne();
            res.json({
                message: 'Food item deleted successfully'
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
}
export default FoodController