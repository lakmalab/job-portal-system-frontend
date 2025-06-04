let comapaniesArrayList = [];


function getCompanies() {
    return fetch("http://localhost:8080/company")
        .then(res => res.json())
        .then(dataList => {
            companiesArrayList = dataList;
            return dataList; // Return the data for further use
        });
}
function loadCompanies() {
    let comapaniesList = document.getElementById("companiesList");
    let body = "";
             getCompanies().then(dataList => {
            comapaniesArrayList = dataList;
            loadModalData();
            dataList.forEach((element, index) => {

                body += `
                    
                        <div data-aos="fade-up"
                            data-aos-duration="3000">
                        <div class="card shadow-sm">
                            <img src="../img/portfolio-1.jpg" alt="">
                            <div class="card-body">
                            <h4>${element.name}</h4>
                                <p class="card-text">Industry : ${element.industry}</p>
                                 <p class="card-text">Location : ${element.location}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                       <button type="button" class="btn btn-warning show-more" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadModalData(${index})">View Jobs</button>
                                        <button type="button" class="btn btn-warning show-more" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadModalData(${index})">Details</button>
                                       <button type="button" class="btn btn-warning show-more" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadModalEditData(${index})">Edit</button>
                                   
                                         </div>
                                    <small class="text-body-secondary">9 Jobs available</small>
                                </div>
                            </div>
                        </div>
                    </div>
                        <!-- Modal -->
            `
            });

            comapaniesList.innerHTML = body;
        })
}


async function loadModalData(index) {
 getCompanies()
    let modalBody = document.getElementById("modal-body");
    console.log(index);
    console.log(comapaniesArrayList[index]);
    modalBody.innerHTML = `
    <div class="card shadow-sm mx-auto" style="width: 100%; max-width: 500px;">
    <img src="../img/portfolio-1.jpg" class="card-img-top" alt="${companiesArrayList[index].name}">
    <div class="card-body">
      <h4 class="card-title mb-2">${companiesArrayList[index].name}</h4>
      <h6 class="card-subtitle mb-3 text-muted">${companiesArrayList[index].industry} — ${companiesArrayList[index].location}</h6>
      <p class="card-text">
        ${companiesArrayList[index].description || "No description available."}
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
    getCompanies(); 

    const company = companiesArrayList[index];
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
        const newPost = {
        companyId: id,
        name: document.getElementById("editName").value,
        location: document.getElementById("editLocation").value,
        industry: document.getElementById("editIndustry").value,
        description: document.getElementById("editDescription").value
        }
         fetch("http://localhost:8080/company", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(newPost)
         })
          location.reload(); 
}

function search() { 
   let companiesList = document.getElementById("companiesList");
    let searchTxt = document.getElementById("txtSearch").value.trim().toLowerCase();
  let body = "";
    console.log(searchTxt);
   fetch("http://localhost:8080/company").then(res => res.json())
            .then(dataList => {
                console.log(dataList);
                comapaniesArrayList = dataList;
                
               dataList.forEach((element, index) => {
                const name = element.name.toLowerCase();
                const industry = element.industry.toLowerCase();
                const location = element.location.toLowerCase();

                if (
                    searchTxt === "" ||
                    name.includes(searchTxt) ||
                    industry.includes(searchTxt) ||
                    location.includes(searchTxt)
                    
                ) {
                    body += `
                        <div data-aos="fade-up" data-aos-duration="3000">
                            <div class="card shadow-sm">
                                <img src="../img/portfolio-1.jpg" alt="">
                                <div class="card-body">
                                    <h4>${element.name}</h4>
                                    <p class="card-text">Industry : ${element.industry}</p>
                                    <p class="card-text">Location : ${element.location}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-warning show-more" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadModalData(${index})">View Jobs</button>
                                            <button type="button" class="btn btn-warning show-more" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadModalData(${index})">Details</button>
                                            <button type="button" class="btn btn-warning show-more" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadModalData(${index})">Edit</button>
                                        </div>
                                        <small class="text-body-secondary">9 Jobs available</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });

            companiesList.innerHTML = body;
        })
        .catch(error => {
            console.error("Error fetching company data:", error);
            companiesList.innerHTML = "<p class='text-danger'>Failed to load companies. Please try again later.</p>";
        });
}

loadCompanies();





