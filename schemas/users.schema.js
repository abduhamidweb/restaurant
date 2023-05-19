import mongoose from "mongoose"

// Define the schema for the users table
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: (value) => Joi.string().email().required().validate(value).error === null,
            message: 'Email maydoni noto‘g‘ri formatda yuborilgan.'
        },
        required: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => Joi.string().min(6).required().validate(value).error === null,
            message: 'Parol kamida 6 belgidan iborat bo‘lishi kerak.'
        }
    },
    userPhone: {
        type: String,
        validate: {
            validator: (value) => {
                const regex = /^\+998\d{9}$/;
                return regex.test(value);
            },
            message: 'Telefon raqami noto‘g‘ri formatda yuborilgan.'
        }
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