const { response } = require('express');


const createUser = (req, res = response) => {
    const { name, email, password } = req.body;
    //
    return res.json({
        ok: true,
        msg: 'Crear usuario /new'
    });
};

const userLogin = (req, res = response) => {
    const { email, password } = req.body;
    return res.json({
        ok: true,
        msg: 'Login de usuario /'
    });
};

const validationToken = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'Renew'
    });
};


module.exports = {
    createUser,
    userLogin,
    validationToken
}