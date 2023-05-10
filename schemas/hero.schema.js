import mongoose, {
    Types
} from "mongoose";
const {
    Schema
} = mongoose;

const heroSchema = new Schema({
    imgLink: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    res_id: {
        type: Types.ObjectId,
        required: true,
        ref: "Restaurant"
    }
});

export default mongoose.model('Hero', heroSchema);