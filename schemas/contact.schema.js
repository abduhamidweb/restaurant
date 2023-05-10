import mongoose, {
    Types
} from "mongoose";
const {
    Schema
} = mongoose;

const ContactSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: false
    },
    res_id: {
        type: Types.ObjectId,
        ref: 'Restaurant'
    }
});

export default mongoose.model('Contact', ContactSchema);