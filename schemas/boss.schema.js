import mongoose from "mongoose";
const bossSchema = new mongoose.Schema({
    bossname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    restaurant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
    }]
});

export default mongoose.model('Boss', bossSchema);

