module.exports = (sequelize, Sequelize) => {
    const DaysWorking = sequelize.define("days_working", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        day: {
            type: Sequelize.STRING,
            allowNull: false
        },
        startingHour: {
            type: Sequelize.STRING,
            allowNull: false
        }, 
        endingHour: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });

    return DaysWorking;
};