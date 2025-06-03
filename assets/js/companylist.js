let comapaniesArrayList = [];


    
function loadCompanies() {
    let comapaniesList = document.getElementById("companiesList");
    let body = "";
            fetch("http://localhost:8080/company")
            .then(res => res.json())
            .then(dataList => {
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
                                <p class="card-text">${element.industry}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                       <button type="button" class="btn btn-warning show-more" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadModalData(${index})">View Jobs</button>
                                        <button type="button" class="btn btn-warning show-more" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadModalData(${index})">Details</button>
                                       <button type="button" class="btn btn-warning show-more" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadModalData(${index})">Edit</button>
                                   
                                         </div>
                                    <small class="text-body-secondary">9 mins</small>
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
 
    let modalBody = document.getElementById("modal-body");
    console.log(index);
    console.log(comapaniesArrayList[index]);
    modalBody.innerHTML = `
    <div class="card" style="width: 18rem;">
  <div class="card-body">
    <img src="../img/portfolio-1.jpg" alt="../img/portfolio-1.jpg">
    <h5 class="card-title">${comapaniesArrayList[index].name.official}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
    `;
}


function search() { 
    let body = "";
    let searchTxt = document.getElementById("txtSearch").value;
    console.log(searchTxt);
    fetch(`https://restcountries.com/v3.1/name/${searchTxt}`).then(res => res.json())
            .then(dataList => {
                console.log(dataList);
                comapaniesArrayList = dataList;
                loadModalData();
                dataList.forEach((element, index) => {
                    body += `
                                   <div class="col" data-aos="flip-left"
         data-aos-easing="ease-out-cubic"
         data-aos-duration="2000">
                            <div class="card shadow-sm">
                                <img src="${element.flags.png}" alt="">
                                <div class="card-body">
                                <h4>${element.name.common}</h4>
                                    <p class="card-text">${element.flags.alt}</p>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group">
                                           <button type="button" class="btn btn-warning show-more" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadModalData(${index})">View More-></button>
                                        </div>
                                        <small class="text-body-secondary">9 mins</small>
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

loadCompanies();





