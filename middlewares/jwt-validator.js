const { response } = require("express")
const jwt = require('jsonwebtoken')


const jwtValidator = (req, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token'
        })
    }
    try {
        const { uid, name, email } = jwt.verify(token, process.env.SECRET_JWT_SEDD);
        req.uid = uid;
        req.name = name;
        req.email = email;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
    //Todo Ok:
    next();
}

module.exports = {
    jwtValidator
}