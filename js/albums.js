let albums = document.querySelector(".albums-row");
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

function getCardAlbums({ title, userId, id }) {
  return `
    <div class="col-lg-4 col-12 col-sm-6 mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${userId}</h5>
          <P>${title}</P>
        </div>
      </div>
    </div>
  `;
}

function saveId(id) {
  localStorage.setItem("post", id);
}

async function getData() {
  albums.innerHTML = "...loading";
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/albums?_page=${page}&_limit=${limit}`
  );
  let data = await res.json();
  albums.innerHTML = "";
  data.forEach((post) => {
    albums.innerHTML += getCardAlbums(post);
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
