const input = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

let allJobs = []; // store fetched jobs

// Debounce function
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Fetch jobs (paginated API)
async function fetchJobs() {
  try {
    const res = await fetch("https://jsonfakery.com/jobs/paginated");
    const data = await res.json();

    allJobs = data.data || data.jobs || [];

    displayJobs(allJobs);
  } catch (err) {
    console.error(err);
  }
}

// Display jobs
function displayJobs(jobs) {
  if (!jobs.length) {
    resultsDiv.innerHTML = "<p>No results</p>";
    return;
  }

  resultsDiv.innerHTML = jobs
    .map(
      (job) => `
      <div class="card">
        <div class="title">${job.title || "No title"}</div>
        <div class="company">${job.company || "Unknown company"}</div>
      </div>
    `,
    )
    .join("");
}

// Search filter (client-side)
function handleSearch(query) {
  const filtered = allJobs.filter((job) =>
    (job.title || "").toLowerCase().includes(query.toLowerCase()),
  );

  displayJobs(filtered);
}

// Debounced version
const debouncedSearch = debounce(handleSearch, 500);

// Event listener
input.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});

// Initial fetch
fetchJobs();
