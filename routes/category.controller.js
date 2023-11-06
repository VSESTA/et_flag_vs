const {getAllCategories } = require('../models/category.model');

async function httpGetAllCategories(req, res, next){
    try {
        const categories = await getAllCategories();
        return categories;
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal error"
        })
        
    }
    
}

module.exports={httpGetAllCategories}

