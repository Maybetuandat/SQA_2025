const jwt = require("jsonwebtoken");

const generateToken = async (user, secretSignature, tokenLife) => {
    try {
        const userData = {
            id: user.id,
            role: user.role,
            email: user.email,
        };

        const token = await jwt.sign(
            { data: userData },
            secretSignature,
            {
                algorithm: "HS256",
                expiresIn: tokenLife,
            }
        );

        return token;
    } catch (error) {
        throw error;
    }
};




const verifyToken = async (token, secretKey) => {
    try {
        // //console.log(token, secretKey);
        const decoded = await jwt.verify(token, secretKey);
        
        // //console.log(decoded)
        return decoded;
    } catch (error) {
        throw error
    }
};
module.exports = {
    generateToken, verifyToken
};