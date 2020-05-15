module.exports = (sequelize, Sequelize) => {
    const DaysHoliday = sequelize.define("days_holiday", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });

    return DaysHoliday;
};