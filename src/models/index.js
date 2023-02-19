const { Sequelize, DataTypes } = require('sequelize');

const db_host = process.env.PGHOST || 'localhost';
// Create a Sequelize instance
const sequelize = new Sequelize(`postgres://postgres:mysecretpassword@${db_host}:5432/todos`);

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const Todo = sequelize.define('Todo', {
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});


const RevokedToken = sequelize.define('revokedTokens', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  revokedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

// Set up the one-to-many relationship between User and Todo
User.hasMany(Todo, { onDelete: 'cascade' });
Todo.belongsTo(User);

module.exports = {
  Todo,
  User,
  RevokedToken,
};
