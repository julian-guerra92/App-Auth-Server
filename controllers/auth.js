const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const createUser = async (req, res = response) => {
    const { name, email, password } = req.body;
    try {
        //Verificar el email
        const usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario registrado con este Email'
            });
        }
        //Crear usuario con el modelo
        const dbUser = new Usuario(req.body);
        //Hashear la constraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);
        //Generar el JWT 
        const token = await generateJWT(dbUser.id, dbUser.name);
        //Crear usuario en DB
        await dbUser.save();
        //Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        });
    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: 'Por favor hable con el administrador'
        });
    };
};

const userLogin = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const dbUser = await Usuario.findOne({ email });
        //Confirmar correo electrónico de usuario
        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no es válido'
            });
        }
        //Confirmar match del password
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es válido'
            });
        }
        //Generar el JWT
        const token = await generateJWT(dbUser.id, dbUser.name);
        //Respuesta del servicio
        return res.json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }
};

const validationToken = async (req, res = response) => {
    const { uid, name } = req;
    const token = await generateJWT(uid, name);
    return res.json({
        ok: true,
        uid,
        name,
        token
    });
};


module.exports = {
    createUser,
    userLogin,
    validationToken
}