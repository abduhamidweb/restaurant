import mongoose from "mongoose"

// Define the schema for the users table
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userPhoto: {
        type: String,
    },
    res_id: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the users model from the schema
const User = mongoose.model('User', userSchema);

export default User;