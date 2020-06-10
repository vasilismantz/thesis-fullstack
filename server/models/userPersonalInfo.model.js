module.exports = (sequelize, Sequelize) => {
    const UserPersonalInfo = sequelize.define("user_personal_info", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM,
        values: ['Male', 'Female'],
        allowNull: false
      },
      maritalStatus: {
        type: Sequelize.ENUM,
        values: ['Married', 'Single', 'Widowed'],
        allowNull: false
      },
      fatherName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      emailAddress: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
        timestamps: false,
        freezeTableName: true,
        underscored: true
    });
  
    return UserPersonalInfo;
  };