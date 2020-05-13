module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define("department", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        departmentName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true
    });

    return Department;
};