const User = require("../../models/users.model");
const bcrypt = require("bcrypt");
const sendEmail = require("../../services/mail.helper");
const mailTemplate = require("../../services/mailTemplate");
const Joi = require("joi");
const errorMessages = require("../../common/errorMessage");

exports.forgetPassword = async (req, res) => {
    try {
        await forgetPasswordValidationSchema.validate(req.body);

        const email = req.body.email
        const checkEmail = await User.findOne({ email: email });
        if (checkEmail == null) {
            res.status(401).json({
                message: "email is not valid",
                status: 401
            })
        } else {
            const newPass = Math.floor(Math.random() * 1000000).toString();
            const decrePass = await bcrypt.hash(newPass, 10);
            const token = await checkEmail.userGenerateAuthtoken();
            const userUpdate = await User.findByIdAndUpdate(
                {
                    _id: checkEmail.id
                },
                {
                    $set: {
                        password: decrePass,
                        token: token

                    }
                },
                {
                    new: true
                }
            );
            const message = `Your FORGET PASSWORD is :-   ${newPass}`;
            const massageHTML = mailTemplate.forgetPasswordTemplate(checkEmail.name,newPass);
            const mailObj = {
                from: process.env.FROM_MAIL,
                to: checkEmail.email,
                subject: "Forget Password",
                html: message,
                // html: massageHTML,
              }
            await sendEmail(mailObj);

            res.status(200).json({
                message: "SEND MAIL ON YOUR REGISTER MAIL ADDRESS FOR FORGET PASSWORD",
                status: 200
            })
        }
    } catch (error) {
        console.log("::user-forgetPassword-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

const forgetPasswordValidationSchema = Joi.object({
    email: Joi.string()
        .min(3)
        .max(100)
        .email()
        .error(new Error(errorMessages.EMAIL_ISSUE))
        .required(),
})
