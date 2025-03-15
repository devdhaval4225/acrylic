const User = require("../../models/users.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const errorMessages = require("../../common/errorMessage");


exports.userDelete = async (req, res) => {
    try {
        await deleteUserValidationSchema.validate(req.body);
        const { password } = req.body;

        const userId = req.user.userId
        const checkUser = await User.findOne({ userId: userId })
        const checkPass = await bcrypt.compare(password, checkUser.password);
        if (checkPass != true) {
            res.status(404).json({
                message: "User not exitst.",
                status: 404
            })
        } else {

            const deleteUser = await User.deleteOne({userId: userId});

            res.clearCookie('jwt','', { expires: new Date(0) });

            res.status(200).json({
                message: "User delete sucessfully",
                status: 200
            })
        }

    } catch (error) {
        console.log("::user-delete-ERROR::", error);
        res.status(500).json({
            message: errorMessages.DATABASE_INTERNAL,
            status: 500
        })
    }
}


const deleteUserValidationSchema = Joi.object({
    password: Joi.string()
        .min(8)
        .max(48)
        .error(new Error(errorMessages.PASSWORD_ISSUE))
        .required(),
})