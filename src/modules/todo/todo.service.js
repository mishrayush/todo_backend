const Todo = require("./todo.model");

const TodoService = {
    create: async (userId, title) => {
        const todo = new Todo({ userId, title });
        await todo.save();
        return todo;
    },

    list: async (userId) => {
        return await Todo.find({ userId });
    },

    update: async (id, userId, data) => {
        return await Todo.findOneAndUpdate({ _id: id, userId }, data, { new: true });
    },

    delete: async (id, userId) => {
        await Todo.findOneAndDelete({ _id: id, userId });
        return { message: "Todo deleted" };
    },
};

module.exports = TodoService;
