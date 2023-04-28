import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    distance: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    variant: {
        type: String,
        required: true
    },
    wheel: {
        type: Boolean,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});
export default mongoose.model('Post', postSchema);