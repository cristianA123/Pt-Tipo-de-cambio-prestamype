const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/user');



const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [ total, usuarios ] = await Promise.all([
        User.countDocuments(),
        User.find()
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        usuarios
    });
}

const createUser = async(req, res = response) => {
    
    const { name, email, password } = req.body;
    const usuario = new User({ name, email, password });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    await usuario.save();

    res.json({
        usuario
    });
}



module.exports = {
    usuariosGet,
    createUser
}