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
db.organization.hasMany(db.user)
db.organization.hasMany(db.department)
db.organization.hasMany(db.attendance)
db.organization.hasMany(db.application)
db.organization.hasMany(db.payment)
db.organization.hasMany(db.expense)
db.organization.hasMany(db.daysWorking)
db.organization.hasMany(db.daysHoliday)

//User Associations
db.user.hasOne(db.userPersonalInfo)
db.user.hasOne(db.userFinancialInfo)
db.user.hasMany(db.userPersonalEvent)
db.user.hasMany(db.userMessage, {foreignKey: 'receiver'})
db.user.hasMany(db.payment)
db.user.hasMany(db.expense)
db.user.hasMany(db.attendance)
db.user.hasMany(db.jobHistory)

//Department Associations
db.department.hasMany(db.user)
db.department.hasMany(db.deptAnnouncement)
db.department.hasMany(db.job)

//DeptAnnouncement Associations
db.deptAnnouncement.belongsTo(db.user, {foreignKey: 'created_by_user_id'})

//ApplicationType Associations
db.applicationType.hasMany(db.application)

//Job Associations
db.job.hasMany(db.jobHistory)

//Message Associations
db.userMessage.belongsTo(db.user, {foreignKey: 'sender'})

module.exports = db;