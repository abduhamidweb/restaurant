import mongoose, {
    Types
} from "mongoose";
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
    phone: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                const regex = /^\+998\d{9}$/;
                return regex.test(value);
            },
            message: 'Telefon raqami noto‘g‘ri formatda yuborilgan.'
        },
        set: (value) => value.replace(/[^0-9+]/g, '')
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    num_people: {
        type: Number,
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

export default mongoose.model('Zakaz', zakazSchema);