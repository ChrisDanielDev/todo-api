// Middleware to check resource ownership
const { Todo } = require("../models");

function checkToDoOwnership(req, res, next) {
  const todoId = req.params.id;
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Assuming the Sequelize model has an `ownerId` property for the resource
  Todo.findOne({ where: { id: todoId } }).then(resource => {
    if (!resource) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (resource.UserId !== user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  });
}

module.exports = { checkToDoOwnership };
