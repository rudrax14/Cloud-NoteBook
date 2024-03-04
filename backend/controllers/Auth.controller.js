const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if all fields are filled
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists",
            });
        }

        // Secure password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create Entry for User
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            // If role is required, make sure it's defined in the request or provide a default value
        });

        return res.status(201).json({
            success: true,
            message: "User Created Successfully",
            data: user
        });
    } catch (err) {
        console.error("Error in user registration:", err);
        return res.status(500).json({
            success: false,
            message: "User registration failed. Please try again later.",
        });
    }
};

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully",
            })
        }

        // check if all fields are filled
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            })
        }

        // check for register user 
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist",
            });
        }
        // Verify password & generate a JWT token

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };


        // compare password
        let isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch); // returns true or false
        if (!isMatch) {
            // If passwords don't match, send response without password
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials, Password does not match",
            });
        }


        // password match
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        user.password = undefined; // remove password from response


        res.status(200).json({
            success: true,
            user,
            token,
            message: "User loged in successfully"
        });

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "User cannot be login,Please try again later",
        })
    }
}