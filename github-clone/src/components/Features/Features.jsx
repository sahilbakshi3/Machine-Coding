import { Bot, GitPullRequest, Shield, Zap } from "lucide-react";
import "./Features.css";

const features = [
  {
    icon: Bot,
    color: "#a371f7",
    tag: "AI-POWERED",
    title: "GitHub Copilot helps you code faster",
    desc: "Draw on decades of open source knowledge to build on top of the best models. Get suggestions for entire functions, write tests automatically, and stay in the flow.",
    link: "Explore GitHub Copilot",
    visual: "copilot",
  },
  {
    icon: GitPullRequest,
    color: "#3fb950",
    tag: "COLLABORATION",
    title: "The home for all developers",
    desc: "Whether you're building something new or contributing to open source, GitHub is where millions of developers come together to collaborate, review, and ship code.",
    link: "Start collaborating",
    visual: "collab",
  },
  {
    icon: Shield,
    color: "#2f81f7",
    tag: "SECURITY",
    title: "Security without slowing you down",
    desc: "Shift security left without creating bottlenecks. GitHub Advanced Security embeds security analysis directly into the developer workflow.",
    link: "Explore GitHub Advanced Security",
    visual: "security",
  },
  {
    icon: Zap,
    color: "#f0883e",
    tag: "AUTOMATION",
    title: "Automate your workflows with Actions",
    desc: "Build, test, and deploy your code with GitHub Actions. Automate your release process, trigger workflows on any GitHub event, and deploy to any cloud.",
    link: "Discover GitHub Actions",
    visual: "actions",
  },
];

function VisualCopilot() {
  return (
    <div className="fv-copilot">
      <div className="fv-code-block">
        <div className="fv-code-line">
          <span className="fv-kw">function</span>{" "}
          <span className="fv-fn">fibonacci</span>(
          <span className="fv-param">n</span>) {"{"}
        </div>
        <div className="fv-code-line fv-suggestion">
          {"  "}
          <span className="fv-kw">if</span> (n &lt;={" "}
          <span className="fv-num">1</span>){" "}
          <span className="fv-kw">return</span> n;
        </div>
        <div className="fv-code-line fv-suggestion">
          {"  "}
          <span className="fv-kw">return</span>{" "}
          <span className="fv-fn">fibonacci</span>(n -{" "}
          <span className="fv-num">1</span>) +{" "}
          <span className="fv-fn">fibonacci</span>(n -{" "}
          <span className="fv-num">2</span>);
        </div>
        <div className="fv-code-line">{"}"}</div>
      </div>
      <div className="fv-copilot-badge">
        <Bot size={12} />
        <span>Copilot suggestion</span>
      </div>
    </div>
  );
}

function VisualCollab() {
  const avatars = ["A", "B", "C", "D", "E"];
  return (
    <div className="fv-collab">
      <div className="fv-pr">
        <div className="fv-pr-header">
          <GitPullRequest size={16} className="fv-pr-icon" />
          <span className="fv-pr-title">feat: add dark mode toggle</span>
          <span className="fv-pr-status">Open</span>
        </div>
        <div className="fv-pr-body">
          <div className="fv-avatars">
            {avatars.map((a, i) => (
              <div key={i} className="fv-avatar" style={{ left: i * 20 }}>
                {a}
              </div>
            ))}
          </div>
          <span className="fv-reviews">5 reviews requested</span>
        </div>
        <div className="fv-checks">
          <span className="fv-check fv-check--pass">✓ CI passing</span>
          <span className="fv-check fv-check--pass">✓ No conflicts</span>
          <span className="fv-check fv-check--review">⟳ Review required</span>
        </div>
      </div>
    </div>
  );
}

function VisualSecurity() {
  const alerts = [
    { sev: "critical", name: "SQL Injection", file: "db/query.js:42" },
    { sev: "high", name: "XSS Vulnerability", file: "views/user.jsx:17" },
    { sev: "medium", name: "Outdated dependency", file: "package.json" },
  ];
  return (
    <div className="fv-security">
      {alerts.map((a, i) => (
        <div key={i} className={`fv-alert fv-alert--${a.sev}`}>
          <span className={`fv-sev fv-sev--${a.sev}`}>{a.sev}</span>
          <div>
            <div className="fv-alert-name">{a.name}</div>
            <div className="fv-alert-file">{a.file}</div>
          </div>
          <Shield size={14} className="fv-alert-icon" />
        </div>
      ))}
    </div>
  );
}

function VisualActions() {
  const steps = [
    { name: "Install deps", status: "done", time: "12s" },
    { name: "Run tests", status: "done", time: "34s" },
    { name: "Build", status: "running", time: "..." },
    { name: "Deploy", status: "pending", time: "--" },
  ];
  return (
    <div className="fv-actions">
      <div className="fv-workflow-name">
        <Zap size={12} />
        <span>CI / Deploy to production</span>
      </div>
      {steps.map((s, i) => (
        <div key={i} className={`fv-step fv-step--${s.status}`}>
          <span className={`fv-step-dot fv-step-dot--${s.status}`} />
          <span className="fv-step-name">{s.name}</span>
          <span className="fv-step-time">{s.time}</span>
        </div>
      ))}
    </div>
  );
}

const visuals = {
  copilot: VisualCopilot,
  collab: VisualCollab,
  security: VisualSecurity,
  actions: VisualActions,
};

export default function Features() {
  return (
    <section className="features">
      <div className="features-inner">
        {features.map((f, i) => {
          const Visual = visuals[f.visual];
          const Icon = f.icon;
          return (
            <div
              key={i}
              className={`feature-row ${i % 2 === 1 ? "feature-row--reverse" : ""}`}
            >
              <div className="feature-text">
                <div className="feature-tag" style={{ color: f.color }}>
                  <Icon size={14} />
                  {f.tag}
                </div>
                <h2 className="feature-title">{f.title}</h2>
                <p className="feature-desc">{f.desc}</p>
                <a href="#" className="feature-link" style={{ color: f.color }}>
                  {f.link} →
                </a>
              </div>
              <div className="feature-visual">
                <Visual />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
