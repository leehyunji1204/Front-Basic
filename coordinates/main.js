const row = document.querySelector(".row");
const col = document.querySelector(".col");
const target = document.querySelector(".target");
const tag = document.querySelector(".tag");

addEventListener("load", () => {
  const targetReact = target.getBoundingClientRect();
  const targetHalfWidth = targetReact.width / 2;
  const targetHalfHeight = targetReact.height / 2;

  document.addEventListener("mousemove", (event) => {
    const x = event.clientX;
    const y = event.clientY;

    col.style.transform = `translateX(${x}px)`;
    row.style.transform = `translateY(${y}px)`;
    target.style.transform = `translate(${x - targetHalfWidth}px,${
      y - targetHalfHeight
    }px)`;
    tag.style.transform = `translate(${x}px,${y}px)`;
    tag.innerHTML = `${x}px, ${y}px`;
  });
});
