const { request, response } = require("express")
const Usuario = require('../models/usuario')

const jwt = require('jsonwebtoken')


const validarJWT = async(req = request,res=response,next)=>{

const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
        msg:'No hay token en la peticion'
        })
    }


    try{
     //verificar token valido para que la app no se caiga
     const {uid} = jwt.verify(token,process.env.SECRETOPRIVATEKEY);
     
     
  
     // leer el usuario que corresonde al uid
     const usuarioAutenticado =  await Usuario.findById(uid)  
     if(!usuarioAutenticado){
        return res.status(401).json({
            msg:'Token no valido -- usuario no existe en DB'
        })
     }
    
    //verificar que el uuid  del usuario autenticado tiene estado true
    if(!usuarioAutenticado.estado){
        return res.status(401).json({
            msg:'Token no valido -- usuario con estado false'
        })
    }
    
    req.usuario = usuarioAutenticado
    next();

    }catch(error){

   console.log(error);
    res.status(401).json({
    msg:'Token no valido'
   })     


    }



}


module.exports = {
    validarJWT
}