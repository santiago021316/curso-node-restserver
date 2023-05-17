const {Router} = require("express")
const router = Router()
const { check } = require("express-validator")


const {validarCampos} = require('../middlewares/validar-campos')
const { esRoleValido, esEmailValido ,existeUsuarioPorId} = require("../helpers/db-validators")

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete} = require('../controllers/usuarios')

router.get('/', usuariosGet)
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','el password debe ser mas de 6 letras').isLength({min:6}),
    check('correo','el correo no es valido').isEmail(),
    // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('correo').custom(esEmailValido),
    check('rol').custom(esRoleValido) ,
    validarCampos
    ], usuariosPost )
router.put('/:id',
check('id','No es un Id válido').isMongoId(),  //valida si el id es un id valido 
check('id').custom(existeUsuarioPorId) ,
check('rol').custom(esRoleValido),
 
 validarCampos
 
, usuariosPut)
router.patch('/', usuariosPatch)
router.delete('/:id',
check('id','No es un Id válido').isMongoId(),  //valida si el id es un id valido 
check('id').custom(existeUsuarioPorId) ,
validarCampos

,usuariosDelete)

module.exports = router;