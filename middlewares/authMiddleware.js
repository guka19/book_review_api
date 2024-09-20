const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer", "");

    if (!token) {
        return res.status(404).json({ message: "Access denied, No token provided" });
    }


    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(401).json({ message: "Invalid Token"});
    }
}

module.exports = authenticate;