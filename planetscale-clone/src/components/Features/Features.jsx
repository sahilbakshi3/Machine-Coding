import "./Features.css";

const sections = [
  {
    id: "performance",
    title: "Performance",
    content: `PlanetScale Metal allows you to run your database on the fastest servers available in the cloud. Our blazing fast NVMe drives unlock unlimited IOPS and drastically lower latencies compared to other cloud database providers like Amazon Aurora and GCP Cloud SQL.`,
    metric: "p95 latency: 45ms → 5ms",
    testimonial: {
      quote:
        "We are very happy with our decision to migrate to PlanetScale Metal which enabled us to achieve the rare outcome of improvements in performance, cost, and reliability.",
      author: "Aaron Young @ Cash App",
    },
  },
  {
    id: "uptime",
    title: "Uptime",
    content: `Ensuring your database is always running and your data is always safe is our number one priority. Nothing comes before uptime and reliability. Our SLA commitment is 99.999% for multi-region deployments and 99.99% for single-region deployments.`,
    features: [
      "Deploy schema changes fully online",
      "Revertable schema changes (with zero data loss)",
      "Online MySQL and Vitess version updates",
      "Online cluster resizing and resharding",
    ],
    testimonial: {
      quote:
        "When you buy PlanetScale, you're getting the technology and database expertise that ran and scaled YouTube, the internet's #2 site, and the team that scaled GitHub to over 100M users globally.",
      author: "Todd Berman @Attentive",
    },
  },
  {
    id: "cost",
    title: "Cost",
    content: `At PlanetScale we believe cost is a unit of scale. Our product is less expensive than RDS MySQL and Aurora for around 85% of the workloads that customers have migrated to Metal. Getting a custom quote is easy: reach out to us.`,
    features: [
      "Best price to performance ratio of any database service",
      "Bring your own cloud with PlanetScale Managed",
      "Purchase through AWS Marketplace or GCP Marketplace",
      "Additional savings through Reserved Instances",
    ],
  },
  {
    id: "security",
    title: "Security",
    content:
      "PlanetScale is trusted by some of the world's largest brands. Our core infrastructure was built to comply with high standards of security, compliance, and privacy.",
    features: [
      "SOC 1 Type 2 & SOC 2 Type 2 + HIPAA compliance",
      "PCI DSS 4.0 compliance as a Level 1 Service Provider",
      "HIPAA Business Associate Agreements available on all plans",
    ],
    testimonial: {
      quote:
        "We have very strict regulatory requirements that can feel painful to the average engineer, however PlanetScale was a strong partner in grinding through our asks.",
      author: "Aaron Young @Cash App",
    },
  },
];

export default function Features() {
  return (
    <div className="features">
      {sections.map((section, i) => (
        <section
          key={section.id}
          className={`feature-section ${i % 2 !== 0 ? "feature-section--alt" : ""}`}
        >
          <div className="feature-inner">
            <div className="feature-label">
              <span className="section-marker">##</span>
              <a href={`#${section.id}`} className="section-title">
                {section.title}
              </a>
            </div>

            <div className="feature-body">
              <p className="feature-text">{section.content}</p>

              {section.metric && (
                <div className="metric-block">
                  <span className="metric-label">↓</span>
                  <span className="metric-value">{section.metric}</span>
                </div>
              )}

              {section.features && (
                <ul className="feature-list">
                  {section.features.map((f, j) => (
                    <li key={j} className="feature-item">
                      <span className="feature-bullet">*</span>
                      <a href="#" className="link-blue">
                        {f}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {section.testimonial && (
                <blockquote className="inline-quote">
                  <p>"{section.testimonial.quote}"</p>
                  <cite>— {section.testimonial.author}</cite>
                </blockquote>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
