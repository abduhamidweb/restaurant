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

// const boss = new bosss({ 
//     bossname: 'johnDoe',
//     password: 'password123',
//     email: 'johndoe@example.com'
// });

// boss.save()
//     .then(() => console.log('boss saved to database'))
//     .catch((err) => console.error(err));