import { useState } from "react";
import "./ProductTabs.css";

const tabs = ["Vitess", "Postgres", "Neki"];

const vitessAscii = `   ┌────────────────────────────────┐
   │░░░░░░░░░░░░░VTGate░░░░░░░░░░░░░│
   └────────────────────────────────┘
                    │
          ─ ─ ─ ─ ─ ┴ ─ ─ ─ ─ ┐
         │                    │
         ▼                    ▼
   ╔═══════════╗        ╔═══════════╗
   ║           ║        ║           ║
   ║  Primary  ║        ║  Primary  ║
   ║           ║        ║           ║
   ╚═══════════╝        ╚═══════════╝
         │                    │
     ─ ─ ┴ ─ ─            ─ ─ ┴ ─ ─
    │         │          │         │
    ▼         ▼          ▼         ▼
┌───────┐ ┌───────┐  ┌───────┐ ┌───────┐
│Replica│ │Replica│  │Replica│ │Replica│
└───────┘ └───────┘  └───────┘ └───────┘`;

const postgresContent = `PlanetScale Postgres starts at $5/month
and gives you a fully managed PostgreSQL
cluster built for performance.

• High availability clusters with automatic
  failover across three AZs
• Connection pooling with PgBouncer
• Branch-per-environment architecture
• Scale reads with replicas
• Automated backups`;

const nekiContent = `Neki is our next-generation Postgres
sharding architecture — built from first
principles to bring massive scale and
reliability to PostgreSQL workloads.

• Built for large scale Postgres workloads
• Designed for predictable performance
• Fault tolerance at scale
• Currently in early access`;

const content = {
  Vitess: {
    ascii: vitessAscii,
    desc: "Vitess allows MySQL databases to scale horizontally through explicit sharding — enabling a shared nothing architecture distributing data across thousands of nodes.",
  },
  Postgres: {
    text: postgresContent,
    desc: "PlanetScale Postgres gives you a fully managed PostgreSQL cluster built for performance and reliability, offering first-class tooling.",
  },
  Neki: {
    text: nekiContent,
    desc: "Neki is our next-generation Postgres sharding architecture inspired by everything we've learned building Vitess.",
  },
};

export default function ProductTabs() {
  const [active, setActive] = useState("Vitess");

  return (
    <section className="product-tabs-section">
      <div className="product-tabs-inner">
        <div className="tabs-header">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${active === tab ? "tab-btn--active" : ""}`}
              onClick={() => setActive(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-content">
          <div className="tab-left">
            <p className="tab-desc">{content[active].desc}</p>
            {active === "Vitess" && (
              <p className="tab-body">
                Vitess was developed at YouTube by the founders of PlanetScale
                to scale their main MySQL database to petabytes of data on
                70,000 nodes across 20 data centers. Now maintained and managed
                by PlanetScale, Vitess powers the databases of some of the web's
                largest properties: Slack, HubSpot, Blizzard, Etsy, GitHub,
                Block, Bloomberg, Yelp, and more.
              </p>
            )}
            {active === "Postgres" && (
              <p className="tab-body">
                Available in AWS and GCP. High availability clusters deliver
                automatic failover across three availability zones.{" "}
                <a href="#" className="link-blue">
                  PlanetScale Metal
                </a>{" "}
                starts at $50/month for NVMe-backed performance with{" "}
                <strong>unlimited IOPS</strong>.
              </p>
            )}
            {active === "Neki" && (
              <p className="tab-body">
                Follow progress on our blog and{" "}
                <a href="#" className="link-blue">
                  join the waitlist
                </a>
                . Interested in early access? Visit{" "}
                <a href="#" className="link-blue">
                  neki.dev
                </a>
                .
              </p>
            )}
          </div>

          <div className="tab-right">
            <pre className="ascii-block">
              {content[active].ascii || content[active].text}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
