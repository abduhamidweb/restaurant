import Food from "../schemas/foods.schema.js";
class FoodController {
    // Create new food item
    static async createFoodItem(req, res) {
        try {
            const foodItem = new Food({
                name: req.body.name,
                type: req.body.type,
                calories: req.body.calories,
                price: req.body.price,
                isAvailable: req.body.isAvailable || true,
                imgLink: req.body.imgLink,
                description: req.body.description,
                res_id: req.body.res_id
            });
            const savedFoodItem = await foodItem.save();
            res.status(201).json(savedFoodItem);
        } catch (err) {
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
            const foodItem = await Food.findById(req.params.id);
            if (!foodItem) {
                return res.status(404).json({
                    message: 'Food item not found'
                });
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
            if (!foodItem) {
                return res.status(404).json({
                    message: 'Food item not found'
                });
            }
            await foodItem.remove();
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