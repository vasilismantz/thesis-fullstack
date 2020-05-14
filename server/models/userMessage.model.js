module.exports = (sequelize, Sequelize) => {
    const UserMessage = sequelize.define("user_message", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
        timestamps: false,
        freezeTableName: true,
        underscored: true
    });
  
    return UserMessage;
  };