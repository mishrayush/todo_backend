const UserService = require('./user.service');

const UserController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await UserService.register(username, email, password);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await UserService.login(email, password);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  profile: async (req, res) => {
    try {
      const user = await UserService.getProfile(req.user.id);
      res.json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = UserController;
