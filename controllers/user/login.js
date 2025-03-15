const User = require("../../models/users.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const errorMessages = require("../../common/errorMessage");
const commonFunction = require("../../common/commonFunction");
const jwt = require("jsonwebtoken");


exports.login = async (req, res) => {
    try {
        await loginValidationSchema.validate(req.body);

        const { email, password } = req.body;
        const checkUsername = await User.findOne({ email: email });
        
        const checkPass = await bcrypt.compare(password, checkUsername.password);
        if (checkPass == true) {
                const token = await userToken(checkUsername.userId, checkUsername.tokens);
            const updatedUser = await User.findOne({ email: email });


                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 30000000 * 3),
                    httpOnly: true
                })
                
                res.status(200).json({
                    message: "login successfully",
                    status: 200
                })
        } else {
            throw new Error(errorMessages.EMAIL_AND_PASSWORD_ISSUE)
        }

    } catch (error) {
        console.log("::user-login-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

const loginValidationSchema = Joi.object({
    email: Joi.string()
        .min(3)
        .max(100)
        .email()
        .error(new Error(errorMessages.EMAIL_ISSUE))
        .required(),
    password: Joi.string()
        .min(8)
		.max(48)
        .error(new Error(errorMessages.PASSWORD_ISSUE))
        .required(),
})

const userToken = async (uid, tokensArray) => {
    try {
        const tokenGenerater = await commonFunction.encrypt(uid);        
        const generateToken = await jwt.sign({ data: tokenGenerater }, process.env.USER_AUTH_TOKEN);
        
        tokensArray.push({token:generateToken})
        const tokenGeneret = await User.updateOne(
            {userId: uid},
            {$set: { tokens: tokensArray }},
            {new: true}
        );
        return generateToken;

    } catch (error) {
        console.log("::::error::::",error);
        
    }
};