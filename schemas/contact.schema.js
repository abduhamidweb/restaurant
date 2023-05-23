import mongoose, {
    Types
} from "mongoose";
const {
    Schema
} = mongoose;
import validator from "validator";
import dns from 'dns';
import {
    promisify
} from 'util';
const resolveMxAsync = promisify(dns.resolveMx);
const ContactSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (value) {
                if (!validator.isEmail(value)) {
                    return false;
                }
                const domain = value.split('@')[1];
                try {
                    const mxRecords = await resolveMxAsync(domain);
                    const hasGoogleMxRecord = mxRecords.some((record) => record.exchange.includes('google'));
                    return hasGoogleMxRecord;
                } catch (error) {
                    return false;
                }
            },
            message: 'Email haqiqiy Google akaunt bo‘lishi kerak.'
        }
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