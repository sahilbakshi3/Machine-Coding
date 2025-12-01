import React, { useState } from "react";
import "./App.css";
import { HeartIcon, SpinnerIcon } from "./utils/icons";

const App = () => {
  const [liked, setLiked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  // https://questions.greatfrontend.com/api/questions/like-button

  const handleLike = async () => {
    setIsFetching(true);
    setError(null);

    try {
      const res = await fetch(
        "https://questions.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: liked ? "unlike" : "like",
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setLiked(!liked);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div>
      <button
        disabled={isFetching}
        className={`likeBtn ${liked ? "liked" : ""}`}
        onClick={handleLike}
      >
        {isFetching ? <SpinnerIcon /> : <HeartIcon />}{" "}
        {liked ? "Liked" : "Like"}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default App;
