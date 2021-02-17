const schedule = require('node-schedule');
const moment = require('moment');
const { scheduledTask } = require('./function');
const { client } = require("../../database/redis");
const redisClient = client();


const taskRoute = {
    /**
    * @api {post} /task Task Creation
    * @apiName Task Creation
    * @apiGroup Task
    *
    * @apiHeader {String} Authorization
    * 
    * @apiSuccessExample {json} Success
    * HTTP/1.1 200 OK
    * {
    *      "message": "Task Queued",
    *      "status": "1"
    * }
    * 
    * @apiSampleRequest /task
    * 
    * @apiErrorExample {json} Task Creation error
    * HTTP/1.1 500 Internal Server Error
    */
    createTask: async (req, res) => {
        try {
            redisClient.get(`Task_${req.email}`, (err, data) => {
                if (err) {
                    console.log(err);
                }
                const taskId = data ? JSON.parse(data).length + 1 : 1;
                const startTime = moment().toDate();
                const endTime = moment(startTime).add(process.env.TASK_LIFE_TIME_HOUR, 'hours').toDate();
                const task = {
                    taskId,
                    createdDate: startTime,
                    expireDate: endTime,
                    status: 'Running',
                    triggredCount: 1,
                };
                schedule.scheduleJob({
                    start: startTime, end: endTime,
                    rule: `*/${process.env.TASK_SCHEDULE_MINS} * * * *`
                }, (taskTime) => scheduledTask(req.email, task, taskTime));

                res.status(200).send({
                    messge: 'Task Queued',
                    status: "1"
                });
            });
        } catch (e) {
            res.status(400).send(e);
        }
    },

    /**
     * @api {get} /task Task details
     * @apiName Task Details
     * @apiGroup Task
     *
     * @apiHeader {String} Authorization
     * 
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Task Details Fetched",
     *      "status": "1"
     * }
     * 
     * @apiSampleRequest /task
     * 
     * @apiErrorExample {json} Task Creation error
     * HTTP/1.1 500 Internal Server Error
     */
    getTask: async (req, res) => {
        try {
            redisClient.get(`Task_${req.email}`, (err, data) => {
                if (err) {
                    console.log(err);
                }
                if (data) {
                    res.status(200).send({
                        data: JSON.parse(data),
                        message: "Task Details Fetched",
                        status: 1
                    });
                } else {
                    res.status(200).send({
                        data: [],
                        message: "No Tasks are available for this user",
                        status: 1
                    });
                }
            });
        } catch (e) {
            res.status(400).send(e);
        }
    },
};

module.exports = taskRoute;