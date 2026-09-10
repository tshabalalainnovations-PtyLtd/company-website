"use client";
import { useRef, useState, type FormEvent } from "react";
import { Brand } from "./brand";
import { emailConfigured, sendEnquiry } from "./emailjs";

export function Header() {
  const [open, setOpen] = useState(false);
  return <><a href="#main" className="skip-link">Skip to content</a><header className="site-header shell"><Brand preload /><button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="navigation">{open ? "Close ×" : "Menu +"}</button><nav id="navigation" aria-label="Main navigation" className={open ? "navigation is-open" : "navigation"}>{[["Services", "services"], ["Solutions", "solutions"], ["About us", "about"], ["Our process", "process"]].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}<a className="button nav-cta" href="#contact" onClick={() => setOpen(false)}>Let’s talk <span aria-hidden="true">↗</span></a></nav></header></>;
}
const solutions = [
  { label: "Business operations", tag: "Connected business systems", title: "Everything in sync.\nEveryone moving forward.", description: "Bring projects, people, and reporting into one place. Replace disconnected spreadsheets with a clear view of your business.", features: ["Centralised dashboards & reporting", "Custom workflows & approvals", "Connected teams & departments"], app: "Operations overview", metric: "Project progress", value: "84%", rows: ["Website rollout", "Customer onboarding", "Quarterly reporting"], statuses: ["In progress", "Complete", "In review"] },
  { label: "Customer experiences", tag: "Meaningful digital experiences", title: "Make every interaction\nfeel effortless.", description: "Give your customers a simpler way to browse, book, and do business with you through a beautifully connected digital experience.", features: ["Customer portals & self-service", "Online booking & e-commerce", "Responsive web & mobile experiences"], app: "Customer overview", metric: "Onboarding progress", value: "92%", rows: ["Account setup", "Welcome journey", "Customer feedback"], statuses: ["Complete", "In progress", "In review"] },
  { label: "Smarter workflows", tag: "Less manual. More meaningful.", title: "Put repetitive work\non autopilot.", description: "Connect the tools you already use and automate the steps in between. Reduce duplicate work and keep information flowing.", features: ["Automated document processing", "System integrations & data sync", "Notifications & approval routing"], app: "Workflow overview", metric: "Workflow completion", value: "76%", rows: ["Invoice processing", "Inventory sync", "Approval routing"], statuses: ["In review", "Complete", "In progress"] },
];
export function SolutionExplorer() {
  const [selected, setSelected] = useState(0);
  const item = solutions[selected];
  return <><div className="solution-tabs" role="tablist" aria-label="Solution categories">{solutions.map((solution, index) => <button key={solution.label} id={`solution-tab-${index}`} role="tab" aria-selected={selected === index} aria-controls="solution-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => { const next = event.key === "ArrowRight" ? (index + 1) % 3 : event.key === "ArrowLeft" ? (index + 2) % 3 : event.key === "Home" ? 0 : event.key === "End" ? 2 : null; if (next !== null) { event.preventDefault(); setSelected(next); document.getElementById(`solution-tab-${next}`)?.focus(); } }}>{solution.label}<span aria-hidden="true">↗</span></button>)}</div><div className="solution-panel" id="solution-panel" role="tabpanel" aria-labelledby={`solution-tab-${selected}`} tabIndex={0}><div className="solution-copy"><span className="eyebrow">{item.tag}</span><h3>{item.title}</h3><p>{item.description}</p><ul>{item.features.map(feature => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul><a href="#contact" className="text-link">Build your solution <span aria-hidden="true">↗</span></a></div><div className="preview-stage"><div className="dashboard"><div className="dashboard-top"><span className="dashboard-logo">ti<span> / workspace</span></span><span className="avatar">JD</span></div><div className="dashboard-body"><div className="dashboard-heading"><div><small>Your business, at a glance</small><h4>{item.app}</h4></div><span>↗</span></div><div className="dashboard-metrics"><div><small>{item.metric}</small><strong>{item.value}</strong><span className="metric-note">↗ Moving forward</span></div><div className="bar-chart" aria-hidden="true">{[30, 48, 38, 62, 50, 72, 64, 87, 78, 98].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></div><div className="dashboard-table"><div className="table-heading"><span>Active workstreams</span><span>Status</span></div>{item.rows.map((row, i) => <div key={row}><span><i />{row}</span><span className={`table-status status-${i}`}>{item.statuses[i]}</span></div>)}</div></div></div><div className="preview-caption"><span className="status-dot" /> A glimpse of what’s possible <span>Illustrative concept</span></div></div></div></>;
}
export function ProjectPlanner() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const sending = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    sending.current = true;
    setStatus("sending");
    setError("");
    try {
      await sendEnquiry(data);
      form.reset();
      setStatus("success");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Your enquiry could not be sent. Please try again later.");
      setStatus("error");
    } finally {
      sending.current = false;
    }
  }

  return (
    <form className="project-form" onSubmit={handleSubmit} aria-busy={status === "sending"}>
      <h3>Tell us what you have in mind.</h3>
      <fieldset disabled={status === "sending"}>
        <div className="form-row">
          <label>Your name<input required name="name" autoComplete="name" placeholder="Full name" maxLength={120} /></label>
          <label>Work email<input required type="email" name="email" autoComplete="email" placeholder="you@company.com" maxLength={200} /></label>
        </div>
        <label>Company <span className="optional">(optional)</span><input name="company" autoComplete="organization" placeholder="Your company name" maxLength={150} /></label>
        <label>What can we help with?
          <select name="service" defaultValue="" required>
            <option value="" disabled>Select a service</option>
            <option>Custom software</option><option>Web &amp; mobile apps</option>
            <option>Automation &amp; integration</option><option>Cloud &amp; ongoing support</option>
            <option>I’m still exploring</option>
          </select>
        </label>
        <label>A little about your project<textarea required name="message" placeholder="What would you like to build or improve?" rows={3} maxLength={5000} /></label>
        <button className="button primary" type="submit" disabled={!emailConfigured || status === "sending"} aria-describedby="enquiry-status">
          {status === "sending" ? "Sending your enquiry…" : "Send enquiry"}
          <span aria-hidden="true">{status === "sending" ? "…" : "↗"}</span>
        </button>
      </fieldset>
      <p id="enquiry-status" className={"form-note enquiry-status " + status} role="status" aria-live="polite" aria-atomic="true">
        {status === "success" ? "Thank you! Your enquiry has been sent. We’ll reply using the email address you provided."
          : status === "error" ? error
          : status === "sending" ? "Please wait while we send your message."
          : !emailConfigured ? "Online enquiries will be available soon. Please check back shortly."
          : "Your details will be sent securely via EmailJS so we can respond to your enquiry."}
      </p>
    </form>
  );
}
