import mongoose from "mongoose"

// Define the schema for the users table
const SpecialsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tap_type: {
        type: String,
        required: true,
        unique: true
    },
    short_desc: {
        required: true,
        type: String
    },
    long_desc: {
        required: true,
        type: String
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
const Specials = mongoose.model('Specials', SpecialsSchema);

export default Specials;