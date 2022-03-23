const utils = require('../utils/utils');

module.exports = authorize;

function authorize(Roles = []) {
    if (typeof Roles === 'string') {
        Roles = [Roles];
    }

    return [
        (req, res, next) => {
            try {
                if (!req.headers.authorization) {
                    return res.status(401).json({ message: "Jwt token is missing in request", statusCode: res.statusCode, error: true });
                }
                let token = req.headers.authorization.split(' ')[1];

                let result = utils.decodeJWTToken(token)
                req.userDetails = result;

                if (Roles.length && !Roles.includes(req.userDetails.role)) {
                    return res.status(401).json({
                        statusCode: res.statusCode, error: true, message: "Permission denied"
                    });
                }

                next();
            } catch (err) {
                console.log("jwt error >> " + err);
                return res.status(400).json({ statusCode: res.statusCode, error: true, message: "JWT Token is expired or invalid" });
            }
        }
    ];
}