module.exports = (sequelize, Sequelize) => {
    const UserFinancialInfo = sequelize.define("user_financial_info", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      employmentType: {
        type: Sequelize.ENUM,
        values: ['fullTime', 'partTime'],
        allowNull: false
      },
      salaryBasic: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      salaryGross: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      salaryNet: {
          type: Sequelize.INTEGER,
          allowNull: false
      },
      allowanceHouseRent: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      allowanceMedical: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      allowanceSpecial: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      allowanceFuel: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      allowancePhoneBill: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      allowanceOther: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      allowanceTotal: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      deductionProvidentFund: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      deductionTax: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      deductionOther: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      deductionTotal: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bankName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      accountName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      accountNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      iban: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, {
        timestamps: false,
        freezeTableName: true,
        underscored: true
    });
  
    return UserFinancialInfo;
  };