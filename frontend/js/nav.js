// frontend/js/nav.js
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector("#navbar");
  const links = navbar.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("click", function () {
      alert(`Navegando a: ${link.href}`);
    });
  });
});
