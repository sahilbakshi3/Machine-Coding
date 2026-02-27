import { Star, GitFork, Eye, Users, Globe, Package } from "lucide-react";
import "./Bento.css";

export default function Bento() {
  return (
    <section className="bento">
      <div className="bento-inner">
        <div className="bento-header">
          <p className="bento-eyebrow">THE GITHUB PLATFORM</p>
          <h2 className="bento-title">
            Everything developers need,
            <br />
            all in one place
          </h2>
        </div>

        <div className="bento-grid">
          {/* Large card - community */}
          <div className="bento-card bento-card--large">
            <div className="bento-card-content">
              <Globe
                size={24}
                className="bento-card-icon"
                style={{ color: "#79c0ff" }}
              />
              <h3 className="bento-card-title">
                100M+ developers. One platform.
              </h3>
              <p className="bento-card-desc">
                The world's largest developer community builds here. Join them.
              </p>
            </div>
            <div className="bento-globe">
              <div className="globe-ring globe-ring--1" />
              <div className="globe-ring globe-ring--2" />
              <div className="globe-ring globe-ring--3" />
              <div className="globe-dot globe-dot--1" />
              <div className="globe-dot globe-dot--2" />
              <div className="globe-dot globe-dot--3" />
              <div className="globe-dot globe-dot--4" />
            </div>
          </div>

          {/* Repos card */}
          <div className="bento-card bento-card--tall">
            <div className="bento-card-content">
              <Package
                size={24}
                className="bento-card-icon"
                style={{ color: "#ffa657" }}
              />
              <h3 className="bento-card-title">420M+ repositories</h3>
              <p className="bento-card-desc">
                Find the tools and packages you need for every project.
              </p>
            </div>
            <div className="bento-repo-list">
              {[
                { name: "facebook/react", stars: "218k", lang: "JavaScript" },
                { name: "microsoft/vscode", stars: "158k", lang: "TypeScript" },
                { name: "torvalds/linux", stars: "167k", lang: "C" },
                { name: "vercel/next.js", stars: "120k", lang: "TypeScript" },
              ].map((r, i) => (
                <div key={i} className="bento-repo-item">
                  <span className="repo-name">{r.name}</span>
                  <span className="repo-lang">{r.lang}</span>
                  <span className="repo-stars">
                    <Star size={10} /> {r.stars}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stars card */}
          <div className="bento-card">
            <div className="bento-card-content">
              <Star
                size={24}
                className="bento-card-icon"
                style={{ color: "#e3b341" }}
              />
              <h3 className="bento-card-title">Stars tell a story</h3>
              <p className="bento-card-desc">
                Discover trending projects and bookmark your favorites.
              </p>
            </div>
            <div className="bento-stars-visual">
              {[120, 80, 140, 60, 100, 160, 90].map((h, i) => (
                <div
                  key={i}
                  className="star-bar"
                  style={{ height: h, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>

          {/* Forks card */}
          <div className="bento-card">
            <div className="bento-card-content">
              <GitFork
                size={24}
                className="bento-card-icon"
                style={{ color: "#3fb950" }}
              />
              <h3 className="bento-card-title">Fork, build, contribute</h3>
              <p className="bento-card-desc">
                Fork any repo and start building your version instantly.
              </p>
            </div>
          </div>

          {/* Teams card */}
          <div className="bento-card bento-card--wide">
            <div className="bento-card-content">
              <Users
                size={24}
                className="bento-card-icon"
                style={{ color: "#a371f7" }}
              />
              <h3 className="bento-card-title">Teams that build together</h3>
              <p className="bento-card-desc">
                Code review, project management, and wikis — all in one place
                for teams of any size.
              </p>
            </div>
            <div className="bento-team-visual">
              {["Frontend", "Backend", "DevOps", "Design"].map((team, i) => (
                <div key={i} className="team-pill">
                  <div className="team-avatars">
                    {[0, 1, 2].map((j) => (
                      <div
                        key={j}
                        className="team-avatar"
                        style={{ left: j * 16 }}
                      />
                    ))}
                  </div>
                  <span>{team}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
