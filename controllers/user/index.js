const { register } = require("./register");
const { login } = require("./login");
const { getUser } = require("./getUser");
const { userDelete } = require("./userDelete");
const { forgetPassword } = require("./forgotPassword");
const { logout } = require("./logout");

exports.user = { 
    register,
    login,
    getUser,
    userDelete,
    forgetPassword,
    logout 
};