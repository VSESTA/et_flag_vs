const { getUserById, updateUser ,getAllUsers} = require('../models/user.model');

async function getUserProfile(req, res){
    const {userId, userName, isAdmin} = req;
    let user = await getUserById(req.userId);
    res.render('profile', { userName, user});
}

async function httpGetAllUsers (req, res){
    const {userId, userName, isAdmin} = req;
    try {
        const users = await getAllUsers(false);
        console.log(users)
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
    const {name, email, password} = req.body;
    let errors =[];

    let user = await getUserById(userId);

    if(!user){
        errors.push('User was not found');
    }

    if(!password || !name || !email){
        errors.push('Missing required fields');
    }

    if(errors.length >0){
        res.render('profile', {userName,
        user, 
        errors})
    }

    let updateUser = {
        name: name,
        email: email,
        password: password,
        is_active: true
    }

    //fazer o update
    let id = await updateUser(userId,updateUser );

    res.render('profile', {userName,
        updateUser} )

}

module.exports={getUserProfile, saveUserProfile, httpGetAllUsers}