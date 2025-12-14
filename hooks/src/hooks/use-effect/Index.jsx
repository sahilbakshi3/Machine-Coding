import React, { useEffect, useState } from "react";

const EffectExample = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/posts?limit=30")
      .then((res) => res.json())
      .then((json) => setPosts(json.posts));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default EffectExample;

/* ------------------------------------------------------------------
   EFFECT EXAMPLE (Fetching data with useEffect)
   ------------------------------------------------------------------

   GOAL:
   - Fetch posts from API
   - Store them in state
   - Render list using map()

   ------------------------------------------------------------------
   STATE:
   posts → array of post objects (initially empty [])

   ------------------------------------------------------------------
   useEffect:
   - Runs ONCE on mount (empty dependency array)
   - Fetches data from API
   - API response has shape:
       {
         posts: [],
         total,
         skip,
         limit
       }
   - We ONLY store data.posts in state

   ------------------------------------------------------------------
*/
