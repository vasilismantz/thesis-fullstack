module.exports = (sequelize, Sequelize) => {
    const Application = sequelize.define("application", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        reason: {
            type: Sequelize.STRING,
            allowNull: true
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        endDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM,
            values: ['approved', 'rejected', 'pending'],
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });

    return Application;
};