const { getUserById, updateUser ,getAllUsers} = require('../models/user.model');

async function getUserProfile(req, res){
    const {userId, userName, isAdmin} = req;
    let {password, ...userWithoutPassword} = await getUserById(req.userId);
    res.render('profile', { userName, userWithoutPassword});
}

async function httpGetAllUsers (req, res){
    const {userId, userName, isAdmin} = req;
    try {
        const users = await getAllUsers(false);
        return users ;      
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal error"
        })
    }
}

async function saveUserProfile(req, res){
    let {userName, userId} = req;
    const {name, email} = req.body;
    let errors =[];

    let user = await getUserById(userId);

    if(!user){
        errors.push('User was not found');
    }

    if(!name || !email){
        errors.push('Missing required fields');
    }

    if(errors.length >0){
        res.render('profile', {userName,
        user, 
        errors})
    }

    let userWithoutPassword = {
        name: name,
        email: email,
        is_active: true
    }

    //fazer o update
    const id = await updateUser(userId,userWithoutPassword );

    res.render('profile', {userName,
        userWithoutPassword} )

}

module.exports={getUserProfile, saveUserProfile, httpGetAllUsers}