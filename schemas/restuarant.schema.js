import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    boss: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    rest_name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    rest_year: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    rest_img: {
        type: String,
        required: true
    },
    resource: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
}, {
    timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;