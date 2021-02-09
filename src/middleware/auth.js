
const crypto = require("crypto");
const { decrypt } = require("./function");

const auth = async (req, res, next) => {
    try {
        const authhead = req.header("Authorization");
        if (authhead) {
            const retrievedToken = authhead.replace("Bearer ", "");
            const {
                0: sharedSecret,
                1: retrievedSignature
            } = retrievedToken.split('.');

            const {
                0: user,
                1: email
            } = decrypt(sharedSecret).split('%');

            const computedSignature = crypto.createHmac("sha256", sharedSecret).update(email).digest("hex");
            // Compare signatures.
            if (computedSignature === retrievedSignature) {
                req.token = retrievedSignature;
                req.user = user;
                req.email = email;
                next();
            } else {
                throw new Error("Invalid Token");
            }
        } else {
            throw new Error("Authorization Token Required");
        }
    } catch (e) {
        res.status(401).send({ error: e.message });
    }
};

module.exports = auth;