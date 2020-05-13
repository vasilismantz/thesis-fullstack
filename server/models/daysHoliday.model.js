module.exports = (sequelize, Sequelize) => {
    const DaysHoliday = sequelize.define("days_holiday", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false,
            unique: true
        },
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });

    return DaysHoliday;
};