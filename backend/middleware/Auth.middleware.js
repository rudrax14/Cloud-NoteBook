var jwt = require('jsonwebtoken');
require("dotenv").config()

exports.auth = (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "") || req.body.token || req.cookies.token
        // console.log("secret", process.env.JWT_SECRET);
        // console.log("auth-token", token);

        // Check if token is missing
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token Missing',
            });
        }

        // Verify the token/ Check if token is valid
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log('decode', decode);
            req.user = decode;
            next(); // Call next middleware
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying token"
        });
    }

}