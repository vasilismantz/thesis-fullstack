module.exports = (sequelize, Sequelize) => {
    const Expense = sequelize.define("expense", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        expenseItemName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expenseItemStore: {
            type: Sequelize.STRING,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        amount: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });

    return Expense;
};