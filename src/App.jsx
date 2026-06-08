import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Projects", "Skills", "Contact"];

const SKILLS = [
  { category: "Frontend", items: ["React", "Angular", "TypeScript", "Flutter", "Tailwind CSS"] },
  { category: "Backend", items: ["Spring Boot", "Node.js", "PostgreSQL", "Supabase", "Keycloak", "Kong"] },
  { category: "Languages", items: ["Java", "Python", "JavaScript", "TypeScript", "Dart"] },
  { category: "Tools", items: ["Docker", "Git", "Postman", "Railway", "Vercel"] },
];

const PROJECTS = [
  {
    id: "aeme",
    name: "AEME Platform",
    tagline: "Energy management platform for the Senegalese Ministry of Energy",
    description:
      "Built for the Senegalese Ministry of Energy to manage and track 254 energy managers across 14 regions. Managers can submit reports, earn performance scores, communicate in real-time, and appear on an interactive national map.",
    stack: ["React", "Spring Boot", "PostgreSQL", "Keycloak", "WebSocket", "Leaflet", "Docker"],
    type: "Academic Project — DAUST",
    year: "2025 – 2026",
    highlights: [
      "Real-time chat via WebSocket / STOMP",
      "Interactive national map with Leaflet",
      "Role-based access control with Keycloak",
      "Report submission and performance scoring system",
    ],
    githubFront: "https://github.com/tidianecs/AEME_SN_FRONT",
    githubBack: "https://github.com/tidianecs/AEME_SN_BACK",
  },
  {
    id: "ditify",
    name: "Ditify",
    tagline: "A Flutter music app powered by the Deezer public API",
    description:
      "A mini Spotify-like mobile application built to learn Flutter. Fetches songs, artists, and albums from the Deezer public API. Users can log in, listen to tracks, browse albums, search for artists, and create personal playlists.",
    stack: ["Flutter", "Dart", "Deezer API", "REST"],
    type: "Personal Project",
    year: "2024",
    highlights: [
      "Browse and stream tracks via Deezer public API",
      "Artist, album, and song search",
      "Custom playlist creation with liked songs",
      "Full user authentication flow",
    ],
    github: "https://github.com/tidianecs/Ditify",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-8 transition-all duration-300 ${
      scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1a2e1a]" : "border-b border-transparent"
    }`}>
      <div className="max-w-5xl mx-auto flex items-center justify-between h-16">
        <span className="font-mono text-[#3ecf8e] text-lg font-bold tracking-wide">
          cat.cisse
        </span>

        <div className="hidden md:flex gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="font-mono text-sm text-[#a1a1a1] tracking-widest hover:text-[#3ecf8e] transition-colors duration-200 bg-transparent border-none cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-transparent border-none cursor-pointer text-[#3ecf8e] text-xl font-mono"
        >
          {menuOpen ? "X" : "="}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-[#1a2e1a] px-8 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="font-mono text-sm text-[#a1a1a1] text-left bg-transparent border-none cursor-pointer hover:text-[#3ecf8e] transition-colors"
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const fade = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(30px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section id="about" className="min-h-screen flex items-center px-8 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(62,207,142,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(62,207,142,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(62,207,142,0.07) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        <div style={fade(0.1)}>
          <p className="font-mono text-[#3ecf8e] text-xs tracking-[4px] mb-5">
            AVAILABLE FOR INTERNSHIP
          </p>
        </div>

        <div style={fade(0.25)}>
          <h1 className="font-display font-extrabold text-[#f5f5f5] leading-tight text-5xl md:text-7xl">
            Cheikh Ahmed<br />
            <span className="text-[#3ecf8e]">Tidiane Cisse</span>
          </h1>
        </div>

        <div style={fade(0.4)}>
          <p className="font-mono text-[#a1a1a1] text-sm md:text-base mt-6 max-w-lg leading-8">
            Backend Developer Intern — 3rd year Computer Science student at DAUST, Dakar.
            I build real-world applications with Java, Spring Boot, React and PostgreSQL.
          </p>
        </div>

        <div style={fade(0.55)} className="flex gap-4 mt-10 flex-wrap">
          <a
            href="https://github.com/tidianecs"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs font-bold tracking-widest px-7 py-3 bg-[#3ecf8e] text-[#0a0a0a] rounded hover:bg-[#2eb87d] transition-colors no-underline"
          >
            GitHub
          </a>
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="font-mono text-xs tracking-widest px-7 py-3 bg-transparent text-[#f5f5f5] border border-[#2a2a2a] rounded hover:border-[#3ecf8e] hover:text-[#3ecf8e] transition-colors cursor-pointer"
          >
            View Projects
          </button>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <FadeIn delay={index * 0.15}>
      <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-8 hover:bg-[#0f1f0f] hover:border-[#3ecf8e] transition-all duration-300 h-full flex flex-col">
        <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
          <span className="font-mono text-[#3ecf8e] text-[10px] tracking-[3px]">
            {project.type.toUpperCase()}
          </span>
          <span className="font-mono text-[#555] text-[10px]">{project.year}</span>
        </div>

        <h3 className="font-display font-extrabold text-[#f5f5f5] text-2xl md:text-3xl mb-2">
          {project.name}
        </h3>
        <p className="font-mono text-[#3ecf8e] text-xs mb-4 opacity-80">
          {project.tagline}
        </p>
        <p className="text-[#888] text-sm leading-7 mb-6 flex-grow">
          {project.description}
        </p>

        <div className="mb-6">
          <p className="font-mono text-[#555] text-[10px] tracking-[3px] mb-3">HIGHLIGHTS</p>
          <ul className="space-y-2">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-2 items-start text-[#a1a1a1] text-sm">
                <span className="text-[#3ecf8e] mt-0.5 shrink-0">--</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] text-[#3ecf8e] bg-[#3ecf8e]/10 border border-[#3ecf8e]/20 rounded px-2.5 py-1"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap">
          {project.githubFront && (
            <a
              href={project.githubFront}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs tracking-widest px-5 py-2.5 bg-transparent text-[#f5f5f5] border border-[#2a2a2a] rounded hover:border-[#3ecf8e] hover:text-[#3ecf8e] transition-colors no-underline inline-block text-center"
            >
              GitHub — Front
            </a>
          )}
          {project.githubBack && (
            <a
              href={project.githubBack}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs tracking-widest px-5 py-2.5 bg-transparent text-[#f5f5f5] border border-[#2a2a2a] rounded hover:border-[#3ecf8e] hover:text-[#3ecf8e] transition-colors no-underline inline-block text-center"
            >
              GitHub — Back
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs tracking-widest px-5 py-2.5 bg-transparent text-[#f5f5f5] border border-[#2a2a2a] rounded hover:border-[#3ecf8e] hover:text-[#3ecf8e] transition-colors no-underline inline-block text-center"
            >
              View on GitHub
            </a>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 px-8">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="font-mono text-[#3ecf8e] text-[10px] tracking-[4px] mb-3">SELECTED WORK</p>
          <h2 className="font-display font-extrabold text-[#f5f5f5] text-4xl md:text-6xl mb-12">
            Projects
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 px-8 border-t border-[#141414]">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="font-mono text-[#3ecf8e] text-[10px] tracking-[4px] mb-3">TECH STACK</p>
          <h2 className="font-display font-extrabold text-[#f5f5f5] text-4xl md:text-6xl mb-12">
            Skills
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS.map((group, i) => (
            <FadeIn key={group.category} delay={i * 0.1}>
              <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-6">
                <p className="font-mono text-[#3ecf8e] text-[10px] tracking-[3px] mb-5">
                  {group.category.toUpperCase()}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-xs text-[#c5c5c5] bg-[#141414] border border-[#222] rounded px-3 py-1.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 px-8 border-t border-[#141414]">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <p className="font-mono text-[#3ecf8e] text-[10px] tracking-[4px] mb-3">GET IN TOUCH</p>
          <h2 className="font-display font-extrabold text-[#f5f5f5] text-4xl md:text-6xl mb-4">
            Contact
          </h2>
          <p className="text-[#888] text-sm leading-7 max-w-md mb-10">
            Open to backend developer internships — locally in Senegal or remotely internationally.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="mailto:tidianecs20@gmail.com"
              className="font-mono text-xs font-bold tracking-widest px-7 py-3 bg-[#3ecf8e] text-[#0a0a0a] rounded hover:bg-[#2eb87d] transition-colors no-underline"
            >
              tidianecs20@gmail.com
            </a>
            <a
              href="https://github.com/tidianecs"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs tracking-widest px-7 py-3 bg-transparent text-[#f5f5f5] border border-[#2a2a2a] rounded hover:border-[#3ecf8e] hover:text-[#3ecf8e] transition-colors no-underline"
            >
              GitHub
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#141414] py-8 text-center">
      <p className="font-mono text-[#444] text-xs">
        Cheikh Ahmed Tidiane Cisse — Dakar, Senegal — {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-[#f5f5f5]">
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}