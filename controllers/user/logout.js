const User = require("../../models/users.model");

exports.logout = async (req, res) => {
    try {
        const userId = req.user.userId

        const findUser = await User.findOne({userId: userId})
        const currentToken = req.cookies.jwt
        const removeToken = findUser.tokens.filter((obj) => obj.token !== currentToken)
        res.clearCookie('jwt','', { expires: new Date(0) });

        const userUpdate = await User.findByIdAndUpdate(
            {
                _id: findUser._id
            },
            {
                $set: {
                        tokens: removeToken
    
                }
            },
            {
                new: true
            }
        );
        res.status(200).json({
            message: "logout successfully",
            status: 200,
        })

    } catch (error) {
        console.log("::user-logout-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}