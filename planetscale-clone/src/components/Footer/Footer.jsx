import "./Footer.css";

const footerLinks = {
  Company: ["About", "Blog", "Changelog", "Careers", "Events"],
  Product: ["Case studies", "Enterprise", "Pricing", "Benchmarks"],
  Resources: ["Documentation", "Support", "Status", "Trust Center"],
  Courses: ["Database Scaling", "Learn Vitess", "MySQL for Developers"],
  "Open source": ["Vitess", "Vitess community", "GitHub"],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="footer-col">
              <h4 className="footer-heading">{category}</h4>
              <ul className="footer-links">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <a href="#">Privacy</a>
            <span>|</span>
            <a href="#">Terms</a>
            <span>|</span>
            <a href="#">Cookies</a>
            <span>|</span>
            <a href="#">Patents</a>
          </div>
          <p className="footer-copy">
            © 2026 PlanetScale, Inc. All rights reserved.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link">
              GitHub
            </a>
            <a href="#" className="social-link">
              X
            </a>
            <a href="#" className="social-link">
              LinkedIn
            </a>
            <a href="#" className="social-link">
              YouTube
            </a>
            <a href="#" className="social-link">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
