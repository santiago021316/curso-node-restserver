const { validationResult } = require('express-validator')

// estos middlewares al ser guardados en en la crapeta mildeware tiene n acceso directo al req,res,next

const validarCampos = (req,res,next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }
next();
}


module.exports = {

  validarCampos  
}