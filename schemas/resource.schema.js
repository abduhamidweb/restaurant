import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: [{
        type: String,
        required: true,
        trim: true
    }],
    space: [{
        type: String,
        required: true,
        trim: true
    }],
    videoLink: {
        type: String,
        required: true,
        trim: true
    },
    res_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}, {
    timestamps: true
});

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;