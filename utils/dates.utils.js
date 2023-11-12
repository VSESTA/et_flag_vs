function getCurrentDate(){
    return new Date().toISOString().slice(0, 19).replace('T', ' ')
}

function subtractMonths(date, months) {
    let newDate = new Date(date);
    newDate = new Date(newDate.setMonth(date.getMonth() - months));
  
    return newDate;
  }

module.exports = {getCurrentDate, subtractMonths}