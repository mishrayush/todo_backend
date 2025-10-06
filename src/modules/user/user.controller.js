const UserService = require('./user.service');

const UserController = {
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await UserService.register(username, email, password);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User LoggedIn successfully
 *       400:
 *         description: Bad request
 */
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
