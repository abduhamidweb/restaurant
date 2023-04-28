import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
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
    }
});

export default mongoose.model('User', userSchema);

// const user = new Users({ 
//     username: 'johnDoe',
//     password: 'password123',
//     email: 'johndoe@example.com'
// });

// user.save()
//     .then(() => console.log('User saved to database'))
//     .catch((err) => console.error(err));