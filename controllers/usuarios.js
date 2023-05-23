// const path = require('path')
const {response,request}  = require('express')
const Usuario = require('../models/usuario') 
const bcryptjs = require('bcryptjs')


const usuariosGet = async(req = request, res = response) => {
    // const route = path.join(__dirname , '..','public','form.html')
    // res.sendFile(route)
     const Estado = {estado:true}
     const {limite,desde} = req.query; 

    //  const usuarios = await Usuario.find(Estado)   
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    //   const total = await Usuario.countDocuments(Estado);

      const [total,usuarios] = await Promise.all([
      Usuario.count(Estado), 
      Usuario.find(Estado)
      .skip(Number(desde))
      .limit(Number(limite))
      ])
       
     
         res.json({total,usuarios})
       
    }
const usuariosPost = async(req = request, res = response) => {
   
    const {nombre,correo,password,rol} = req.body
    const usuario = new Usuario({nombre,correo,rol,password}) // aca creo la sintaxis de como quedaran en la base de datos
   
     const salt = bcryptjs.genSaltSync()   // encriptar la contraseña
     usuario.password = bcryptjs.hashSync(password, salt)// encriptar la contraseña

     await usuario.save()    //Guardaer en la base de datos
     res.json({usuario})     //mostarr en el inicio de respuesta
}

const usuariosPut = async(req , res = response) => {

     const {id} = req.params;
     const {_id,password,google,correo,...resto} = req.body

     // TODO validar contra base de datos
   
     if(password){
       const salt = bcryptjs.genSaltSync()     //encriptar contraseña del put (actualizar)   
       resto.password = bcryptjs.hashSync(password, salt)    //encriptar contraseña del put (actualizar)   y agragr a resto 
      }
      
      const usuario = await Usuario.findByIdAndUpdate(id,resto)
    
      res.json({
       msg:'get API - Controlador Put',
       usuario
      })
}

const usuariosPatch = (req,res = response) => {
    res.json({
     msg:'get API - Controlador Patch'   
    })


}

const usuariosDelete = async(req , res = response) => {

    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})
    
  
     res.json({
        usuario
     })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}