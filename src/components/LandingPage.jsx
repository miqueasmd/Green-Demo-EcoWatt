import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Moon, Sun } from "lucide-react";
import React from 'react';
import config from '../config.json';

export default function LandingPage() {
  const [lang, setLang] = useState(config.languages.default);
  const [showLegalNotice, setShowLegalNotice] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

  // Enhanced cursor glow effect
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const move = (e) => setCoords({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  // Dynamic content and colors
  const content = config.content[lang];
  const brand = config.brand;
  const primary = brand.primaryColor;
  const secondary = brand.secondaryColor;

  // Set favicon dynamically
  useEffect(() => {
    const favicon = document.getElementById('dynamic-favicon');
    if (favicon) favicon.href = brand.favicon;
  }, [brand.favicon]);

  // Set CSS variables for colors
  useEffect(() => {
    document.documentElement.style.setProperty('--primary', primary);
    document.documentElement.style.setProperty('--secondary', secondary);
  }, [primary, secondary]);

  return (
    <div className={
      "relative min-h-screen text-white overflow-hidden " +
      (darkTheme
        ? "bg-gradient-to-br from-[var(--secondary)] via-slate-700 to-slate-700"
        : "bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-slate-900")
    }>
      {/* Enhanced cursor glow */}
      <motion.div
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: primary + '33', width: 320, height: 320, filter: 'blur(64px)' }}
        animate={{ x: coords.x, y: coords.y }}
        transition={{ type: "spring", mass: 0.1, stiffness: 100, damping: 20 }}
      />
      <motion.div
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: secondary + '22', width: 160, height: 160, filter: 'blur(32px)' }}
        animate={{ x: coords.x, y: coords.y }}
        transition={{ type: "spring", mass: 0.2, stiffness: 80, damping: 15 }}
      />

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <span className="text-3xl font-bold tracking-wide text-white" style={{textShadow: '0 2px 8px rgba(0,0,0,0.18)'}}>
          {brand.name}
        </span>
        <nav className="flex flex-col gap-2 items-center">
          {config.languages.multilingual && config.languages.available.length > 1 && (
            <div className="flex gap-2 mb-1">
              {config.languages.available.map((lng) => (
                <button
                  key={lng}
                  onClick={() => setLang(lng)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all border ${
                    lang === lng
                      ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow"
                      : "bg-white/10 text-white/80 border-transparent hover:bg-white/20"
                  }`}
                  aria-label={`Switch language to ${lng}`}
                  style={{minWidth: 44}}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>
          )}
          {/* Theme toggle buttons */}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setDarkTheme(true)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all border text-xs flex items-center gap-1 ${
                darkTheme
                  ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-lg"
                  : "bg-white/10 text-white/80 border-transparent hover:bg-white/20 hover:scale-105"
              }`}
              aria-label="Dark theme"
              style={{minWidth: 44}}
            >
              <Moon size={12} />
              Dark
            </button>
            <button
              onClick={() => setDarkTheme(false)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all border text-xs flex items-center gap-1 ${
                !darkTheme
                  ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-lg"
                  : "bg-white/10 text-white/80 border-transparent hover:bg-white/20 hover:scale-105"
              }`}
              aria-label="Light theme"
              style={{minWidth: 44}}
            >
              <Sun size={12} />
              Light
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center text-center gap-8 px-4 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl relative z-10"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-white" style={{textShadow: '0 2px 16px rgba(0,0,0,0.22)'}}>
            {content.tagline}
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-white leading-relaxed" style={{textShadow: '0 2px 8px rgba(0,0,0,0.18)'}}>
            {content.subtitle}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mt-8 relative z-10"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-2xl bg-[var(--primary)] px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-[var(--primary)]/25 transition-all duration-300 hover:scale-105 text-white"
            aria-label={content.cta}
          >
            {content.cta}
          </a>
          <a
            href="#services"
            className="group inline-flex items-center gap-2 rounded-2xl bg-[var(--secondary)] px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-[var(--secondary)]/25 transition-all duration-300 hover:scale-105 text-white"
            aria-label={content.learnMore}
          >
            {content.learnMore}
          </a>
        </motion.div>
      </section>

      {/* Stats Section */}
      {content.stats && (
        <section className="relative z-10 mt-20 px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {content.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white opacity-80">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Services Section */}
      <section id="services" className="relative z-10 mt-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-[var(--primary)] bg-clip-text text-transparent">
            {content.learnMore}
          </h3>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          {content.services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-[var(--primary)]/10 to-[var(--secondary)]/10 backdrop-blur-md rounded-3xl p-8 border border-[var(--primary)]/20 shadow-2xl hover:shadow-[var(--primary)]/20 transition-all duration-500 hover:scale-105"
            >
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-4 text-white">{service.title}</h4>
                <p className="text-slate-300 leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Animated Counters below services */}
        {content.counters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {content.counters.map((counter, idx) => (
              <div key={idx} className="text-center">
                <AnimatedCounter value={counter.value} unit={counter.unit} label={counter.label} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Workflow Section */}
      {Array.isArray(content.workflow) && content.workflow.length > 0 && (
        <section className="relative z-10 max-w-5xl mx-auto my-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-[var(--primary)] bg-clip-text text-transparent">
            {lang === 'es' ? 'Proceso' : 'Workflow'}
          </h2>
          <div className="relative flex flex-col gap-6 md:gap-4">
            {/* Vertical timeline line (desktop only, always behind connectors) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-white/80 z-0 rounded-full" />
            {content.workflow.map((step, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center md:items-center relative z-10">
                {/* Alternating left/right */}
                {idx % 2 === 0 ? (
                  <>
                    {/* Left box */}
                    <div className="w-full md:w-1/2 flex flex-col items-end pr-0 md:pr-8">
                      <div className="flex items-center gap-4 bg-slate-900/60 border border-[var(--primary)]/20 rounded-2xl p-6 shadow-lg max-w-md">
                        <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-xl p-3">
                          <span className="text-xl font-extrabold text-white">{idx + 1}.</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                          </div>
                          <p className="text-slate-300 text-sm">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                    {/* Timeline column (desktop only) */}
                    <div className="hidden md:flex flex-col items-center justify-center w-0 relative z-10">
                      <span className="timeline-connector-left" />
                    </div>
                    <div className="hidden md:block w-1/2" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block w-1/2" />
                    <div className="hidden md:flex flex-col items-center justify-center w-0 relative z-10">
                      <span className="timeline-connector-right" />
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col items-start pl-0 md:pl-8">
                      <div className="flex items-center gap-4 bg-slate-900/60 border border-[var(--primary)]/20 rounded-2xl p-6 shadow-lg max-w-md">
                        <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-xl p-3">
                          <span className="text-xl font-extrabold text-white">{idx + 1}.</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                          </div>
                          <p className="text-slate-300 text-sm">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
            {/* Timeline connector styles */}
            <style jsx>{`
              @media (min-width: 768px) {
                .timeline-connector-left, .timeline-connector-right {
                  position: relative;
                  display: flex;
                  align-items: center;
                  height: 100%;
                  min-height: 0;
                }
                .timeline-connector-left::before {
                  content: '';
                  position: absolute;
                  right: 100%;
                  top: 50%;
                  transform: translateY(-50%);
                  width: 40px;
                  height: 3px;
                  background: white;
                  border-radius: 2px;
                  margin-right: -2px;
                }
                .timeline-connector-left::after {
                  content: '';
                  position: absolute;
                  right: -8px;
                  top: 50%;
                  transform: translateY(-50%);
                  width: 16px;
                  height: 16px;
                  background: white;
                  border: 3px solid #c4b5fd;
                  border-radius: 50%;
                  z-index: 2;
                }
                .timeline-connector-right::before {
                  content: '';
                  position: absolute;
                  left: 100%;
                  top: 50%;
                  transform: translateY(-50%);
                  width: 40px;
                  height: 3px;
                  background: white;
                  border-radius: 2px;
                  margin-left: -2px;
                }
                .timeline-connector-right::after {
                  content: '';
                  position: absolute;
                  left: -8px;
                  top: 50%;
                  transform: translateY(-50%);
                  width: 16px;
                  height: 16px;
                  background: white;
                  border: 3px solid #c4b5fd;
                  border-radius: 50%;
                  z-index: 2;
                }
              }
            `}</style>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="relative z-10 mt-32 mb-24 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent">
            {content.cta}
          </h3>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto" style={{textShadow: '0 2px 8px rgba(0,0,0,0.18)'}}>
            {content.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`mailto:${config.contact.email}`}
              className="group inline-flex items-center gap-2 rounded-2xl bg-[var(--primary)] px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-[var(--primary)]/25 transition-all duration-300 hover:scale-105 text-white"
              aria-label={content.cta}
            >
              Email
            </a>
            {config.contact.whatsapp && (
              <a
                href={`https://wa.me/${config.contact.whatsapp.replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-2xl bg-[var(--secondary)] px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-[var(--secondary)]/25 transition-all duration-300 hover:scale-105 text-white"
                aria-label="Contact via WhatsApp"
              >
                WhatsApp
              </a>
            )}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 border-t border-[var(--primary)]/20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <p className="text-slate-400">
              {content.footer}
            </p>
            <div className="flex gap-6 text-sm">
              <button
                onClick={() => setShowLegalNotice(true)}
                className="text-slate-400 hover:text-[var(--primary)] transition-colors"
              >
                {content.legal_notice || "Legal Notice"}
              </button>
              <button
                onClick={() => setShowPrivacyPolicy(true)}
                className="text-slate-400 hover:text-[var(--primary)] transition-colors"
              >
                {content.privacy_policy || "Privacy Policy"}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Notice Modal */}
      {showLegalNotice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-slate-900/95 backdrop-blur-md border border-[var(--primary)]/20 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-white">{content.legal_notice_title || "Legal Notice"}</h2>
              <button
                onClick={() => setShowLegalNotice(false)}
                className="text-slate-400 hover:text-white transition-colors p-2"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>{content.legal_notice_owner || "Site Owner: [Client Name]"}</p>
              <p>
                {content.legal_notice_email || "Contact Email:"} {config.contact.email}
              </p>
              <p>{content.legal_notice_activity || "Activity: [Describe activity]"}</p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-slate-900/95 backdrop-blur-md border border-[var(--primary)]/20 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-white">{content.privacy_policy_title || "Privacy Policy"}</h2>
              <button
                onClick={() => setShowPrivacyPolicy(false)}
                className="text-slate-400 hover:text-white transition-colors p-2"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>{content.privacy_policy_data || "The data that users send (email or message) is used solely to respond to their inquiry."}</p>
              <p>{content.privacy_policy_storage || "It is not stored in external databases nor shared with third parties."}</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// Animated counter component
function AnimatedCounter({ value, unit, label }) {
  const [displayValue, setDisplayValue] = React.useState(0);
  const intervalRef = React.useRef(null);

  // Only show the first word of the unit (e.g. 'kg' from 'kg CO₂')
  const shortUnit = unit ? unit.split(' ')[0] : '';

  React.useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const target = Number(value);
    setDisplayValue(0);
    if (!target || isNaN(target) || target <= 0) return;
    let current = 0;
    const totalSteps = Math.min(target, 40);
    const step = Math.max(1, Math.round(target / totalSteps));
    const intervalMs = 200;
    intervalRef.current = setInterval(() => {
      current += step;
      if (current >= target) {
        setDisplayValue(target);
        clearInterval(intervalRef.current);
      } else {
        setDisplayValue(current);
      }
    }, intervalMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [value]);

  return (
    <>
      <div className="text-3xl md:text-4xl font-bold text-white mb-2" style={{textShadow: '0 2px 8px rgba(0,0,0,0.18)'}}>
        {displayValue.toLocaleString()} {shortUnit}
      </div>
      <div className="text-lg text-white opacity-80" style={{textShadow: '0 2px 8px rgba(0,0,0,0.18)'}}>
        {label}
      </div>
    </>
  );
} 