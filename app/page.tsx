import Image from "next/image";
import { Brand } from "./brand";
import { Header, ProjectPlanner, SolutionExplorer } from "./ui";

const services = [
  { number: "01", icon: "⟨/⟩", title: "Custom software", description: "Your business is unique. Your software should be too. Purpose-built systems that work the way you do.", tags: ["Business systems", "Enterprise platforms"] },
  { number: "02", icon: "▧", title: "Web & mobile apps", description: "From the first tap to the final transaction. Fast, intuitive digital experiences your customers love using.", tags: ["Web applications", "iOS & Android"] },
  { number: "03", icon: "⌘", title: "Automation & integration", description: "Connect your tools. Simplify your workflows. Give your team more time for the work that matters.", tags: ["API integrations", "Workflow automation"] },
  { number: "04", icon: "☁", title: "Cloud & ongoing support", description: "A strong foundation for what comes next. Scalable infrastructure and support beyond launch day.", tags: ["Cloud solutions", "Maintenance & support"] },
];

export default function Home() {
  return <><Header /><main id="main">
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> Ideas with ambition. Software with purpose.</div>
        <h1 id="hero-title">Technology<br />that moves<br />your business <span className="accent-word">forward.<svg viewBox="0 0 360 15" aria-hidden="true"><path d="M3 11Q175-5 356 7" /></svg></span></h1>
        <p>We turn complex challenges into simple, powerful software. Built for your business. Designed for what’s next.</p>
        <div className="hero-actions"><a className="button primary" href="#contact">Let’s build something <span aria-hidden="true">↗</span></a><a className="text-link" href="#solutions">Explore our solutions <span aria-hidden="true">↓</span></a></div>
        <div className="hero-note"><span className="mini-symbol" aria-hidden="true">✳</span><span>Innovating Possibilities. Creating Impact</span></div>
      </div>
      <div className="hero-art" role="img" aria-label="Connected software ecosystem with your business at the centre of applications, cloud infrastructure, and automation">
        <div className="art-grid" /><div className="orbit orbit-outer" /><div className="orbit orbit-inner" /><div className="orbit-axis axis-one" /><div className="orbit-axis axis-two" />
        <div className="system-label"><span className="status-dot" /> Your next chapter, connected</div>
        <div className="floating-chip chip-code"><span>⟨/⟩</span><div>Custom built<small>For the way you work</small></div></div>
        <div className="floating-chip chip-cloud"><span>☁</span><div>Cloud ready<small>Room to grow</small></div></div>
        <div className="core"><div className="core-top"><Image className="core-logo" src="/tshabalala-logo.png" alt="" width={1254} height={1254} sizes="(max-width: 760px) 180px, 230px" /></div><div className="core-bottom">Built around you</div></div>
        <div className="floating-chip chip-auto"><span>⌘</span><div>Seamlessly connected<small>Less friction. More possibility.</small></div></div>
        <span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" /><span className="orbit-dot dot-three" /><div className="art-coordinate">Ideas into impact</div><span className="art-plus">+</span>
      </div>
    </section>
    <div className="capability-strip"><div className="shell strip-inner"><span>Built for your next chapter</span><p>Startups <i>✳</i> Growing businesses <i>✳</i> Established enterprises <i>✳</i> Ambitious teams</p></div></div>
    <section id="services" className="section shell"><div className="section-heading"><div><div className="eyebrow">01 / What we do</div><h2>Big-picture thinking.<br /><span className="muted">Precisely built solutions.</span></h2></div><p>From an idea on a whiteboard to the systems that power your everyday. We bring the technology, and the thinking, to get you there.</p></div>
      <div className="service-grid">{services.map(service => <a href="#contact" className="service-card" key={service.number}><div className="card-top"><span className="service-icon" aria-hidden="true">{service.icon}</span><span className="card-number">/{service.number}</span></div><h3>{service.title}</h3><p>{service.description}</p><div className="service-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div><span className="card-arrow" aria-hidden="true">↗</span></a>)}</div>
    </section>
    <section id="solutions" className="section solutions-section"><div className="shell"><div className="section-heading"><div><div className="eyebrow">02 / Made for the real world</div><h2>Less busywork.<br /><span className="muted">More business.</span></h2></div><p>Technology should solve real problems. Explore what a solution built around your business could look like.</p></div><SolutionExplorer /></div></section>
    <section id="about" className="section shell purpose-section" aria-labelledby="purpose-title">
      <div className="section-heading">
        <div>
          <div className="eyebrow">03 / Our purpose</div>
          <h2 id="purpose-title">Innovating Possibilities. Creating Impact</h2>
        </div>
        <p>The mission that drives us. The vision that moves us forward.</p>
      </div>
      <div className="purpose-grid">
        <div className="purpose-logo-panel">
          <Image
            src="/tshabalala-logo.png"
            alt="Tshabalala Innovations — Innovating Possibilities. Creating Impact. Our values: innovation, technology, empowerment, global impact, and integrity."
            width={1254}
            height={1254}
            sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 42vw, 490px"
            className="purpose-logo"
          />
        </div>
        <div className="purpose-statements">
          <article className="purpose-card" aria-labelledby="mission-title">
            <span className="eyebrow">01 / Why we exist</span>
            <h3 id="mission-title">Our Mission</h3>
            <p>At Tshabalala Innovations, our mission is to develop innovative technology solutions that solve real-world challenges, empower people and organizations, and create lasting value through excellence, integrity, and continuous innovation.</p>
          </article>
          <article className="purpose-card" aria-labelledby="vision-title">
            <span className="eyebrow">02 / Where we are going</span>
            <h3 id="vision-title">Our Vision</h3>
            <p>To become a globally recognized technology company that pioneers innovation, transforms industries, and empowers people through intelligent, sustainable, and impactful digital solutions.</p>
          </article>
        </div>
      </div>
    </section>
    <section id="process" className="section shell process-section"><div className="section-heading"><div><div className="eyebrow">04 / How we get there</div><h2>From “what if” to <span className="muted">what’s next.</span></h2></div><p>A clear path. A collaborative process.<br />No unnecessary complexity.</p></div><div className="process-grid">{[{ title: "Discover", text: "We listen, ask questions, and get to the heart of your business challenge." }, { title: "Design", text: "We map the experience and create a practical plan around your priorities." }, { title: "Develop", text: "We build, test, and refine with your feedback at every meaningful step." }, { title: "Deliver & evolve", text: "We launch with care, support your team, and help you grow from there." }].map((item, i) => <div className="process-step" key={item.title}><div className="step-number">0{i + 1}<span aria-hidden="true">↗</span></div><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></section>
    <section id="contact" className="shell contact-section"><div className="contact-copy"><div className="eyebrow"><span className="status-dot" /> Let’s make it happen</div><h2>Your next big idea<br />starts with a<br /><span>conversation.</span></h2><p>Have a challenge to solve or an idea to explore? Tell us what you have in mind and let’s explore how we can help.</p><div className="contact-decoration" aria-hidden="true">↗</div></div><ProjectPlanner /></section>
  </main><footer className="shell"><Brand /><p>Innovating Possibilities. Creating Impact</p><a href="#main" className="back-top">Back to top ↑</a><div className="footer-bottom"><span>© {new Date().getFullYear()} Tshabalala Innovations</span><span>Software with purpose.</span></div></footer></>;
}
