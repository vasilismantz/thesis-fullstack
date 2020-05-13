module.exports = (sequelize, Sequelize) => {
    const ApplicationType = sequelize.define("application_type", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        applicationType: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });

    return ApplicationType;
};