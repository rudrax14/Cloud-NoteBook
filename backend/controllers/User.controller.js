const User = require("../models/User");


exports.fetchUsers = async (req, res) => {
    try {
        const users = await User.findById(req.user.id);
        users.password = undefined; // remove password from response
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        });
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "Users cannot be fetched,Please try again later",
        })
    }
}