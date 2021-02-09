
const crypto = require("crypto");
/**
    * @api {post} /generateclienttoken Generate Auth Token
    * @apiName Generate Token
    * @apiGroup Client Side 
    *
    * @apiParam (Request body) {String} secretKey User's secretKey.
    * @apiParam (Request body) {String} email User's Email.
    * @apiParamExample {json} Input
    * {
    *      "secretKey" : "",
    *      "email" : "",
    * }
    * @apiSuccessExample {json} Success
    * HTTP/1.1 200 OK
    * {
    *      "data": "{
    *         "token":''
    *      }",
    *      "message": "Token Generated",
    *      "status": "1"
    * }
    * @apiSampleRequest /user/generateToken
    * @apiErrorExample {json} Login error
    * HTTP/1.1 500 Internal Server Error
    */
const generateTokenClient = async (req, res) => {
    try {
        const hmacSignature = crypto.createHmac("sha256", req.body.secretKey).update(req.body.email).digest("hex");
        const token = `Bearer ${req.body.secretKey}.${hmacSignature}`;
        res.status(200).send({
            data: {
                token,
            },
            messge: 'Token Generated',
            status: 1
        });

    } catch (e) {
        res.status(401).send({ error: e.message });
    }
};

module.exports = generateTokenClient;