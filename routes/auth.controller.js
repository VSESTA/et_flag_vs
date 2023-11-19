const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');

const {createUser, checkExistingUserByEmail,createAdmin, getUserByEmail, getUserById, updateUserPassword} = require('../models/user.model');
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
            name: user.name,
            email: user.email,
            isAdmin: user.is_admin
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY) ;
        //criar um cookie e fazer redirect para o dashboard
        res
            .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            }).status(200).redirect('../dashboard');
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
    
    return res
        .clearCookie("access_token")
        .status(200)
        .redirect('../');
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

async function httpUpdateUserPassword(req, res){
    const errors =[];
    let {curr_password, new_password, confirm_password} = req.body;
    const {userId, userName, isAdmin} = req;
    const {password, ...userWithoutPassword} = await getUserById(userId);

    //validar campos obrigatórios
    if(!curr_password || !new_password || !confirm_password){
        errors.push({message: "Required fields missing"});
    }
    //password não pode ser igual à antiga
    if(new_password == curr_password){
        errors.push({message: "Password cannot be the same as current password"});
    }

    if(new_password.length <3 || confirm_password.length<3){
        errors.push({message: "Password requires a minimum of 3 characters"});
    }
    //comparar se new_password e confirm_password são iguais
    if(new_password != confirm_password){
        errors.push({message: "Passwords do not match"});
    }

    //comparar se a curr_password corresponde à password existente na bd
    const isValid = await bcrypt.compare(curr_password, password);
    if(!isValid){
        errors.push({message: "Incorrect current password"})
    }

    if(errors.length>0){
        res.render('profile',{userName,isAdmin,
            userWithoutPassword, 
            errors})
    }else{
        //hash password
        bcrypt.genSalt(10,(error, salt) =>{
            bcrypt.hash(new_password, salt, async (err, hash) =>{
                if(err){
                    throw err;
                }
                new_password = hash;
                try {
                    let updatedInfo = await updateUserPassword(userId, new_password);
                    res.redirect('/user/profile')

                    //caso decida via react
                    /*return res.status(201).json({
                        success: true,
                        data: newUserDB
                    })*/
                } catch (error) {
                    console.log(error)
                    return res.status(500).json({
                        success: false,
                        error: "Internal error"
                    })
                }
            })

        })

    }
}

async function registerAdmin(req, res){
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
        res.render('register-admin',{
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
            res.render('register-admin',{
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
                        let newUserDB = await createAdmin(newUser);
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
    register,
    httpUpdateUserPassword,
    registerAdmin
}