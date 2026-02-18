const stars = document.querySelectorAll("#stars span");
let rating = 0;

function paint(val) {
  stars.forEach((s, idx) => s.classList.toggle("gold", idx < val));
}

stars.forEach((star) => {
  star.onmouseenter = () => paint(star.dataset.v);
  star.onmouseleave = () => paint(rating);
  star.onclick = () => {
    rating = star.dataset.v;
    paint(rating);
  };
});
