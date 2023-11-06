const {getAllStatuses } = require('../models/status.model');

async function httpGetAllStatuses(req, res, next){
    try {
        const statuses = await getAllStatuses();
        return statuses;
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error: "Internal error"
        })
        
    }
    
}

module.exports={httpGetAllStatuses}
