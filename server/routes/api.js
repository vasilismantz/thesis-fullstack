var express = require('express');
var router = express.Router();

var organizationRouter = require('./organization.routes')
var userRouter = require('./user.routes')
var departmentRouter = require('./department.routes')
var departmentAnnouncementRouter = require('./departmentAnnouncement.routes')
var jobRouter = require('./job.routes')
var daysHolidayRouter = require('./daysHoliday.routes')
var daysWorkingRouter = require('./daysWorking.routes')
var expenseRouter = require('./expense.routes')
var paymentRouter = require('./payment.routes')
var applicationRouter = require('./application.routes')
var userMessageRouter = require('./userMessage.routes')
var userPersonalEventRouter = require('./userPersonalEvent.routes')
var userPersonalInformationRouter = require('./userPersonalInformation.routes')
var userFinancialInformationRouter = require('./userFinacnialInformation.routes')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('this is the index for api')
});

router.use('/organizations', organizationRouter)
router.use('/users', userRouter)
router.use('/departments', departmentRouter)
router.use('/departmentAnnouncements', departmentAnnouncementRouter)
router.use('/jobs', jobRouter)
router.use('/daysHolidays', daysHolidayRouter)
router.use('/daysWorkings', daysWorkingRouter)
router.use('/expenses', expenseRouter)
router.use('/payments', paymentRouter)
router.use('/applications', applicationRouter)
router.use('/messages', userMessageRouter)
router.use('/personalEvents', userPersonalEventRouter)
router.use('/personalInformations', userPersonalInformationRouter)
router.use('/financialInformations', userFinancialInformationRouter)

module.exports = router;
