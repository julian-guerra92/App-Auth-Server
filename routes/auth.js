
const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidator } = require('../middlewares/fields-validators');
const { 
    createUser, 
    userLogin, 
    validationToken 
} = require('../controllers/auth');
const { jwtValidator } = require('../middlewares/jwt-validator');

const router = Router();

//Crear un nuevo usuario
router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({min: 6}),
    fieldsValidator
], createUser);

//Login de usuario
router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({min: 6}),
    fieldsValidator
], userLogin);

//Validar y revalidar token
router.get('/renew', jwtValidator ,validationToken);



module.exports = router;