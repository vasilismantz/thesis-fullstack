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

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('this is the index for api')
});

router.use('/organization', organizationRouter)
router.use('/user', userRouter)
router.use('/department', departmentRouter)
router.use('/departmentAnnouncement', departmentAnnouncementRouter)
router.use('/job', jobRouter)
router.use('/daysHoliday', daysHolidayRouter)
router.use('/daysWorking', daysWorkingRouter)
router.use('/expense', expenseRouter)
router.use('/payment', paymentRouter)
router.use('/application', applicationRouter)
router.use('/message', userMessageRouter)
router.use('/personalEvent', userPersonalEventRouter)
router.use('/personalInformation', userPersonalInformationRouter)

module.exports = router;
