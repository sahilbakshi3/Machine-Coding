import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

/* ------------------------------------------------------------------
   CUSTOM HOOK: useFetch
   ------------------------------------------------------------------

   GOAL:
   - Reusable data fetching with loading + error states
   - Cancels request if component unmounts (AbortController)
   - Refetches automatically when URL changes

   ------------------------------------------------------------------
   USAGE:
   const { data, loading, error } = useFetch("https://api.example.com/posts")

   ------------------------------------------------------------------
   STATE:
   data     → parsed JSON response (null initially)
   loading  → true while request is in-flight
   error    → error message string (null if no error)

   ------------------------------------------------------------------
   ABORT CONTROLLER:
   - Created fresh on each effect run
   - Passed as { signal } to fetch()
   - Cleanup fn calls controller.abort()
   - Prevents state updates on unmounted components

   ------------------------------------------------------------------
   ERROR HANDLING:
   - Non-2xx responses throw manually (fetch doesn't throw for 4xx/5xx)
   - AbortError is ignored (expected on cleanup)
   - All other errors set error state

   ------------------------------------------------------------------
*/
