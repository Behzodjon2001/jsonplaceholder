let usersRow = document.querySelector(".users-row");
let pagination = document.querySelector(".pagination");

// fetch("https://jsonplaceholder.typicode.com/posts")
//   .then((res) => {
//     return res.json();
//   })
//   .then((res) => {
//     console.log(res);
//   });

let page = 1;
let limit = 10;

function getCardUsers({
    company,
    website,
    phone,
    address,
    email,
    username,
    name,
    title,
    body,
    id,
}) {
    return `
    <div class="col-4 mb-3">
      <div class="card">
        <div class="card-body">
        <div class=" d-flex justify-content-between align-items-center">
         <h5>${name}</h5>
         <h4>${username}</h4>
        </div>
        <div class=" d-flex justify-content-between">
         <h5>${email}</h5>
         <div>
         <h4>${address.street}</h4>
         <h4>${address.suite}</h4>
         <h4>${address.city}</h4>
         <h4>${address.zipcode}</h4>
         <h4>${address.geo.lat}</h4>
         <h4>${address.lng}</h4>
         </div>
        </div>
        <div class=" d-flex justify-content-between">
         <h5>${phone}</h5>
         <h4>${website}</h4>
        </div>
        <div class=" d-flex justify-content-between">
         <h5>${company.name}</h5>
         <h5>${company.catchPhrase}</h5>
         <h5>${company.bs}</h5>
        </div>
         <div class="d-flex gap-2 ">
           <div class="col-10 mb-3 ">
             <a href="posts.html" onclick="saveId(${id})" class="btn btn-primary m-1">Go posts</a>
             <a href="todos.html" onclick="saveId(${id})" class="btn btn-primary m-1">Go todos</a>
             <a href="photos.html" onclick="saveId(${id})" class="btn btn-primary m-1">Go photos</a>
             <a href="albums.html" onclick="saveId(${id})" class="btn btn-primary m-1">Go albums</a>
           </div>
         </div>
        </div>
      </div>
    </div>
  `;
}

function saveId(id) {
    localStorage.setItem("post", id);
}

async function getData() {
    usersRow.innerHTML = "...loading";
    let res = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`
    );
    let data = await res.json();
    usersRow.innerHTML = "";
    data.forEach((post) => {
        usersRow.innerHTML += getCardUsers(post);
    });
}

getData();

function getPagination() {
    let pagination_numbers = "";
    Array(10)
        .fill(1)
        .forEach((item, index) => {
            pagination_numbers += `<li class="page-item ${
        page == index + 1 ? "active" : ""
      }" onclick="getPage(${index + 1})">
        <span class="page-link">
          ${index + 1}
        </span>
      </li>`;
        });

    pagination.innerHTML = `
    <li onclick="getPage('-')" class="page-item ${
      page == 1 ? "disabled" : ""
    }"><button class="page-link" href="#">Previous</button></li>
    ${pagination_numbers}
    <li onclick="getPage('+')" class="page-item ${
      page == 10 ? "disabled" : ""
    }"><button class="page-link" href="#">Next</button></li>
  `;
}

getPagination();

function getPage(p) {
    if (p == "+") {
        page++;
    } else if (p == "-") {
        page--;
    } else {
        page = p;
    }
    if (page <= 10) {
        getData();
        getPagination();
    }
}