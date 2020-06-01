document.onreadystatechange = function(ev){
    if (document.readyState == "complete") {
        console.log('i am ready - ready state');
        bankStart();
    } 
}

function bankStart(){
    console.log('bankStart');

    //document.querySelector('.accounts-list').innerHTML = shukiRender(templates.account, BankDb.Accounts)
    let accountsCustomArray = []
    BankDb.Accounts.forEach(acc => {
        let myClient = BankDb.API.getCliendById(acc.ClientId)
        let o = {
            ID : acc.ID,
            Balance : acc.Balance,
            ClientId : acc.ClientId,
            ClientFullName : myClient.lastName + ' ' + myClient.firstName
        }
        accountsCustomArray.push(o)
    });

    document.querySelector('.accounts-list').innerHTML = render(templates.account, accountsCustomArray)

    initEvent()
}

let templates = {
    account : `<div class="account flex-col">
        <div> <label>ID: </label> <span>[ID]</span> </div>
        <div> <label>ClientFullName: </label> <span>[ClientFullName]</span> </div>
        <div> <label>ClientId: </label> <span>[ClientId]</span> </div>
        <div> <label>Balance: </label> <span>[Balance]</span> </div>
    </div>`,

    transaction : `<div class="transaction flex-col">
    <div> <label>Type: </label> <span>[Type]</span> </div>
    <div> <label>Amount: </label> <span>[Amount]</span> </div>
</div>`
}

function initEvent(){

    myList = document.querySelectorAll(".account");
    details = document.querySelector(".details-panel")
     
    myList.forEach(acc =>
        acc.onclick= function(ev){

            let myAcc = ev.target.closest('.account');
            let accounts = document.querySelectorAll('.account.active');
            accounts.forEach(acc =>(
                acc.className = acc.className.replace(' active', '')
            ))
           
            myAcc.className += " active"
           
            let accId = myAcc.querySelector("span").textContent;
            let accTrans = BankDb.API.getTransactionsByAccountId(accId);

            console.log(accTrans);
            let h =document.querySelector("#h3-details")
            h.innerHTML = `detail for account ${accId}`;
           
            details.innerHTML = render(templates.transaction, accTrans);
        } 
        )

}