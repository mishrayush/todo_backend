const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eventId: { type: String, required: true, unique: true },
    eventType: { type: String, index: true },
    userId: String,
    pageUrl: String,
    timestamp: Date,
    device: { type: String, index: true },
    location: {
        city: String,
        country: String,
    },
    elementId: String,
    scrollDepth: String,
    contentId: String,
    commentText: String,
});



// Create index
eventSchema.index({ eventType: 1, device: 1 });

module.exports = mongoose.model("event", eventSchema);
