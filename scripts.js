

function updateDiv (data) {
    
    let myDiv = document.getElementById("output");
    let htmlString = "";
    for (const record of data) {
        htmlString += `<li>${record.Name} | ${record.Phone} | ${record.Email}</li>`
    }
    myDiv.innerHTML = htmlString;
    return;
}


async function getData() {
    await fetch(`https://na85.salesforce.com/services/data/v20.0/query/?q=SELECT+name,email,phone,accountid+from+Contact`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        updateDiv(json.records);
    }).catch(error => console.error(error));
}

async function getAccount() {
    await fetch(`https://na85.salesforce.com/services/data/v20.0/query/?q=SELECT+id+from+Account`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => response.json())
    .then(json => {
        localStorage.setItem("accountId", json.records[0].Id);
        console.log("retrieved a default accountId");
    }).catch(error => console.error(error));
}


function addContact() {
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    sendToSalesForce(firstname, lastname, phone, email);
}

function sendToSalesForce (firstname, lastname, phone, email) {
    let data = JSON.stringify({
        FirstName: firstname,
        LastName: lastname,
        Email: email,
        Phone: phone,
        AccountId: localStorage.getItem("accountId")
    })
    let url = "https://na85.salesforce.com/services/data/v20.0/sobjects/Contact/";
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: data
    }
    fetch(url, options).then(response => {
        console.log(response);
        getData();
    });
}

function login () {
    const tokenString = window.location.hash.split("&")[0];
    if(tokenString.startsWith("#access_token")) {
        const decoded = decodeURI(tokenString.split("=")[1]);
        localStorage.setItem("token", decoded);
        history.replaceState(null, null, ' ');
    } else {
        window.location.href = "login.html"
    }
}


login();
getData();
getAccount();