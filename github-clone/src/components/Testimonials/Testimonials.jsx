import "./Testimonials.css";

const testimonials = [
  {
    quote:
      "GitHub has fundamentally changed how our team collaborates. The pull request workflow and code review tools are unmatched.",
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "Stripe",
    avatar: "S",
    color: "#635BFF",
  },
  {
    quote:
      "We scaled from 10 to 500 engineers without changing our core workflow. GitHub Actions and Copilot are game changers.",
    name: "Marcus Johnson",
    role: "CTO",
    company: "Shopify",
    avatar: "M",
    color: "#96BF48",
  },
  {
    quote:
      "GitHub Copilot genuinely makes our developers 40% more productive. It's not hype — we measured it.",
    name: "Priya Patel",
    role: "Head of Developer Experience",
    company: "Airbnb",
    avatar: "P",
    color: "#FF5A5F",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials-inner">
        <p className="testimonials-eyebrow">WHAT DEVELOPERS SAY</p>
        <h2 className="testimonials-title">Loved by millions of teams</h2>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-stars">{"★★★★★"}</div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                <div
                  className="testimonial-avatar"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
