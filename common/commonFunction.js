const CryptoJS = require("crypto-js");
// const crypto  = require("crypto");


exports.uniqueNumber = async (type) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let preFix = ``
    for (let i = 0; i < 10; i++) {
        preFix += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    var newString = ""
    switch (type) {
        case "user":
            newString = `us${preFix}`

            break;

        default:
            break;
    }
    return newString;
}
exports.encrypt = async (text) => {
    try {
        const ciphertext = CryptoJS.AES.encrypt(text, process.env.SECRET_KEY).toString();
        return ciphertext;
    } catch (error) {
        console.error("Error during encryption:", error);
        throw error;
    }
};

exports.decrypt = async (text) => {
    try {
        const bytes = CryptoJS.AES.decrypt(text, process.env.SECRET_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    } catch (error) {
        console.error("Error during decryption:", error);
        throw error;
    }
};