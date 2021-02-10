module.exports = (sequelize, Sequelize) => {
    const Subscribers = sequelize.define("subscribers", {
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      }
    });
  
    return Subscribers;
  };
  