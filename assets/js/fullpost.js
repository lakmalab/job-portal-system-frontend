console.log("Full post")
let JobsArrayList = [];

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"), 10);

function getCompanies() {
    return fetch("http://localhost:8080/company")
        .then(res => res.json())
        .then(dataList => {
            companiesArrayList = dataList;
            return dataList; 
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
function loadfullpost() {
    console.log(id);

    Promise.all([getJobs(), getCompanies()]).then(([dataList, companiesList]) => {
        const job = dataList.find(job => job.jobId === id);
      
        const company = companiesList.find(comp => comp.companyId == job.companyId);

        document.getElementById("job-title").textContent = job.title;
        document.getElementById("com-name").textContent = company.name;
        document.getElementById("location").textContent = company.location;
        document.getElementById("salary").textContent = job.salary;
        document.getElementById("salary_date").textContent = job.salary_date;
        document.getElementById("job-content").textContent = job.description;
    });
}

async function loadModalEditData(jobId) {
     const jobs = await getJobs(); 
    
    const job = jobs.find(j => j.jobId === jobId);
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = `
      <div class="card shadow-sm mx-auto p-3" style="width: 100%; max-width: 500px;">
        <header class="job-header d-flex align-items-center justify-content-between">
    <div class="d-flex align-items-center gap-3">
      <img src="../img/hero-img 3.png" alt="Company Logo" class="custom-logo" />
      <div>
        <h3 class="mb-0" id="job-title">Edit Job Here</h3>
        <small class="text-muted" id="com-name">Changes are Unchangable.</small>
      </div>
    </div>
    <div>
      <span class="badge bg-danger">Warning</span>
    </div>
  </header>
        <div class="card-body">
          <div class="mb-3">
            <label for="editName" class="form-label">Job Title</label>
            <input type="text" class="form-control" id="edittitle" value="${job.title}">
          </div>
          <div class="mb-3">
            <label for="editIndustry" class="form-label">Salary</label>
            <input type="text" class="form-control" id="editsalary" value="${job.salary}">
          </div>
          <div class="mb-3">
            <label for="editLocation" class="form-label">salary_date</label>
            <input type="text" class="form-control" id="editsalary_date" value="${job.salary_date}">
          </div>
          <div class="mb-3">
            <label for="editDescription" class="form-label">Description</label>
            <textarea class="form-control" id="editDescription" rows="3">${job.description || ""}</textarea>
          </div>
          <div class="d-flex justify-content-between">
            <button class="btn btn-success" onclick="saveJob(${job.jobId})">Save</button>
            <button class="btn btn-danger" onclick="deleteJob(${job.jobId})">Delete</button>
          </div>
        </div>
      </div>
    `;
       const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show();
    console.log("modal loaded ${job.title}" );
    
}
function deleteJob(id){
     if (confirm("Are you sure you want to delete this Job? This action cannot be undone.")) {
   fetch("http://localhost:8080/job/" + id, {
        method: 'DELETE',
    })
    .then(res => res.text()) 
    .then(res => console.log(res))}
}
async function  saveJob(jobId) {
  const jobs = await getJobs(); 
    
    const job = jobs.find(j => j.jobId === jobId);
  console.log(id);
  
      {
  const newPost = {
        jobId: id,
        title: document.getElementById("edittitle").value,
        salary_date: document.getElementById("editsalary_date").value,
        salary: document.getElementById("editsalary").value,
        description: document.getElementById("editDescription").value,
        companyId: job.companyId
        }
         fetch("http://localhost:8080/job", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(newPost)
        
         })
      } 
          //location.reload(); 
}
document.getElementById("morebtn")
    .addEventListener("click", () => loadModalEditData(id));


loadfullpost()