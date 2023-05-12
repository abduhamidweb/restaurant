import mongoose, {
    Types
} from "mongoose";
const {
    Schema
} = mongoose;

const photoSchema = new Schema({
    imgLink: {
        type: String,
        required: true
    },
    res_id: {
        type: Types.ObjectId,
        required: true,
        ref: "Restaurant"
    }
});

export default mongoose.model('Photo', photoSchema);