
const taskRoute = {
    createTask: async (req, res) => {
        try {
            res.status(201).send({ messge: 'Task Created' });
        } catch (e) {
            res.status(400).send(e);
        }
    },
    getTask: async (req, res) => {
        try {
            res.status(201).send({ messge: 'User Task' });
        } catch (e) {
            res.status(400).send(e);
        }
    },
};

module.exports = taskRoute;