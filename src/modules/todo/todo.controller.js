const TodoService = require("./todo.service");

const TodoController = {
    create: async (req, res) => {
        try {
            const todo = await TodoService.create(req.user.id, req.body.title);
            res.status(201).json(todo);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    list: async (req, res) => {
        try {
            const todos = await TodoService.list(req.user.id);
            res.json(todos);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const todo = await TodoService.update(req.params.id, req.user.id, req.body);
            res.json(todo);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const result = await TodoService.delete(req.params.id, req.user.id);
            res.json(result);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
};

module.exports = TodoController;
