module.exports = (sequelize, Sequelize) => {
    const Organization = sequelize.define("organization", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      organizationName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      emailAddress: {
        type: Sequelize.STRING,
        allowNull: false
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