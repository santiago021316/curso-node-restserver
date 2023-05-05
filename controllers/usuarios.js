const {response,request}  = require('express')
const path = require('path')


const usuariosGet = (req = request, res = response) => {
  
    const route = path.join(__dirname , '..','public','form.html')
    res.sendFile(route)
}

const usuariosPost = (req = request, res = response) => {


    console.log(req.body)
    res.json({
    msg:'archivo recibido exitosa mente',
    
    })
}

const usuariosPut = (req , res = response) => {

     const id = req.params.id;

    res.json({
     msg:'get API - Controlador Put',
     id
    })
}

const usuariosPatch = (req,res = response) => {
    res.json({
     msg:'get API - Controlador Patch'   
    })
}

const usuariosDelete = (req , res = response) => {
    res.json({
     msg:'get API - controlador Delete'   
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}