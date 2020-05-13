module.exports = (sequelize, Sequelize) => {
    const Attendance = sequelize.define("attendance", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        attendance: {
            type: Sequelize.ENUM,
            values: ['P', 'A'],
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        reason: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });

    return Attendance;
};