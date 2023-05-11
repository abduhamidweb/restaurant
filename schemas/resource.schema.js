import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true
    },
    description: [{
        type: String,
        trim: true
    }],
    space: [{
        type: String,
        trim: true
    }],
    videoLink: {
        type: String,
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