
const taskRoute = {
    /**
    * @api {post} /task Task Creation
    * @apiName Task Creation
    * @apiGroup Task
    *
    * @apiHeader {String} Authorization
    * 
    * @apiParam (Request body) {String} name User's Full Name.
    * @apiParam (Request body) {String} email User's E-Mail.
    * @apiParam (Request body) {String} password Password.
    * 
    * @apiParamExample {json} Input
    * {
    *      "name" : "",
    *      "email" : "",
    *      "password" : "",
    * }
    * 
    * @apiSuccessExample {json} Success
    * HTTP/1.1 200 OK
    * {
    *      "data": "{
    *         "token":''
    *      }",
    *      "message": "Successfully Registered",
    *      "status": "1"
    * }
    * 
    * @apiSampleRequest /task
    * 
    * @apiErrorExample {json} Signup error
    * HTTP/1.1 500 Internal Server Error
    */
    createTask: async (req, res) => {
        try {
            // to do
            res.status(201).send({
                messge: 'Task Created',
                user: req.user,
                email: req.email
            });
        } catch (e) {
            res.status(400).send(e);
        }
    },
    getTask: async (req, res) => {
        try {
            // to do
            res.status(201).send({ messge: 'User Task' });
        } catch (e) {
            res.status(400).send(e);
        }
    },
};

module.exports = taskRoute;