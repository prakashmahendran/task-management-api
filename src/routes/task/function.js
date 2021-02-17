const { client } = require("../../database/redis");
const moment = require('moment');
const redisClient = client();

const scheduledTask = (email, task, taskTime) => {
    const key = `Task_${email}`;
    redisClient.get(key, (err, data) => {
        if (err) {
            console.log(err);
        }
        let tasks = [];
        if (!data) {
            tasks.push(task);
        } else {
            tasks = JSON.parse(data);
            const taskIndex = tasks.findIndex(t => t.taskId === task.taskId);
            if (taskIndex >= 0) {
                tasks[taskIndex].triggredCount += 1;
                tasks[taskIndex].lastRuntime = moment(taskTime).toDate();
                const nextRuntime = moment().add(process.env.TASK_SCHEDULE_MINS, 'minutes').toDate();
                if (new Date(tasks[taskIndex].expireDate).getTime() <= nextRuntime.getTime()) {
                    tasks[taskIndex].status = 'Expired';
                } else {
                    tasks[taskIndex].nextRuntime = nextRuntime;
                }
            } else {
                tasks.push(task);
            }
        }
        redisClient.set(key, JSON.stringify(tasks), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(`${key} : Task ${task.taskId} is Running`);
            }
        });
    });
};

module.exports = { scheduledTask };