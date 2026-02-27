import { ArrowRight } from "lucide-react";
import "./CTA.css";

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta-glow" />
      <div className="cta-inner">
        <h2 className="cta-title">Let's build from here</h2>
        <p className="cta-subtitle">
          The world's most advanced AI-powered developer platform. Free for
          individuals and small teams.
        </p>
        <div className="cta-actions">
          <a href="#" className="cta-btn-primary">
            Start for free <ArrowRight size={16} />
          </a>
          <a href="#" className="cta-btn-secondary">
            Try GitHub Copilot
          </a>
        </div>
      </div>
    </section>
  );
}
