import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-title">
            The world's fastest and most scalable cloud databases
          </h1>

          <p className="hero-body">
            PlanetScale brings you the {" "}
            <a href="#" className="link-blue">
              fastest databases
            </a>{" "}
            available in the cloud. Both our Postgres and Vitess databases
            deliver exceptional speed and reliability, with Vitess adding ultra
            scalability through horizontal sharding.
          </p>

          <p className="hero-body">
            Our blazing fast{" "}
            <a href="#" className="link-blue">
              NVMe drives
            </a>{" "}
            unlock <strong>unlimited IOPS</strong>, bringing data center
            performance to the cloud. We offer a range of{" "}
            <a href="#" className="link-blue">
              deployment options
            </a>{" "}
            to cover all of your security and compliance requirements —
            including bring your own cloud with{" "}
            <a href="#" className="link-blue">
              PlanetScale Managed
            </a>
            .
          </p>

          <p className="hero-body">
            PlanetScale powers{" "}
            <a href="#" className="link-blue">
              Tier 0 databases
            </a>{" "}
            at:
          </p>
        </div>
      </div>
    </section>
  );
}
