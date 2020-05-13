module.exports = (sequelize, Sequelize) => {
    const JobHistory = sequelize.define("job_history", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      startDate: {
          type: Sequelize.DATE,
          allowNull: false
      },
      endDate: {
          type: Sequelize.DATE,
          allowNull: true
      }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });
  
    return JobHistory;
  };