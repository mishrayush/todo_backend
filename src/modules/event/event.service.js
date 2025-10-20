const Event = require('./event.model');

const EventService = {
    // list: async () => {
    //     return await Event.find({ eventType: 'click', device: 'mobile' });
    // },
    list: async (page = 1, limit = 10, eventType, device) => {
        const skip = (page - 1) * limit;

        const filter = { eventType: 'click', device: 'mobile' };

        // Fetch paginated results
        const events = await Event.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        // Get total count
        const total = await Event.countDocuments(filter);

        return {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: events,
        };
    }
};


module.exports = EventService;