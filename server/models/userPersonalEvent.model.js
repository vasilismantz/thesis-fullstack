module.exports = (sequelize, Sequelize) => {
    const UserPersonalEvent = sequelize.define("user_personal_event", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      eventTitle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      eventDescription: {
        type: Sequelize.STRING,
        allowNull: true
      },
      eventStartDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      eventEndDate: {
          type: Sequelize.DATE,
          allowNull: true
      }
    }, {
        timestamps: false,
        freezeTableName: true,
        underscored: true
    });
  
    return UserPersonalEvent;
  };