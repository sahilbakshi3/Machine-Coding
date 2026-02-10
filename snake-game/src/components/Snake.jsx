import { useEffect, useRef, useState } from "react";
import "./Snake.css";

const GRID_SIZE = 15;

const START_SNAKE = [
  { x: 7, y: 7 },
  { x: 6, y: 7 },
  { x: 5, y: 7 },
];

const randomApple = (snake) => {
  while (true) {
    const apple = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    const overlap = snake.some((s) => s.x === apple.x && s.y === apple.y);
    if (!overlap) {
      return apple;
    }
  }
};

export default function Snake() {
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState(START_SNAKE);
  const [apple, setApple] = useState(randomApple(START_SNAKE));
  const [gameOver, setGameOver] = useState(false);
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const dirRef = useRef(dir);
  dirRef.current = dir;

  useEffect(() => {
    const handleKey = (e) => {
      const map = {
        ArrowUp: { x: 0, y: -1 },
        w: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        a: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        s: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        d: { x: 1, y: 0 },
      };

      const next = map[e.key];
      if (!next) return;

      if (next.x === -dirRef.current.x && next.y === -dirRef.current.y) return;
      setDir(next);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = {
          x: head.x + dirRef.current.x,
          y: head.y + dirRef.current.y,
        };

        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prev;
        }

        if (prev.some((s) => s.x === newHead.x && s.y === newHead.y)) {
          setGameOver(true);
          return prev;
        }

        let newSnake = [newHead, ...prev];

        if (newHead.x === apple.x && newHead.y === apple.y) {
          setScore((s) => s + 1);
          //   console.log("score, increased");
          setApple(randomApple(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [apple, gameOver]);

  const resetGame = () => {
    setSnake(START_SNAKE);
    setDir({ x: 1, y: 0 });
    setApple(randomApple(START_SNAKE));
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="game-wrapper">
      <h2>Score : {score}</h2>

      <div className="grid">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);

          const isSnake = snake.some((s) => s.x === x && s.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isApple = apple.x === x && apple.y === y;

          let className = "cell";
          if (isSnake) className += isHead ? " head" : " snake";
          if (isApple) className += " apple";

          return <div key={i} className={className} />;
        })}
      </div>
      {gameOver && (
        <div className="overlay">
          <h1>Game Over</h1>
          <button onClick={resetGame}>Restart</button>
        </div>
      )}
    </div>
  );
}
