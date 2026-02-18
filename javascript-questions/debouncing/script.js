document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelector(".tabs");
  const tabButtons = tabs.querySelectorAll(".tab-button");
  const tabPanes = tabs.querySelectorAll(".tab-pane");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Deactivate all buttons and panes
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));

      // Activate the clicked button
      button.classList.add("active");

      // Activate the corresponding pane
      const tabId = button.dataset.tab;
      document.getElementById(tabId).classList.add("active");
    });
  });
});
