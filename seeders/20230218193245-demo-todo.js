const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create sample users
    const users = await queryInterface.bulkInsert('Users', [
      {
        name: 'Mihai Calin',
        email: 'mihai.calin@example.com',
        password: await bcrypt.hash('Password123!', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Maria Dinulescu',
        email: 'maria.dinulescu@example.com',
        password: await bcrypt.hash('Password123!', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Vlad Ivanov',
        email: 'vlad.ivanov@example.com',
        password: await bcrypt.hash('Password123!', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create sample todos related to planning movie scenes
    const todos = await queryInterface.bulkInsert('Todos', [
      {
        description: 'Read the movie script and highlight the key scenes that need to be planned in detail.',
        completed: false,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Create a storyboard for the key scenes to visualize the shots and plan the camera movements and blocking.',
        completed: false,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Schedule rehearsals for the key scenes to work out the details with the actors and crew.',
        completed: false,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Meet with the director and cinematographer to discuss the key scenes and plan the camera angles, lighting, and other details.',
        completed: false,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Schedule a meeting with the production designer to discuss the set design for the key scenes.',
        completed: false,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Prepare a detailed shot list for the key scenes to ensure that all the shots are covered.',
        completed: false,
        UserId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Scout potential locations for the key scenes and make a list of pros and cons for each one.',
        completed: false,
        UserId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Schedule a meeting with the location manager to discuss the logistics of shooting at the selected locations.',
        completed: false,
        UserId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    return { users, todos };
  },

  down: async (queryInterface, Sequelize) => {
    // Delete all todos and users
    await queryInterface.bulkDelete('Todos', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
