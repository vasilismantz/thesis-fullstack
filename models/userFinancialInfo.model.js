module.exports = (sequelize, Sequelize) => {
    const UserFinancialInfo = sequelize.define("user_financial_info", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      employmentType: {
        type: Sequelize.ENUM,
        values: ['Full Time', 'Part Time'],
        allowNull: true
      },
      salaryBasic: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      salaryGross: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      salaryNet: {
          type: Sequelize.INTEGER,
          allowNull: true
      },
      allowanceHouseRent: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      allowanceMedical: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      allowanceSpecial: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      allowanceFuel: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      allowancePhoneBill: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      allowanceOther: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      allowanceTotal: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      deductionProvidentFund: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      deductionTax: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      deductionOther: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      deductionTotal: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      bankName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      accountName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      accountNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      iban: {
        type: Sequelize.STRING,
        allowNull: true
      }
    }, {
        timestamps: false,
        freezeTableName: true,
        underscored: true
    });
  
    return UserFinancialInfo;
  };