const {getCurrentDate, subtractMonths} = require('../utils/dates.utils');
const {getTotalAmountByTimeInterval, getTotalAmountByCategoryAndTimeInterval} = require('../models/expense.model');
const {getSharedExpenseByTimeInterval, getCashInByTimeInterval, getDuePaymentsByUserIdAndTimeInterval, getToReceiveByUserIdAndTimeInterval} = require('../models/sharedexpense.model');

async function httpGetDashboard(req, res, next) {
    const {userId, userName} = req;
    //obter datas
    let from = req.query.from;
    let to = req.query.to;

    //erros

    if(typeof(from) =='undefined' || typeof(to)=='undefined' ){
        to = new Date(getCurrentDate());
        from = subtractMonths(to,1);
        to = to.toISOString().split('T')[0];
        from = from.toISOString().split('T')[0];
    }
    //obter dados overview
    const total = await getTotalAmountByTimeInterval(from, to, userId);
    const due_amount = await getSharedExpenseByTimeInterval(from, to, userId);
    const cash_in = await getCashInByTimeInterval(from, to, userId);

    //obter dados por categoria

    const categoryTotals = await getTotalAmountByCategoryAndTimeInterval(from, to, userId);

    //obter dados de valores devidos
    const duePayments = await getDuePaymentsByUserIdAndTimeInterval(from, to, userId);

    const debtors = await getToReceiveByUserIdAndTimeInterval(from, to, userId);

    res.render('dashboard',{userId, userName,to, from, total, due_amount, cash_in, categoryTotals, duePayments, debtors});
}

module.exports = {httpGetDashboard}