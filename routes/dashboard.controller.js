const {getCurrentDate, subtractMonths} = require('../utils/dates.utils');

async function httpGetDashboard(req, res, next) {
    const {userId, userName} = req;
    //obter datas
    let from = req.query.from;
    let to = req.query.to;

    //erros

    if(typeof(from) =='undefined' || typeof(to)=='undefined' ){
        to = new Date(getCurrentDate());
        from = subtractMonths(to,1);
    }
    //obter dados overview

    res.render('dashboard',{userId, userName,to, from})
}

module.exports = {httpGetDashboard}