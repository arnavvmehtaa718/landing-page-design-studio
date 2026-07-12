'use client'

import dynamic from 'next/dynamic'
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { studio } from './studio-content'

const SyntheticOrbit = dynamic(() => import('./synthetic-orbit').then((mod) => mod.SyntheticOrbit), { ssr: false })

export function StudioLanding() {
  const root = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const context = gsap.context(() => {
      gsap.from('[data-hero-line]', { yPercent: 115, duration: 1.1, stagger: 0.1, ease: 'power4.out', delay: 0.15 })
      gsap.from('[data-reveal]', { opacity: 0, y: 24, duration: 0.8, stagger: 0.08, ease: 'power3.out', delay: 0.55 })
      gsap.utils.toArray<HTMLElement>('[data-section-title]').forEach((title) => {
        gsap.from(title, { yPercent: 30, opacity: 0, scrollTrigger: { trigger: title, start: 'top 84%' }, duration: 0.9, ease: 'power3.out' })
      })
      gsap.utils.toArray<HTMLElement>('[data-service]').forEach((item) => {
        gsap.from(item, { xPercent: 8, opacity: 0, scrollTrigger: { trigger: item, start: 'top 88%' }, duration: 0.85, ease: 'power3.out' })
      })
      gsap.to('[data-orbit]', { yPercent: 12, ease: 'none', force3D: true, scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.25 } })
      gsap.to('[data-marquee]', { xPercent: -18, ease: 'none', force3D: true, scrollTrigger: { trigger: '#work', start: 'top bottom', end: 'bottom top', scrub: 0.25 } })
    }, root)
    return () => context.revert()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div ref={root} className="site-shell">
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="site-header">
        <a href="#hero" className="wordmark" aria-label={`${studio.name} home`}>AI<span>—</span>FIRST<sup>®</sup></a>
        <p className="header-descriptor">{studio.descriptor}</p>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#services">Services</a><a href="#work">Work</a><a href="#about">About</a>
        </nav>
        <a href={`mailto:${studio.email}`} className="header-cta">Start a project <ArrowUpRight size={16} /></a>
        <button className="menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
      </header>
      <nav id="mobile-menu" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-label="Mobile navigation">
        <a href="#services" onClick={closeMenu}>Services</a><a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href={`mailto:${studio.email}`}>Start a project</a>
      </nav>

      <main id="main">
        <section id="hero" className="hero">
          <div className="hero-meta" data-reveal><span>AI-native since day one</span><span>London / Everywhere</span></div>
          <div className="hero-title" aria-label={studio.hero.title.join(' ')}>
            {studio.hero.title.map((line) => <div className="line-mask" key={line}><h1 data-hero-line>{line}</h1></div>)}
          </div>
          <div data-orbit className="orbit-wrap"><SyntheticOrbit /></div>
          <p className="hero-intro" data-reveal>{studio.hero.intro}</p>
          <a href="#services" className="scroll-cue" data-reveal><span>Explore the studio</span><ArrowDownRight size={20} /></a>
        </section>

        <section id="services" className="services-section section-pad">
          <div className="section-kicker"><span>(What we do)</span><span>01—04</span></div>
          <h2 data-section-title>One senior studio.<br />Zero hand-offs.</h2>
          <div className="service-list">
            {studio.services.map((service) => (
              <article className="service-row" data-service key={service.index}>
                <span className="service-index">({service.index})</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <ul>{service.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                <ArrowUpRight className="service-arrow" aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="work-section">
          <div className="marquee" aria-hidden="true"><p data-marquee>SELECTED WORK — SELECTED WORK — SELECTED WORK —</p></div>
          <div className="project-list">
            {studio.work.map((project) => (
              <a href={`mailto:${studio.email}?subject=${encodeURIComponent(`Case study: ${project.client}`)}`} className={`project-card ${project.tone}`} key={project.number}>
                <div className="project-top"><span>{project.number}</span><span>{project.discipline}</span><ArrowUpRight /></div>
                <div className="project-art" aria-hidden="true"><span>{project.client.slice(0, 1)}</span><i /><i /><i /></div>
                <div className="project-copy"><p>{project.client}</p><h3>{project.title}</h3></div>
              </a>
            ))}
          </div>
        </section>

        <section id="about" className="about-section section-pad">
          <div className="section-kicker"><span>(How we work)</span><span>Better loops, better work</span></div>
          <div className="about-grid">
            <h2 data-section-title>AI changes the speed.<br /><em>Not the standard.</em></h2>
            <p className="about-lead">The tools are new. The principles are not: clarity, craft, curiosity and a stubborn refusal to ship beige ideas.</p>
          </div>
          <div className="process-grid">
            {studio.process.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
          <div className="proof-band"><p>4×</p><span>Faster from<br />idea to evidence</span><p>100%</p><span>Senior talent<br />on every project</span><p>∞</p><span>Possible<br />directions</span></div>
        </section>

        <section className="contact-section">
          <div className="contact-top"><span>(Have a meaningful problem?)</span><span>We should talk.</span></div>
          <a className="contact-link" href={`mailto:${studio.email}`}>Make<br />something<ArrowUpRight aria-hidden="true" /></a>
          <footer><p>AI—FIRST® © 2026</p><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a><p>Built with human intent</p></footer>
        </section>
      </main>
    </div>
  )
}
