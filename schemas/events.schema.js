import mongoose from "mongoose"

// Define the schema for the users table
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc_short: {
        type: String,
        required: true
    },
    desc_long: {
        type: String,
        required: true
    },
    imgLink: {
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
const Event = mongoose.model('Event', eventSchema);

export default Event;