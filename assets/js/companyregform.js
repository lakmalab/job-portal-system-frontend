console.log("hello com");


function addCompany() {
        const newPost = {
        companyId: null,
        name: document.getElementById("companyname").value,
        location: document.getElementById("location").value,
        industry: document.getElementById("industry").value,
        }
         fetch("http://localhost:8080/company", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(newPost)
         })
}

document.getElementById("addBtn")
    .addEventListener("click", addCompany )

