const userRoutes = require('./modules/user/user.routes');
const todoRoutes = require('./modules/todo/todo.routes')

function AppModule(app) {
  app.use('/api/users', userRoutes);
  app.use('/api/todo', todoRoutes);
}

module.exports = { AppModule };
