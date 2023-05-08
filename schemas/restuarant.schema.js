import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    rest_name: {
        type: String,
        trim: true,
        lowercase: true
    },

    rest_year: {
        type: Number,
    },
    description: {
        type: String,
        trim: true
    },
    contact: {
        type: String,
        trim: true
    },
    rest_img: {
        type: String,
    },
    resource: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    workers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker',
    }],
    foods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
    }],
    zakaz: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zakaz',
    }],
}, {
    timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;