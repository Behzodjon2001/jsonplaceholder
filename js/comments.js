let commentsRow = document.querySelector(".comment-row");

function getCardPost({ name, body, email }) {
    return `
    <div class="mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">
          ${body}
          </p>
          <a href="mailto: ${email}" class="btn btn-primary">${email}</a>
        </div>
      </div>
    </div>
  `;
}

async function getData() {
    let postId = localStorage.getItem("post");
    commentsRow.innerHTML = "...loading";
    let res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    let data = await res.json();
    console.log(data);
    commentsRow.innerHTML = "";
    data.forEach((post) => {
        commentsRow.innerHTML += getCardPost(post);
    });
}

getData();