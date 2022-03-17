const hamMenu = document.querySelector(".hamMenu");
const nav_mob = document.querySelector(".nav-mob");

let isActive = false;
hamMenu.addEventListener("click", () => {
  if (isActive) {
    nav_mob.style.display = "none";
    isActive = false;
  } else {
    nav_mob.style.display = "block";
    isActive = true;
  }
});

const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 5) {
    header.classList.add("bg-black");
    header.classList.add("transition");
    header.classList.add("duration-500");
    header.classList.add("pb-6");
  } else {
    header.className =
      "fixed w-full top-0 lg:px-8 px-5 lg:pt-8 pt-5 z-[1000] transition duration-500";
  }
});
