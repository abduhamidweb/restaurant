import mongoose, {
    Types
} from "mongoose"
import Joi from "joi";
import validator from "validator";
import dns from 'dns';
import {
    promisify
} from 'util';
const resolveMxAsync = promisify(dns.resolveMx);
const WorkerSchema = new mongoose.Schema({
    username: {
        type: String,
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
    password: {
        type: String,
        validate: {
            validator: (value) => value.length >= 6,
            message: 'Parol kamida 6 belgidan iborat bo‘lishi kerak.'
        }
    },
    userPhone: {
        type: String,
        validate: {
            validator: (value) => {
                const regex = /^\+998\d{9}$/;
                return regex.test(value);
            },
            message: 'Telefon raqami noto‘g‘ri formatda yuborilgan.'
        },
        set: (value) => value.replace(/[^0-9+]/g, '')
    },
    userInfo: {
        type: String,
    },
    workingTime: {
        type: String,
    },
    userPhoto: {
        type: String,
    },
    salary: {
        type: String,
    },
    rol: {
        type: String,
    },
    res_id: {
        type: Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the users model from the schema
const Worker = mongoose.model('Worker', WorkerSchema);

export default Worker;