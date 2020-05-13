module.exports = (sequelize, Sequelize) => {
    const UserPersonalInfo = sequelize.define("user_personal_info", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM,
        values: ['male', 'female'],
        allowNull: false
      },
      maritalStatus: {
        type: Sequelize.ENUM,
        values: ['married', 'single', 'widowed'],
        allowNull: false
      },
      fatherName: {
          type: Sequelize.STRING,
          allowNull: false
      },
      nationality: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: true
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
        type: Sequelize.INTEGER,
        allowNull: false
      },
      phone: {
        type: Sequelize.INTEGER,
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