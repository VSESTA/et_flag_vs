let splitElement = document.querySelector('#is_split');
let submitWrapper =  document.querySelector('#submitWrapper');
splitElement.addEventListener('change',toggleMoreInfo)


function toggleMoreInfo(e){
    if(e.target.checked){
        submitWrapper.innerHTML=`<input type="submit" id="nextStepBtn" class="btn btn-primary profile-button" value="Next Step">
        <a class="btn btn-secondary" href="/dashboard" role="button">Go back</a>`;   
    }
    else{
        submitWrapper.innerHTML=`<input type="submit" id="submitBtn" class="btn btn-primary profile-button" value="Submit Expense">
        <a class="btn btn-secondary" href="/dashboard" role="button">Go back</a>`;
    }
}