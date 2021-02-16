const { validationResult } = require('express-validator');
const crypto = require("crypto");
const { client } = require("../../database/redis");
const { encrypt } = require("../../middleware/function");
const redisClient = client();

const userRoute = {
    /**
     * @api {post} /user/signup Registration
     * @apiName User Registration
     * @apiGroup User
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
     *         "secretKey":''
     *      }",
     *      "message": "Successfully Registered",
     *      "status": "1"
     * }
     * 
     * @apiSampleRequest /user/signup
     * 
     * @apiErrorExample {json} Signup error
     * HTTP/1.1 500 Internal Server Error
     */
    createUser: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {
                email,
                name,
                password
            } = req.body;
            redisClient.hgetall(email, (err, data) => {
                if (err) {
                    res.status(400).send(err);
                }
                if (!data) {
                    const secretKey = encrypt(`${name}%${email}%${password}`);
                    const hmacSignature = crypto.createHmac("sha256", secretKey).update(email).digest("hex");
                    redisClient.hmset(email, { name, password, secretKey }, (err) => {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.status(200).send({
                                data: {
                                    token: `${secretKey}.${hmacSignature}`,
                                },
                                messge: "Successfully Registered",
                                status: 1
                            });
                        }
                    });
                } else {
                    res.status(208).send({
                        messge: "User already registered",
                        status: 0
                    });
                }
            });
        } catch (e) {
            res.status(400).send(e);
        }
    },

    /**
     * @api {post} /user/login Login
     * @apiName User Login
     * @apiGroup User
     *
     * @apiParam (Request body) {String} email User's E-Mail.
     * @apiParam (Request body) {String} password Password.
     * @apiParamExample {json} Input
     * {
     *      "email" : "",
     *      "password" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "data": "{
     *         "token":''
     *      }",
     *      "message": "Successfully Logged in",
     *      "status": "1"
     * }
     * @apiSampleRequest /user/login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    login: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const {
                email,
                password
            } = req.body;
            redisClient.hgetall(email, (err, data) => {
                if (err) {
                    res.status(400).send(err);
                }
                if (data) {
                    if (data.password === password) {
                        const hmacSignature = crypto.createHmac("sha256", data.secretKey).update(email).digest("hex");
                        res.status(200).send({
                            data: {
                                token: `${data.secretKey}.${hmacSignature}`,
                            },
                            messge: "Successfully Logged in",
                            status: 1
                        });
                    } else {
                        res.status(400).send({
                            messge: "Invalid Password",
                            status: 0
                        });
                    }
                } else {
                    res.status(400).send({
                        messge: "User not found",
                        status: 0
                    });
                }
            });
        } catch (e) {
            res.status(400).send(e);
        }
    },
};

module.exports = userRoute;