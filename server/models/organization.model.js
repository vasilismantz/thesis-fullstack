module.exports = (sequelize, Sequelize) => {
    const Organization = sequelize.define("organization", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      organizationName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        unique: {
          args: 'organizationName',
          msg: 'This Organizaiton Name is already taken!'
        }
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      emailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      physicalAddress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
          type: Sequelize.STRING,
          allowNull: false
      },
      country: {
          type: Sequelize.STRING,
          allowNull: false
      },
      phone: {
          type: Sequelize.INTEGER,
          allowNull: true
      },
      websiteAddress: {
          type: Sequelize.STRING,
          allowNull: true
      }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true
    });
  
    return Organization;
  };