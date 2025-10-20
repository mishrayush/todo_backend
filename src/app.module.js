const userRoutes = require('./modules/user/user.routes');
const todoRoutes = require('./modules/todo/todo.routes');
const eventRoutes = require('./modules/event/event.routes');

function AppModule(app) {
  app.use('/api/users', userRoutes);
  app.use('/api/todo', todoRoutes);
  app.use('/api/event', eventRoutes);
}

module.exports = { AppModule };
