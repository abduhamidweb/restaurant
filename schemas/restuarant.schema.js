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
        validate: {
            validator: (value) => {
                const regex = /^\+998\d{9}$/;
                return regex.test(value);
            },
            message: 'Telefon raqami noto‘g‘ri formatda yuborilgan.'
        },
        set: (value) => value.replace(/[^0-9+]/g, '')
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
    contactUs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
    }],
    choose: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Choose',
    }],

    hero: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hero',
    }],
    photos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }],
    space: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specials',
    }],

}, {
    timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;