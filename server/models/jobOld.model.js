module.exports = (sequelize, Sequelize) => {
    const JobOld = sequelize.define("job_old", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      jobTitle: {
        type: Sequelize.STRING,
        allowNull: false
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });
  
    return JobOld;
  };