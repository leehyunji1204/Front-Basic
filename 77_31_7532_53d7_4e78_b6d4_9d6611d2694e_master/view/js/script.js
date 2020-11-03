// Add your javascript here
const prev = document.querySelector(".previous");
const next = document.querySelector(".next");
const carouselImg = document.querySelector(".carousel-img");
const list = document.querySelector(".indicator-list");

let curIndex = 1;

function moveRslide() {
  if (curIndex < 5) {
    curIndex++;
  } else {
    curIndex = 1;
  }
  document.querySelector(".action").classList.remove("action");
  document.querySelector(`li[value="${curIndex}"]`).classList.add("action");
  carouselImg.setAttribute("src", `../assets/images/img-${curIndex}.jpg`);
}

function moveLslide() {
  if (curIndex > 1) {
    curIndex--;
  } else {
    curIndex = 5;
  }
  document.querySelector(".action").classList.remove("action");
  document.querySelector(`li[value="${curIndex}"]`).classList.add("action");
  carouselImg.setAttribute("src", `../assets/images/img-${curIndex}.jpg`);
}

prev.addEventListener("click", () => {
  moveLslide();
});

next.addEventListener("click", () => {
  moveRslide();
});

list.addEventListener("click", (event) => {
  document.querySelector(".action").classList.remove("action");
  event.target.classList.add("action");
  carouselImg.setAttribute(
    "src",
    `../assets/images/img-${event.target.value}.jpg`
  );
});
