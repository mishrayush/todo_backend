const userRoutes = require('./modules/user/user.routes');

function AppModule(app) {
  app.use('/api/users', userRoutes);
}

module.exports = { AppModule };
