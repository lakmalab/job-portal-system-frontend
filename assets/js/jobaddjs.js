console.log("hello com");
getloadcompaniesmenu()
function getCompanies() {
    return fetch("http://localhost:8080/company")
        .then(res => res.json())
        .then(dataList => {
            companiesArrayList = dataList;
            return dataList; 
        });
}
function getloadcompaniesmenu() {
    const selectElement = document.getElementById("Companyselect"); 

    selectElement.innerHTML = '<option value="null">Select</option>';

    getCompanies().then(dataList => {
        dataList.forEach(company => {
            const option = document.createElement("option");
            option.value = company.companyId; 
            option.textContent = company.name; 
            selectElement.appendChild(option); 
        });

        if (typeof mdbSelectInit === 'function') {
            mdbSelectInit(selectElement);
        }
    }).catch(error => {
        console.error("Error fetching companies:", error);
    });
}
function showDatepicker() {
    datepicker();
}
function addCompany() {
        const newPost = {
        jobId: null,
        title: document.getElementById("title").value,
        salary_date: submitData(),
        salary: document.getElementById("salary").value,
        description: document.getElementById("descrtiption").value,
        companyId: parseInt(document.getElementById("Companyselect").value,10)
        }
         fetch("http://localhost:8080/job", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(newPost)
         })
}
function submitData() {
    let salaryDateInput = document.getElementById("sdate").value;

    let parts = salaryDateInput.split("/");
    let formattedDate = `${parts[2]}-${parts[0]}-${parts[1]}`; 

    let data = {
        salary_date: formattedDate,
    };


    console.log(data);
}
function searchCompany() {
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
document.addEventListener("DOMContentLoaded", function () {
    $('#datepicker input').datepicker({
        format: 'mm/dd/yyyy', 
        autoclose: true       
    });
});

document.getElementById("datepicker").addEventListener("click", function() {
    $('#datepicker input').datepicker('show');
});
 document.getElementById("addBtn")
    .addEventListener("click", addCompany )   

document.getElementById("searchBtn")
    .addEventListener("click", searchCompany )



