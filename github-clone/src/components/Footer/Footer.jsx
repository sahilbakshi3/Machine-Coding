import "./Footer.css";

const footerLinks = {
  Product: [
    "Features",
    "Security",
    "Team",
    "Enterprise",
    "Customer stories",
    "Pricing",
    "Resources",
  ],
  Platform: ["Developer API", "Partners", "Electron", "GitHub Desktop"],
  Support: [
    "Docs",
    "Community Forum",
    "Professional Services",
    "Premium Support",
    "Skills",
    "Status",
    "Contact GitHub",
  ],
  Company: [
    "About",
    "Blog",
    "Careers",
    "Press",
    "Inclusion",
    "Social Impact",
    "Shop",
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Logo */}
          <div className="footer-logo-col">
            <a href="#" className="footer-logo">
              <svg
                height="24"
                viewBox="0 0 16 16"
                width="24"
                fill="currentColor"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </a>
            <p className="footer-tagline">© 2024 GitHub, Inc.</p>
          </div>

          {/* Links */}
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
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Sitemap</a>
            <a href="#">What is Git?</a>
          </div>
          <div className="footer-social">
            <a href="#" className="social-btn">
              𝕏
            </a>
            <a href="#" className="social-btn">
              in
            </a>
            <a href="#" className="social-btn">
              ▶
            </a>
            <a href="#" className="social-btn">
              ◻
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
