const bcrypt=require('bcryptjs');
const { getUserById, updateUser ,getAllUsers,updateUserPassword, toggleUserStatus, toggleUserAdmin} = require('../models/user.model');

async function getUserProfile(req, res){
    const {userId, userName, isAdmin} = req;
    let {password, ...userWithoutPassword} = await getUserById(req.userId);
    res.render('profile', { userName, userWithoutPassword, isAdmin});
}

async function httpGetAllUsers (req, res){
    const {userId, userName, isAdmin} = req;
    if(!isAdmin){
        return res.status(401).json({
            success: false,
            error: "Unauthorized"
        })
    }else{
        try {
            const users = await getAllUsers(true);
            /*return res.status(200).json({
                success: true,
                data: users
            }) ;  */
            
            res.render('user-list',{userId, userName, isAdmin, users})
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                error: "Internal error"
            })
        }

    }

}

async function httpGetAllActiveUsers (req, res){
        try {
            const users = await getAllUsers(false);
            /*return res.status(200).json({
                success: true,
                data: users
            }) ;  */
            
            return users;
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal error"
        })
        
    }

}

async function saveUserProfile(req, res){
    let {userName, userId, isAdmin} = req;
    const {name, email} = req.body;
    let errors =[];

    let userWithoutPassword = await getUserById(userId);

    if(!userWithoutPassword){
        errors.push({message: 'User was not found'});
    }

    if(!name || !email){
        errors.push({message: 'Missing required fields'});
    }

    if(errors.length >0){
        res.render('profile', {userName,isAdmin,
        userWithoutPassword, 
        errors})
    }

     userWithoutPassword = {
        name: name,
        email: email,
        is_active: true
    }

    //fazer o update
    const id = await updateUser(userId,userWithoutPassword );

    res.redirect('/dashboard') 

}

async function httpResetPassword(req, res){
    const {userId, userName, isAdmin} = req;
    const id = req.params.id;

    if(!isAdmin){
        return res.status(401).json({
            success: false,
            error: "Unauthorized"
        })
    }else{
        let reset_password = "123";
        //hash password
        bcrypt.genSalt(10,(error, salt) =>{
            bcrypt.hash(reset_password, salt, async (err, hash) =>{
                if(err){
                    throw err;
                }
                reset_password = hash;
                try {
                    let updatedInfo = await updateUserPassword(id, reset_password);
                    res.redirect('/admin/users')

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

async function httpSwitchStatus(req, res){
    const {userId, userName, isAdmin} = req;
    const id = req.params.id;
    let status = req.query.is_active;
    console.log(status)

    if(!isAdmin){
        return res.status(401).json({
            success: false,
            error: "Unauthorized"
        })
    }else{
        try {
            if(status=="true"){
                status = 1
            }else{
                status = 0
            }
            console.log(status)
            let updatedInfo = await toggleUserStatus(id, status);
            res.redirect('/admin/users')

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
    }
}

async function httpSwitchAdmin(req, res){
    const {userId, userName, isAdmin} = req;
    const id = req.params.id;
    let admin = req.query.is_admin;

    if(!isAdmin){
        return res.status(401).json({
            success: false,
            error: "Unauthorized"
        })
    }else{
        try {
            if(admin=="true"){
                admin = 1
            }else{
                admin = 0
            }
            let updatedInfo = await toggleUserAdmin(id, admin);
            res.redirect('/admin/users')

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
    }
}
module.exports={getUserProfile, saveUserProfile, httpGetAllUsers,httpGetAllActiveUsers,httpResetPassword, httpSwitchStatus, httpSwitchAdmin}