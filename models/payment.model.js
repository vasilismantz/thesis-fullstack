module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        paymentType: {
            type: Sequelize.ENUM,
            values: ['Check', 'Bank Transfer', 'Cash'],
            allowNull: false
        },
        paymentMonth: {
            type: Sequelize.DATE,
            allowNull: false
        },
        paymentDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        paymentFine: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        paymentAmount: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        comments: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    });

    return Payment;
};