module.exports = (sequelize, Sequelize) => {
    const DeptAnnouncement = sequelize.define("department_announcement", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        announcementTitle: {
            type: Sequelize.STRING,
            allowNull: false
        },
        announcementDescription: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true
    });

    return DeptAnnouncement;
};