const bcrypt=require('bcryptjs');

const {createUser, getUserByEmail} = require('../models/user.model');

function login(req, res){}
function logout(req, res){}
async function register(req, res){
    //obter os parâmetros do request
    let errors =[];
    let {name, email, password, password2} = req.body;
console.log(name, email, password, password2)
    if(!name || !email || !password || !password2){
        errors.push("Required fields missing");
    }

    if(password.length <3 || password2.length<3){
        errors.push("Password requires a minimum of 3 characters")
    }

    if(password !== password2){
        errors.push("Passwords do not match")
    }

    if(errors.length > 0){
        return res.status(400).json({
            success: false,
            errors: errors
        })
    }else{
        //Verificar se user já existe
        let userIsAlreadyRegistered = await getUserByEmail(email);
        
        if(userIsAlreadyRegistered){
            return res.status(409).json({
                success: false,
                error: "User is already registered"
            })
        }else{
            //criar user
            const newUser = {
                name: name,
                email: email,
                password: password
            }

            //hash password
            bcrypt.genSalt(10,(err, salt) =>{
                bcrypt.hash(newUser.password, salt, async (err, hash) =>{
                    if(err){
                        throw error;
                    }
                    newUser.password = hash;
                    try {
                        let newUserDB = await createUser(newUser);
                        res.status(201).json({
                            success: true,
                            data: newUserDB
                        })
                    } catch (error) {
                        return res.status(500).json({
                            success: false,
                            error: "Internal error"
                        })
                    }
                })

            })
        }
            
    }


}


module.exports = {
    login,
    logout,
    register
}