import { useState, useEffect } from "react";
import { useDebounce } from "./hooks/useDebounce";

export default function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("https://jsonfakery.com/jobs/paginated")
      .then((res) => res.json())
      .then((data) => {
        const jobsData = data.data || data.jobs || [];
        console.log("DATA:", jobsData);
        setJobs(jobsData);
      });
  }, []);

  const filteredJobs = jobs.filter((job) =>
    (job.job_title || job.title || "")
      .toLowerCase()
      .includes(debouncedQuery.toLowerCase()),
  );

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />

      {filteredJobs.map((job, i) => (
        <div key={i}>{job.job_title || job.title}</div>
      ))}
    </>
  );
}
