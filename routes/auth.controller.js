const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');

const {createUser, checkExistingUserByEmail, getUserByEmail} = require('../models/user.model');
const { response } = require('express');

async function login(req, res){
     //obter os parâmetros do request
     let {email, password} = req.body;

     //validações
     if(!email || !password){
        return res.status(400).json({
            success: false,
            error: "Required fields are missing"
        });
     }
     //verificar se o email corresponde a algum utilizador na bd
     let userIsAlreadyRegistered = await checkExistingUserByEmail(email);

     if(!userIsAlreadyRegistered){
        return res.status(404).json({
            success: false,
            error: "User is not registered yet"
        });
     }
     try {
        let user = await getUserByEmail(email);
        let isValid = await bcrypt.compare(password,user.password);
       
        if(!isValid){
            return res.status(422).json({
                success: false,
                error:"Email or password incorrect"
            });
        }

        /*Informação guardada no token */
        const payload ={
            user_id: user.id,
            email: user.email,
            isAdmin: user.is_admin
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY) ;
        res.header({"Authorization": "Bearer "+token}).render('dashboard',{payload})
        /*return res.status('200').header({"Authorization": "Bearer "+token}).json({
            success: true,
            data: {"Authorization": "Bearer "+token}
        })*/
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal error"
        });
    }
}
function logout(req, res){

    const authHeader = req.header('Authorization');
    if(!authHeader){
        return res.status(204).json({
            success: true
        });
    }
    res.removeHeader('Authorization');

    return res.status(200).json({
        success: true
    })
}

async function register(req, res){
    //obter os parâmetros do request
    let errors =[];
    let {name, email, password, password2} = req.body;
    
    //validações
    if(!name || !email || !password || !password2){
        errors.push({message: "Required fields missing"});
    }

    if(password.length <3 || password2.length<3){
        errors.push({message: "Password requires a minimum of 3 characters"})
    }

    if(password !== password2){
        errors.push({message: "Passwords do not match"})
    }

    if(errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        })
        //caso decida fazer em react
        /*return res.status(400).json({
            success: false,
            errors: errors
        })*/
    }else{
        //Verificar se user já existe
        let userIsAlreadyRegistered = await checkExistingUserByEmail(email);

        if(userIsAlreadyRegistered){
            errors.push({ message: 'User is already registered'});
            res.render('register',{
                errors,
                name,
                email,
                password,
                password2
            })
            //caso decida fazer em react
            /*return res.status(409).json({
                success: false,
                error: "User is already registered"
            })*/
        }else{
            //criar user
            const newUser = {
                name: name,
                email: email,
                password: password
            }

            //hash password
            bcrypt.genSalt(10,(error, salt) =>{
                bcrypt.hash(newUser.password, salt, async (err, hash) =>{
                    if(err){
                        throw err;
                    }
                    newUser.password = hash;
                    try {
                        let newUserDB = await createUser(newUser);
                        res.redirect('/auth/login');

                        //caso decida via react
                        /*return res.status(201).json({
                            success: true,
                            data: newUserDB
                        })*/
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