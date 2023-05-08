import mongoose from "mongoose";
const {
    Schema
} = mongoose;

const zakazSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    num_people: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: false
    }
});

export default mongoose.model('Zakaz', zakazSchema);


