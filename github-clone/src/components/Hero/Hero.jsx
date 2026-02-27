import React, { useState } from "react";
import { ArrowRight, GitBranch } from "lucide-react";
import "./Hero.css";

const Hero = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="hero">
      <div className="hero-glow hero-glow--green" />
      <div className="hero-glow hero-glow--purple" />
      <div className="hero-grid" />

      <div className="hero-inner">
        <a href="#" className="hero-pill">
          <span className="pill-badge">New</span>
          <span className="pill-text">Github Copilot - now with GPT-4o</span>
          <ArrowRight size={14} />
        </a>

        <h1 className="hero-title">
          Build and Ship Software
          <br />
          <span className="hero-title--gradient">on a single platform</span>
        </h1>

        <p className="hero-subtitle">
          Join the world's most widely adopted AI-powered developer platform
          where millions of developers, businesses, and the largest open source
          community build software that moves the world forward.
        </p>

        <div className="hero-signup">
          <input
            type="email"
            placeholder="Enter your email"
            className="hero-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="hero-btn">
            Sign Up for GitHub
            <ArrowRight size={16} />
          </button>
        </div>
        <p className="hero-note">Free forever. No credit card required.</p>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-number">100M+</span>
            <span className="stat-label">Developers</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="stat-number">4M+</span>
            <span className="stat-label">Organizations</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="stat-number">90%</span>
            <span className="stat-label">Fortune 100</span>
          </div>
        </div>
      </div>

      <div className="hero-terminal-wrap">
        <div className="hero-terminal">
          <div className="terminal-bar">
            <span className="terminal-dot terminal-dot--red" />
            <span className="terminal-dot terminal-dot--yellow" />
            <span className="terminal-dot terminal-dot--green" />
            <span className="terminal-title">terminal</span>
          </div>
          <div className="terminal-body">
            <div className="terminal-line">
              <span className="t-prompt">~</span>
              <span className="t-cmd">git init</span>
            </div>
            <div className="terminal-line t-out">
              Initialized empty Git repository
            </div>
            <div className="terminal-line">
              <span className="t-prompt">~</span>
              <span className="t-cmd">git add .</span>
            </div>
            <div className="terminal-line">
              <span className="t-prompt">~</span>
              <span className="t-cmd">
                git commit -m <span className="t-string">"Initial commit"</span>
              </span>
            </div>
            <div className="terminal-line t-out">
              [main (root-commit) a1b2c3d] Initial commit
            </div>
            <div className="terminal-line">
              <span className="t-prompt">~</span>
              <span className="t-cmd">git push origin main</span>
            </div>
            <div className="terminal-line t-green">
              ✓ Branch 'main' set up to track 'origin/main'
            </div>
            <div className="terminal-line">
              <span className="t-prompt">~</span>
              <span className="t-cursor">▊</span>
            </div>
          </div>
        </div>
        <div className="float-card float-card--tl">
          <GitBranch size={14} className="float-icon" />
          <div className="float-title">feat/ai-copilot</div>
          <div className="float-sub">2 minutes ago</div>
        </div>
      </div>

      <div className="float-card float-card--br">
        <div className="float-avatar">M</div>
        <div>
          <div className="float-title">Merged by monalisa</div>
          <div className="float-sub">PR #1337 · 14 checks passed</div>
        </div>
        <span className="float-badge">✓ Merged</span>
      </div>
    </section>
  );
};

export default Hero;
