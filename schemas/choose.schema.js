import mongoose, {
    Types
} from "mongoose";
const {
    Schema
} = mongoose;

const chooseCard = new Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: false
    },
    res_id: {
        type: Types.ObjectId,
        required: true,
        ref: "Restaurant"
    }
});

export default mongoose.model('Choose', chooseCard);