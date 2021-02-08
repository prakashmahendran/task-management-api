
const crypto = require("crypto");
const sharedSecret = "super-secret";

const auth = async (req, res, next) => {
    try {
        const retrievedSignature = req.header("Authorization").replace("Bearer ", "");

        const computedSignature = crypto.createHmac("sha256", sharedSecret).update(req.url).digest("hex");
        // Compare signatures.
        if (computedSignature === retrievedSignature) {
            req.token = retrievedSignature;
            next();
        } else {
            throw new Error("Invalid Token");
        }

    } catch (e) {
        res.status(401).send({ error: e.message });
    }
};

module.exports = auth;