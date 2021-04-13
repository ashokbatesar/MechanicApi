const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.body.token;
    if (!token) return res.send({ status: "failure", message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        if (req.body.action_taken_by) {
            if (req.body.action_taken_by == decoded) {
                next();
            } else {
                res.send({ status: "failure", message: "Invalid token. Please Logout and Login again" });
            }
        } else {
            if (req.body.id == decoded) {
                next();
            } else {
                res.send({ status: "failure", message: "Invalid token. Please Logout and Login again" });
            }
        }


    } catch (ex) {
        res.send({ status: "failure", message: "Invalid token." });
    }
};