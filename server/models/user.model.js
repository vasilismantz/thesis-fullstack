module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        unique: {
          args: 'username',
          msg: 'This username is already taken!'
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM,
        values: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_EMPLOYEE'],
        allowNull: false
      },
      active: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          validate: {
            notEmpty: true
          }
      }
    }, {
        timestamps: false,
        underscored: true,
        freezeTableName: true
    });
  
    return User;
  };