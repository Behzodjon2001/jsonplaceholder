let postRow = document.querySelector(".post-row");
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

function getCardPost({ title, body, id }) {
    return `
    <div class="col-3 mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">
          ${body}
          </p>
          <a href="comments.html" onclick="saveId(${id})" class="btn btn-primary">Go comments</a>
        </div>
      </div>
    </div>
  `;
}

function saveId(id) {
    localStorage.setItem("post", id);
}

async function getData() {
    postRow.innerHTML = "...loading";
    let res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    );
    let data = await res.json();
    postRow.innerHTML = "";
    data.forEach((post) => {
        postRow.innerHTML += getCardPost(post);
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