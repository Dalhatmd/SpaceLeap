const mongoose = require('mongoose');
const WorkSpaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    capacity: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    amenities: {
        type: [String],
        required: true
    },
    images: {
        type: [String],
        required: true,
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    type: {
        type: String,
        enum: ['office', 'meeting_room', 'event_space', 'desk_space'],
        required: true
    }
});
