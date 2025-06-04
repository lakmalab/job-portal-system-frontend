let jobArrayList = [];


function getCompanies() {
    return fetch("http://localhost:8080/company")
        .then(res => res.json())
        .then(dataList => {
            companiesArrayList = dataList;
            return dataList; 
        });
}
function getloadcompaniesmenu() {
    let menu = document.querySelector(".nav.nav-pills"); // Select the nav element

    menu.innerHTML = '';

    getCompanies().then(dataList => {
        menu.innerHTML += `<a href="javascript:void(0)" class="nav-link nav-link-faded has-icon active">All</a>`;

        dataList.forEach(company => {
            menu.innerHTML += `
                <a href="javascript:void(0)" class="nav-link nav-link-faded has-icon" onclick="filter(${company.companyId})">
                    ${company.name}
                </a>
            `;
        });
    });
}

function getJobs() {
    return fetch("http://localhost:8080/job")
        .then(res => res.json())
        .then(dataList => {
            JobsArrayList = dataList;
            return dataList; 
        });
}
function loadJobs() {
    
    let jobsList = document.getElementById("JobsList");
    let body = "";
             Promise.all([getJobs(), getCompanies()]).then(([dataList, companiesList]) => {
            jobArrayList = dataList;
            loadModalData();
            dataList.forEach((element, index) => {
                body += `
    <div data-aos="fade-up" data-aos-duration="3000">
        <div class="card shadow-sm" style="border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 1rem;">
            <div class="d-flex p-3 align-items-center">
                <img src="../img/portfolio-1.jpg" alt="" style="width: 60px; height: 60px; border-radius: 50%;">
                <div class="ms-3">
                    <h5>${element.title}</h5>
                    <h6 class="text-warning">${companiesList[parseInt(element.companyId)].name}</h6> <small class="text-success">Salary: ${element.salary}</small>
                    <p class="text-muted">Salary Date: ${element.salary_date || "N/A"}</p>
                </div>
               
            </div>
           
        </div>
    </div>

            `
            });

            jobsList.innerHTML = body;
        })
}


