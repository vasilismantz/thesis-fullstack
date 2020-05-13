module.exports = (sequelize, Sequelize) => {
    const DaysWorking = sequelize.define("days_working", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        day: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });

    return DaysWorking;
};