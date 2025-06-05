console.log("Full post")

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
function loadfullpost(){
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"), 10);
    console.log(id);

    Promise.all([getJobs(), getCompanies()]).then(([dataList, companiesList]) => {
            jobsArrayList = dataList;
        document.getElementById("job-title").textContent = jobsArrayList[id-2].title;
        document.getElementById("com-name").textContent = companiesList[parseInt(jobsArrayList[id-2].companyId)].name;
        document.getElementById("location").textContent =companiesList[parseInt(jobsArrayList[id-2].companyId)].location;;
        document.getElementById("salary").textContent =jobsArrayList[id-2].salary;
        document.getElementById("salary_date").textContent =jobsArrayList[id-2].salary_date;
        document.getElementById("job-content").textContent =jobsArrayList[id-2].description;
        const tags = jobsArrayList[id-2].tags;
        const tagsContainer = document.getElementById('tagsContainer');

        tags.forEach(tag => {
            const tagElement = document.createElement('a');
            tagElement.href = "";
            tagElement.innerHTML = `<span class="badge badge-pill p-2 badge-light">${tag}</span>`;
            tagsContainer.appendChild(tagElement);
        });
    });

}

loadfullpost()