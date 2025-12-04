const pieChart = document.querySelector(".piechart");

document.querySelector("#inputHandler").addEventListener("input", (e) => {
  pieChart.style = `--percentage:${e.target.value}%`;
});
