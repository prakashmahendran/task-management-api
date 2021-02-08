
const userRoute = {
    /**
     * @api {get} /user/:id Request User information
     * @apiName GetUser
     * @apiGroup User
     *
     * @apiParam {Number} id User's unique ID.
     *
     * @apiSuccess {String} firstname Firstname of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     */
    createUser: async (req, res) => {
        try {
            res.status(201).send({ messge: 'User Created' });
        } catch (e) {
            res.status(400).send(e);
        }
    },
    login: async (req, res) => {
        try {
            res.status(201).send({ messge: 'User Logged in' });
        } catch (e) {
            res.status(400).send(e);
        }
    },
};

module.exports = userRoute;