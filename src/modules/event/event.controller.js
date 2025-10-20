const EventService = require('./event.service');


const EventController = {
    list: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const { eventType, device } = req.query;

            // Pass params to service
            const events = await EventService.list({ page, limit, eventType, device });

            res.json(events);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

}

module.exports = EventController;