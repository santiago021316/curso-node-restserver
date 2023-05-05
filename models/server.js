const express = require('express')
const cors = require('cors')


class Server{

    constructor(){
    
    this.app  = express()
    this.port = process.env.PORT || 3080
    this.usuariosPath = '/api/usuarios';
    
    // Middlewares
    this.middlewares()
    //rutas de mi app
    this.routes()

    
    
    
    }
    // directorio publico
    middlewares(){
        this.app.use(cors())

        // Directorio publico
        this.app.use(express.static('public'))
       
        //Lectura y parseo del body cualquier informacion que pase del body a mi bakend sera en json
         this.app.use(express.json())
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios') )
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
        
    }

}

module.exports = Server
