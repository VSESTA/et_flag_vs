const {getAllCategories, getCategoryById , updateCategoryById, createCategory} = require('../models/category.model');

async function httpGetAllCategories(req, res, next){
    const {userId, userName, isAdmin} = req;
    if(!isAdmin){
        return res.status(401).json({
            success: false,
            error: "Unauthorized"
        })
    }else{
        try {
            const categories = await getAllCategories(true);
            res.render('category-list',{userId, userName, isAdmin, categories})
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                error: "Internal error"
            })
            
        }
    }
    
}

async function httpGetAllActiveCategories(req, res, next){
    try {
        const categories = await getAllCategories(false);
        return categories;
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal error"
        })
        
    }
    
}

async function httpGetCategoryById(req,res,next){
    const {userId, userName, isAdmin} = req;
    const id = req.params.id;
    if(!isAdmin){
        return res.status(401).json({
            success: false,
            error: "Unauthorized"
        })
    }else{
        try {
            if(id == 0){
                res.render('category-detail',{userId,userName,isAdmin,id})
            }
            const category = await getCategoryById(id);
            res.render('category-detail',{userId,userName,isAdmin,category,id})

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                error: "Internal error"
            })
        }
    }
}

async function httpAddCategory(req, res, next){
    const {userId, userName, isAdmin} = req;
    if(!isAdmin){
        return res.status(401).json({
            success: false,
            error: "Unauthorized"
        })
    }else{
        let id = req.params.id;

        let category = {
            name:           req.body.name,
            description:    req.body.description,
            is_active:       typeof(req.body.is_active) == "undefined" ? 0 : 1
        };
        const errors=[];
    
        if(!category.name){
            errors.push({message: "Name is required"});
            res.render('category-detail',{userId, userName, isAdmin, id, category, errors})
        }

        if(typeof(id) ===undefined || id == 0){
            try {
                id = await createCategory(category);
                return  res.redirect('/admin/categories')
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                success: false,
                error: "Internal error"
            })
            }
        }else{
            try {
                id = await updateCategoryById(id, category);
                return res.redirect('/admin/categories')
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                success: false,
                error: "Internal error"
            })
                
            }
        }

    }
}

module.exports={httpGetAllCategories, httpGetAllActiveCategories, httpGetCategoryById, httpAddCategory}

