import mongoose from "mongoose"

// Define the schema for the users table
const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['starters', 'salads', 'specialty'],
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    imgLink: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    res_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    }
});

// Create the users model from the schema
const Food = mongoose.model('Food', foodSchema);

export default Food;