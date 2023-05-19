import mongoose, {
    Types
} from "mongoose";
const {
    Schema
} = mongoose;
import Joi from "joi";
const ContactSchema = new Schema({
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