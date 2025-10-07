const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./user.model");

const UserService = {
  register: async (username, email, password) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email already registered");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    return { id: user.id, username: user.username, email: user.email };
  },

  login: async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const token = jwt.sign({ id: user.id, email: user.email }, 's9lfpAvbJZK8KPfaVyE3Zau6H694Vno/xPoFYJQ/sRRHanovIXvLBYjBdZHfCp9ZW', { expiresIn: "2h" });
    return { token, user: { id: user.id, username: user.username, email: user.email } };
  },

  getProfile: async (userId) => {
    return await User.findById(userId).select("-password");
  },
};

module.exports = UserService;
