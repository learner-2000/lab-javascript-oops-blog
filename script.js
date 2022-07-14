/* Fill your code*/
document.getElementById("addBlog").addEventListener("click", function () {
  document.getElementById("popupContact").style.display = "block";
});
document.getElementById("close").addEventListener("click", function () {
  document.getElementById("popupContact").style.display = "none";
});

var existingEntry = JSON.parse(localStorage.getItem("blog_array"));

class Blog {
  constructor(title, detail, time, image) {
    this.title = title;
    this.detail = detail;
    this.time = time;
    this.image = image;
  }
  addContaint() {
    document.querySelector(".body-div2").innerHTML += `
      <div class="article-card" id="flashcard">
      <img src="${this.image}" alt="">
      <div class="card-text" id="card-text">
          <h1 id="blog-title">${
            this.title.length > 18
              ? this.title.toUpperCase().substr(0, 18) + "..."
              : this.title.toUpperCase()
          }</h1>
          <p id="blog-description">${
            this.detail.length > 150
              ? this.detail.substr(0, 150) + "..."
              : this.detail
          }</p>
          <p>${this.time}</p>
      </div>
      <div class="card-buttons">
      <a><button id="delete" class="delete">DELETE</button></a>
      </div>
  </div>
      `;
    document.getElementById("popupContact").style.display = "none";
    deleteFunc();
  }
}

var post = document.getElementById("post");
post.addEventListener("click", function () {
  var title = document.getElementById("title").value;
  var detail = document.getElementById("detail").value;
  var date = getCurrentDateTime();
  var randomImage = `https://picsum.photos/id/${Math.floor(
    Math.random() * (1056 - 1048) + 1048
  )}/330/200`;
  addBlog(title, detail, date, randomImage);
});

function getCurrentDateTime() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var dateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  return dateTime;
}

function addBlog(title, detail, date, randomImage) {
  var add_blog = new Blog(title, detail, date, randomImage);
  if (existingEntry) {
    existingEntry.push(add_blog);
    localStorage.setItem("blog_array", JSON.stringify(existingEntry));
  } else {
    var blog_array = [];
    blog_array.push(add_blog);
    localStorage.setItem("blog_array", JSON.stringify(blog_array));
  }
  add_blog.addContaint();
}

if (existingEntry) {
  existingEntry.forEach(function (element) {
    document.querySelector(".body-div2").innerHTML += `
                <div class="article-card" id="flashcard">
                <img src="${element.image}" alt="">
                <div class="card-text" id="card-text">
                    <h1 id="blog-title">${
                      element.title.length > 18
                        ? element.title.toUpperCase().substr(0, 18) + "..."
                        : element.title.toUpperCase()
                    }</h1>
                    <p id="blog-description">${
                      element.detail.length > 150
                        ? element.detail.substr(0, 150) + "..."
                        : element.detail
                    }</p>
                    <p>${element.time}</p>
                </div>
                <div class="card-buttons">
                    <a><button class="delete" id="delete">DELETE</button></a>
                </div>
            </div>
                `;
  });
  deleteFunc();
}

// function editFunc() {
//   const editBtn = document.querySelectorAll('.editBtn');
//   editBtn.forEach(function (element) {
//     element.addEventListener('click', function () {
//       document.getElementById('popupContact').style.display = 'block';
//     });
//   });
// }

function deleteFunc() {
  const deleteBtn = document.querySelectorAll(".delete");
  deleteBtn.forEach(function (element) {
    element.addEventListener("click", function () {
      var delete_blog = element.parentElement.parentElement.parentElement;
      var blog_array = JSON.parse(localStorage.getItem("blog_array"));
      blog_array.forEach(function (element, index) {
        if (
          element.title.length > 18
            ? element.title.toLowerCase().substr(0, 18) + "...".trim()
            : element.title.toLowerCase().trim() ===
              delete_blog.children[1].children[0].innerText.toLowerCase().trim()
        ) {
          console.log(element.title);
          blog_array.splice(index, 1);
          delete_blog.remove();
          localStorage.setItem("blog_array", JSON.stringify(blog_array));
        } else {
          console.log("not found");
        }
      });
    });
  });
}
