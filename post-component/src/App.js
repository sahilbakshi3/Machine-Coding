import React, { useEffect, useState } from "react";
import PostComponent from "./components/PostComponent";

const App = () => {
  const [page, setPage] = useState(1);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${page}`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, [page]);

  return (
    <PostComponent
      value={page}
      handlePageChange={(e) => setPage(Number(e.target.value))}
      data={post}
    />
  );
};

export default App;
