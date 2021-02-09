window.addEventListener("load", function () {
  const scrollHandler = (e) => {
    e.preventDefault();
    document
      .querySelector(e.target.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
    document.querySelector(".mobile-nav ul").style.display = "none";
  };

  const menuHandler = () => {
    const el = document.querySelector(".mobile-nav ul");
    if (el.style.display === "none") {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  };

  document
    .querySelectorAll("nav a")
    .forEach((a) => a.addEventListener("click", scrollHandler));

  document
    .querySelector(".mobile-nav i")
    .addEventListener("click", menuHandler);

  document.addEventListener("click", function (e) {
    if (!document.querySelector(".mobile-nav").contains(e.target)) {
      document.querySelector(".mobile-nav ul").style.display = "none";
    }
  });

  const Urlusers = "https://jsonplaceholder.typicode.com/users";
  const Urlposts = "https://jsonplaceholder.typicode.com/posts";

  function getDataHandler(url) {
    return fetch(url).then((blob) => blob.json());
  }

  getDataHandler(Urlusers).then((dataUsers) => {
    getDataHandler(Urlposts).then((dataPosts) => {
      const posts = [...dataPosts];

      document.querySelector(".glider").innerHTML = [...dataUsers]
        .map(
          (user, i) => `
            <div>
              <img src="./img/smith.jpg" alt="${user.name}">
              <p class="review">${posts[i].body}</p>
              <p class="author">${user.name}</p>
            </div>
          `
        )
        .join("");

      new Glider(document.querySelector(".glider"), {
        scrollLock: true,
        dots: ".dots",
      });
    });
  });
});