async function loadModalData(index) {
 getJobs()
    let modalBody = document.getElementById("modal-body");
    console.log(index);
    console.log(jobArrayList[index]);
    modalBody.innerHTML = `
    <div class="card shadow-sm mx-auto" style="width: 100%; max-width: 500px;">
    <img src="../img/portfolio-1.jpg" class="card-img-top" alt="${JobsArrayList[index].name}">
    <div class="card-body">
      <h4 class="card-title mb-2">${JobsArrayList[index].name}</h4>
      <h6 class="card-subtitle mb-3 text-muted">${JobsArrayList[index].industry} — ${JobsArrayList[index].location}</h6>
      <p class="card-text">
        ${JobsArrayList[index].description || "No description available."}
      </p>
      <div class="d-flex justify-content-between">
        <a href="#" class="btn btn-outline-primary btn-sm">Company Website</a>
        <a href="#" class="btn btn-outline-secondary btn-sm">View Open Jobs</a>
      </div>
    </div>
  </div>
    `;
}
async function loadModalEditData(index) {
    getJobs(); 

    const company = JobsArrayList[index];
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
      <div class="card shadow-sm mx-auto p-3" style="width: 100%; max-width: 500px;">
        <img src="../img/portfolio-1.jpg" class="card-img-top mb-3" alt="${company.name}">
        <div class="card-body">
          <div class="mb-3">
            <label for="editName" class="form-label">Company Name</label>
            <input type="text" class="form-control" id="editName" value="${company.name}">
          </div>
          <div class="mb-3">
            <label for="editIndustry" class="form-label">Industry</label>
            <input type="text" class="form-control" id="editIndustry" value="${company.industry}">
          </div>
          <div class="mb-3">
            <label for="editLocation" class="form-label">Location</label>
            <input type="text" class="form-control" id="editLocation" value="${company.location}">
          </div>
          <div class="mb-3">
            <label for="editDescription" class="form-label">Description</label>
            <textarea class="form-control" id="editDescription" rows="3">${company.description || ""}</textarea>
          </div>
          <div class="d-flex justify-content-between">
            <button class="btn btn-success" onclick="saveCompany(${company.companyId})">Save</button>
            <button class="btn btn-danger" onclick="deleteCompany(${company.companyId})">Delete</button>
          </div>
        </div>
      </div>
      
    `;
}

function deleteCompany(id){
     if (confirm("Are you sure you want to delete this company? This action cannot be undone.")) {
   fetch("http://localhost:8080/company/" + id, {
        method: 'DELETE',
    })
    .then(res => res.text()) 
    .then(res => console.log(res))}
}
function saveCompany(id) {
      {
 const newPost = {
        companyId: id,
        name: document.getElementById("editName").value,
        location: document.getElementById("editLocation").value,
        industry: document.getElementById("editIndustry").value,
        description: document.getElementById("editDescription").value
        }
         fetch("http://localhost:8080/company", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(newPost)
        
         })
      } 
          location.reload(); 
}

function search() { 
   let JobsList = document.getElementById("JobsList");
    let searchTxt = document.getElementById("txtSearch").value.trim().toLowerCase();
  let body = "";
    console.log(searchTxt);
             Promise.all([getJobs(), getCompanies()]).then(([dataList, companiesList]) => {
                console.log(dataList);
                jobArrayList = dataList;
                
               dataList.forEach((element, index) => {
                const name = element.title.toLowerCase();
                const industry = companiesList[parseInt(element.companyId)].name;
                const location = element.description.toLowerCase();

                if (
                    searchTxt === "" ||
                    name.includes(searchTxt) ||
                    industry.includes(searchTxt) ||
                    location.includes(searchTxt)
                    
                ) {
                    body += `
                <div data-aos="fade-up" data-aos-duration="3000">
        <div class="card shadow-sm" style="border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 1rem;">
            <div class="d-flex p-3 align-items-center">
                <img src="../img/portfolio-1.jpg" alt="" style="width: 60px; height: 60px; border-radius: 50%;">
                <div class="ms-3">
                    <h5>${element.title}</h5>
                    <h6 class="text-warning">${companiesList[parseInt(element.companyId)].name}</h6> <small class="text-success">Salary: ${element.salary}</small>
                    <p class="text-muted">Salary Date: ${element.salary_date || "N/A"}</p>
                </div>
               
            </div>
           
        </div>
    </div>
                    `;
                }
            });

            JobsList.innerHTML = body;
        })
        .catch(error => {
            console.error("Error fetching company data:", error);
            JobsList.innerHTML = "<p class='text-danger'>Failed to load Jobs. Please try again later.</p>";
        });
}

function loadPage() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"), 10);
    console.log(id);
    
    if (id == 0 || id > 0) {
        filter(id);
        
    } else {
       loadJobs();
    }
}
function filter(companyId = null) {
    let JobsList = document.getElementById("JobsList");
    let body = "";

    Promise.all([getJobs(), getCompanies()]).then(([dataList, companiesList]) => {
        jobArrayList = dataList;

        dataList.forEach((element) => {
            const name = element.title.toLowerCase();
            const industry = companiesList[parseInt(element.companyId)].name.toLowerCase();
            const location = element.description.toLowerCase();

            if (companyId === null || element.companyId === companyId) {
                body += `
                <div data-aos="fade-up" data-aos-duration="3000">
                    <div class="card shadow-sm" style="border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 1rem;">
                        <div class="d-flex p-3 align-items-center">
                            <img src="../img/portfolio-1.jpg" alt="" style="width: 60px; height: 60px; border-radius: 50%;">
                            <div class="ms-3">
                                <h5>${element.title}</h5>
                                <h6 class="text-warning">${industry}</h6>
                                <small class="text-success">Salary: ${element.salary}</small>
                                <p class="text-muted">Salary Date: ${element.salary_date || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }
        });

        JobsList.innerHTML = body;
    }).catch(error => {
        console.error("Error fetching job data:", error);
        JobsList.innerHTML = "<p class='text-danger'>Failed to load Jobs. Please try again later.</p>";
    });
}
loadPage()

getloadcompaniesmenu()



