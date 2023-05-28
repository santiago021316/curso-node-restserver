const { response } = require('express')
const   Usuario =  require('../models/usuario')
const bcryptjs = require('bcryptjs')
const {googleVerify} = require('../helpers/google.verify')

const { generarJWT } = require('../helpers/generar-JWT')



const login = async(req,res = response) =>{


    const {correo,password}  = req.body

    try {

       //verificar si el email existe
        const usuario = await Usuario.findOne({correo})

        if(!usuario){
            return res.status(400).json({
            msg:'Usuario/Password no son correctos-correo' 
            })
        }

       // si e; usuario esta activo
         if(!usuario.estado){
            return res.status(400).json({
            msg:'Usuario/Password no son correctos-estado:false' 
            })
        }

        //verificar la contraseñá
       

       const validPassword = bcryptjs.compareSync(password,usuario.password)
    
       
       if(!validPassword){
        return res.status(400).json({
        msg:'Usuario/Password no son correctos-password' 
        })
        }
       //generar el jwt
        const token = await generarJWT(usuario.id)
        
        
        res.json({
        usuario,
        token
    })
        
    }catch (error) {
        console.log(error)
        return res.status(500).json({
        msg:'Hable con el administrador'
        })
    }
    
}

const googleSignIn = async(req,res=response) => {

 const { id_token} = req.body;

 try{
   
    const {nombre , img , correo} = await  googleVerify(id_token)
   
     let usuario = await Usuario.findOne({correo})

    

     if(!usuario){
   
     const data = {
        nombre,
        correo,
        password:':P',
        img,
        google:true,
        rol:'USER_ROLE'
        
     } 

    
   
       usuario = new Usuario(data);
       await usuario.save();
      
     
     }

     if(!usuario.estado){
        return res.status(401).json({
            msg:'hable con el administrador usuario bloqueado'
        })
        
     }

     

     const token = await generarJWT(usuario.id) 

      
     res.json({
        usuario,
        token

     })
     
     

 }catch(error){
 
     res.status(400).json({
        ok:false,
        msg:'El token no pudo ser leido'
     })
 }




}









module.exports = {
    login,
    googleSignIn
}