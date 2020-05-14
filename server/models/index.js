const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.user = require("./user.model")(sequelize, Sequelize);
db.userPersonalInfo = require("./userPersonalInfo.model")(sequelize, Sequelize)
db.userFinancialInfo = require("./userFinancialInfo.model")(sequelize, Sequelize)
db.userPersonalEvent = require("./userPersonalEvent.model")(sequelize, Sequelize)
db.userMessage = require("./userMessage.model")(sequelize, Sequelize)
db.department = require("./department.model")(sequelize, Sequelize);
db.deptAnnouncement = require("./deptAnnouncement.model")(sequelize, Sequelize);
db.organization = require("./organization.model")(sequelize, Sequelize);
db.job = require("./job.model")(sequelize, Sequelize);
db.jobHistory = require("./jobHistory.model")(sequelize, Sequelize);
db.attendance = require("./attendance.model")(sequelize, Sequelize);
db.application = require("./application.model")(sequelize, Sequelize);
db.applicationType = require("./applicationType.model")(sequelize, Sequelize);
db.daysWorking = require("./daysWorking.model")(sequelize, Sequelize);
db.daysHoliday = require("./daysHoliday.model")(sequelize, Sequelize);
db.payment = require("./payment.model")(sequelize, Sequelize);
db.expense = require("./expense.model")(sequelize, Sequelize);


//Organization Associations
db.organization.hasMany(db.user, {foreignKey: {allowNull: false}})
db.organization.hasMany(db.department, {foreignKey: {allowNull: false}})
db.organization.hasMany(db.attendance, {foreignKey: {allowNull: false}})
db.organization.hasMany(db.application, {foreignKey: {allowNull: false}})
db.organization.hasMany(db.payment, {foreignKey: {allowNull: false}})
db.organization.hasMany(db.expense, {foreignKey: {allowNull: false}})
db.organization.hasMany(db.daysWorking, {foreignKey: {allowNull: false}})
db.organization.hasMany(db.daysHoliday, {foreignKey: {allowNull: false}})

//User Associations
db.user.hasOne(db.userPersonalInfo, {foreignKey: {allowNull: false}})
db.user.hasOne(db.userFinancialInfo, {foreignKey: {allowNull: false}})
db.user.hasMany(db.userPersonalEvent, {foreignKey: {allowNull: false}})
db.user.hasMany(db.userMessage, {foreignKey: {name:'receiver', allowNull: false}})
db.user.hasMany(db.payment, {foreignKey: {allowNull: false}})
db.user.hasMany(db.expense, {foreignKey: {allowNull: false}})
db.user.hasMany(db.attendance, {foreignKey: {allowNull: false}})
db.user.hasMany(db.jobHistory, {foreignKey: {allowNull: false}})

//Department Associations
db.department.hasMany(db.user)
db.department.hasMany(db.deptAnnouncement, {foreignKey: {allowNull: false}})
db.department.hasMany(db.job, {foreignKey: {allowNull: false}})

//DeptAnnouncement Associations
db.deptAnnouncement.belongsTo(db.user, {foreignKey: {name:'created_by_user_id', allowNull: false}})

//ApplicationType Associations
db.applicationType.hasMany(db.application, {foreignKey: {allowNull: false}})

//Job Associations
db.job.hasMany(db.jobHistory, {foreignKey: {allowNull: false}})

//Message Associations
db.userMessage.belongsTo(db.user, {foreignKey: {name:'sender', allowNull: false}})

module.exports = db;