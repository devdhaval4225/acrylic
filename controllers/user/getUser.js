const User = require("../../models/users.model");

exports.getUser = async (req, res) => {
    try {
        const id = req.user.userId
        const showData = await User.findOne({ userId: id }).select([
            "userId",
            "name",
            "email",
            "createdAt",
            "updatedAt"
        ])
        if (showData == null) {
            res.status(404).json({
                message: "user not exitst.",
                status: 404
            })
        } else {
            res.status(200).json({
                message: "user show",
                status: 200,
                data: showData
            })
        }
    } catch (error) {
        console.log("::user-show-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}