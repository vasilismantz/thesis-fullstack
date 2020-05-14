module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define("job", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      jobTitle: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });
  
    return Job;
  };