import React, { useState } from "react";
import "./Widget.css";

export default function PollWidget() {
  const [options, setOptions] = useState([
    { id: 1, text: "React", votes: 0 },
    { id: 2, text: "Vue", votes: 0 },
    { id: 3, text: "Angular", votes: 0 },
    { id: 4, text: "Svelte", votes: 0 },
  ]);

  const vote = (id) => {
    const updated = options.map((opt) =>
      opt.id === id ? { ...opt, votes: opt.votes + 1 } : opt,
    );
    setOptions(updated);
  };

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const getPercentage = (votes) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  return (
    <div className="poll-container">
      <h2 className="poll-title">Favorite Frontend Framework</h2>

      {options.map((opt) => {
        const percentage = getPercentage(opt.votes);

        return (
          <div
            key={opt.id}
            className="poll-option"
            onClick={() => vote(opt.id)}
          >
            <div className="poll-text">
              <span>{opt.text}</span>
              <span>{percentage}%</span>
            </div>

            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      })}

      <p className="total">Total votes: {totalVotes}</p>
    </div>
  );
}

//////////////////// REACT POLL / SURVEY WIDGET — CHEAT SHEET ////////////////////

// Goal:
// Allow users to vote for an option and display live percentage bars
// showing how much of the total vote each option has received.

// Data structure:
// options -> array of poll choices
// Each option contains:
//   id       -> unique identifier
//   label    -> text shown to the user
//   votes    -> number of votes received

// Example:
// options = [
//   { id: 1, label: "React", votes: 0 },
//   { id: 2, label: "Vue", votes: 0 },
//   { id: 3, label: "Angular", votes: 0 },
//   { id: 4, label: "Svelte", votes: 0 },
// ];

// Core state idea:
// options array is the source of truth.
// Every vote updates this state and triggers a re-render.

// Voting event:
// handleVote(optionId):
//   find the clicked option
//   increase its vote count by 1
//   update the options state

// Total vote calculation:
// totalVotes = sum of votes for all options

// Percentage calculation (for each option):
// percentage = (optionVotes / totalVotes) * 100
//
// Edge case:
// if totalVotes === 0
//   percentage = 0

// Progress bar logic:
// Each option has a bar representing its vote share.
// barWidth = percentage
//
// Example:
// React votes = 5
// totalVotes = 10
//
// percentage = (5 / 10) * 100 = 50%
// progress bar width = 50%

// Rendering flow:
// Loop through options
//   display option label
//   display percentage value
//   render progress bar using percentage
//   attach click handler to vote

// UI update cycle:
// User clicks option
//      ↓
// Vote count increases
//      ↓
// State updates
//      ↓
// Total votes recalculated
//      ↓
// Percentages recalculated
//      ↓
// Progress bars update automatically

// Optional UX improvements:
// - Prevent multiple votes from same user
// - Highlight selected option
// - Animate bar width changes
// - Persist votes in localStorage or backend
// - Enable real-time updates using WebSockets

// Interview talking points:
// Demonstrates state-driven UI updates
// Shows derived state (percentage from votes)
// Uses simple math + rendering loop for dynamic visualization
// Common UI pattern for dashboards, surveys, and feedback systems

///////////////////////////////////////////////////////////////////////////////////
