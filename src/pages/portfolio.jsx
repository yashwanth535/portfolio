import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaExternalLinkAlt, FaGithub, FaCloud } from "react-icons/fa";
// import profilePhoto from "../assets/profile.webp";
import profilePhoto from "../assets/neon_profile.webp";

const Portfolio = () => {
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const [aboutVisible, setAboutVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectFilter, setProjectFilter] = useState("major"); // "major" | "minor"

  const majorProjects = [
    {
      name: "CastPlayer (Ongoing)",
      description:
        "A local media player and web-based casting system for streaming and controlling videos across devices.",
      link: "https://castplayer.yashwanth.online",
      githubRepo: "https://github.com/your-username/CastPlayer",
      type: "major",
      stack: [
        "Kotlin",
        "Android",
        "Jetpack Compose",
        "LibVLC",
        "React",
        "WebSocket",
      ],
      body: `CastPlayer is a cross-device media playback project designed to provide a flexible alternative to traditional casting solutions. The Android application acts as the media source and playback controller, using LibVLC for local video playback and supporting a wide range of media formats and codecs.

The project is being developed to enable videos stored on a mobile device to be streamed to a laptop or other devices through a web-based player. The Android application can start a local streaming server, while the receiving device uses a custom React-based web interface for playback and remote controls. WebSocket communication is used for real-time playback control and synchronization between devices.

The project combines Android development, media processing, HTTP streaming, WebSocket communication, and modern web technologies to create a seamless local media casting experience.`,
    },
    {
      name: "PrintEase",
      description:
        "A website to share PDFs with printing shops for streamlined printing.",
      link: "https://printease.yashwanth.online/",
      vercellink: "https://print-ease-frontend.vercel.app/",
      frontendRepo: "https://github.com/yashwanth535/PrintEase-frontend",
      backendRepo: "https://github.com/yashwanth535/PrintEase-backend",
      type: "major",
      stack: ["React", "Express", "Stripe", "Socket.io"],
      body: `PrintEase is a full-stack MERN application that connects users with local print service vendors. On the frontend we used React with Tailwind and Vite, providing a smooth file-upload interface that uses Supabase-signed URLs for secure PDF transfer. Vendors manage incoming orders in real time within an Express dashboard, and we integrated Firebase Storage for storing and serving PDF documents.

On the backend, we built RESTful APIs in Express.js with JWT authentication for Customers and Vendors, a 50% advance payment flow secured via Stripe, and Socket.io-powered WebSockets to push live order status updates (accepted, printing, out for delivery). We also automated PDF cleanup once jobs complete, and provided PDF preview links in both user and vendor dashboards.`,
    },
    {
      name: "InShareX",
      description: "A fast and secure file sharing platform for all your needs.",
      link: "https://insharex.yashwanth.online/",
      vercellink: "https://insharex-frontend.vercel.app/",
      frontendRepo: "https://github.com/yashwanth535/InShareX-frontend",
      backendRepo: "https://github.com/yashwanth535/InShareX-backend",
      type: "major",
      stack: ["React", "WebRTC", "Socket.io"],
      body: `InShareX is a peer-to-peer file sharing service built with React, WebRTC, and WebSockets. The frontend implements chunked file transfer using the browser's WebRTC data channels for direct browser-to-browser transfers, and falls back to a secure Express-based relay server when peers cannot connect directly. A chat overlay lets users communicate during transfers, and transfer progress is tracked with live updates.

On the backend, we use Node.js + Express to handle signaling via Socket.io and manage one-time download URLs. File metadata and user permissions are stored in MongoDB. We added transfer resume support and optional encryption for file chunks, ensuring high speed and security without requiring users to register or install an app.`,
    },
    {
      name: "Flavour Fusion",
      description:
        "Discover and share unique recipes with a vibrant food community.",
      link: "https://fusion.yashwanth.online",
      vercellink: "https://fusion-frontend-omega.vercel.app/",
      frontendRepo: "https://github.com/yashwanth535/Fusion-frontend",
      backendRepo: "https://github.com/yashwanth535/Fusion-backend",
      type: "minor",
      stack: ["React", "Express", "MongoDB"],
      body: `Flavour Fusion is a social cooking platform built on the MERN stack with Tailwind CSS for styling. Users can create accounts, post recipes with images, tag ingredients, and browse a personalized feed powered by keyword-based searches. The frontend uses React Context for global state and React Router for client-side navigation.

The backend features RESTful APIs in Express with JWT-based authentication and role-based access control. We implemented file uploads via Multer for recipe images, real-time notifications for comments using Socket.io, and full-text search indexing in MongoDB for efficient recipe discovery.`,
    },
    {
      name: "MoneyMind",
      description:
        "A website to track your finances, create budgets, savings, etc.",
      link: "https://moneymind.yashwanth.online/",
      vercellink: "https://moneymind-frontend.vercel.app/",
      frontendRepo: "https://github.com/yashwanth535/MoneyMind-frontend",
      backendRepo: "https://github.com/yashwanth535/MoneyMind-backend",
      type: "minor",
      stack: ["React", "Express", "Tesseract.js"],
      body: `MoneyMind is a personal finance dashboard developed with React (Vite) on the frontend and Express + MongoDB on the backend. It provides expense tracking, budget setup, and savings goals visualization. We integrated Tesseract.js for OCR scanning of receipts so users can snap a photo and automatically log transactions.

The backend offers REST endpoints secured with JWT authentication, and data analytics endpoints that calculate monthly spend breakdowns. We added CSV export and PDF report generation, as well as integration with Chart.js for interactive spending charts.`,
    },
    {
      name: "Kriya",
      description: "Monitor the uptime and response time of your favorite URLs.",
      link: "https://kriya.yashwanth.online",
      vercellink: "https://kriya-frontend-ten.vercel.app/",
      frontendRepo: "https://github.com/yashwanth535/Kriya-frontend",
      backendRepo: "https://github.com/yashwanth535/Kriya-backend",
      type: "minor",
      stack: ["Node.js", "node-cron", "Socket.io"],
      body: `Kriya is a Node.js + Express monitoring tool with a React frontend built on Vite. It allows users to register URLs they want tracked, and runs scheduled health checks using node-cron on the backend to ping these endpoints at configurable intervals. We stored uptime/response metrics in MongoDB and expose them via REST APIs, which power a dynamic dashboard showing historical graphs.

To deliver near real-time alerts, Kriya uses Socket.io for WebSocket notifications: when an endpoint goes down or exceeds a response threshold, users immediately see toast alerts on the frontend and can opt into email notifications.`,
    },
    {
      name: "SkyWatch",
      description: "A weather monitoring and alert system for your local area.",
      link: "https://skywatch.yashwanth.online/",
      vercellink: "https://skywatch.vercel.app/",
      frontendRepo: "https://github.com/yashwanth535/SkyWatch",
      type: "minor",
      stack: ["React", "OpenWeatherMap API"],
      body: `SkyWatch is a React app that consumes OpenWeatherMap's public APIs to display current conditions, hourly forecasts, and 7-day outlooks. We implemented geolocation detection and allow users to save multiple locations. The UI leverages Tailwind CSS for a clean responsive design and Chart.js for rainfall and temperature graphs.

For alerts, SkyWatch uses browser push notifications: when temperature or precipitation exceed user-defined thresholds, a service worker sends real-time alerts.`,
    },
    {
      name: "Dispensary Management System",
      description:
        "Streamlines patient records, medicine inventory, and appointment tracking for efficient dispensary operations.",
      link: "https://dispensarymanagement.yashwanth.online/",
      cloudflarelink: "https://patient-prescription.pages.dev/",
      frontendRepo: "https://github.com/yashwanth535/patient-prescription",
      type: "minor",
      stack: ["React", "Redux Toolkit", "Express"],
      body: `The Dispensary Management System is a MERN-stack application designed for pharmacies to manage patient profiles, prescription histories, and medication stock. The React frontend provides form-based data entry for new prescriptions and real-time inventory levels. We used Redux Toolkit for state management and React Query for server-state syncing.

On the backend, Node.js and Express serve RESTful APIs with JWT authentication for pharmacists and staff roles. MongoDB stores patient and prescription data, and we built endpoints for appointment scheduling and automated low-stock alerts.`,
    },
  ];

  const experience = [
    {
      company: "Cognizant",
      role: "Programmer Analyst",
      duration: "February 2026 – June 2026",
      type: "Intern",
      description:
        "Worked on SAP application testing, performing both manual and automation testing using Tricentis Tosca to validate application functionality and ensure software quality.",
      skills: ["SAP", "Tricentis Tosca", "Automation Testing", "Manual Testing"],
    },
  ];

  const filteredProjects = majorProjects.filter((p) => p.type === projectFilter);

  useEffect(() => {
    const particleCount = window.innerWidth < 640 ? 20 : 40;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 1.2,
      speedY: (Math.random() - 0.5) * 1.2,
      opacity: Math.random() * 0.4 + 0.15,
    }));
    setParticles(newParticles);

    let animationId;
    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((p) => {
          let newX = p.x + p.speedX;
          let newY = p.y + p.speedY;
          if (newX < 0 || newX > window.innerWidth) p.speedX *= -1;
          if (newY < 0 || newY > window.innerHeight) p.speedY *= -1;
          return { ...p, x: newX, y: newY };
        })
      );
      animationId = requestAnimationFrame(animateParticles);
    };
    animationId = requestAnimationFrame(animateParticles);
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "about") setAboutVisible(true);
            if (entry.target.id === "skills") setSkillsVisible(true);
            if (entry.target.id === "projects") setProjectsVisible(true);
            if (entry.target.id === "contact") setContactVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (skillsRef.current) observer.observe(skillsRef.current);
    if (projectsRef.current) observer.observe(projectsRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => observer.disconnect();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = window.innerWidth < 640 ? 64 : 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const navigate = useNavigate();

  const navItems = [
    { text: "about", id: "about" },
    { text: "skills", id: "skills", hideOnMobile: true },
    { text: "experience", id: "experience" },
    { text: "projects", id: "projects" },
    { text: "contact", id: "contact" },
  ];

  return (
    <>
      {/* Load dev-style fonts. Move this <link> into index.html for production. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        .font-code { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .font-body { font-family: 'Inter', system-ui, sans-serif; }
        ::selection { background: #3ea6ff55; color: #eaf4ff; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="min-h-screen flex flex-col bg-[#05070c] font-body relative overflow-hidden">
        {/* Ambient grid + particles */}
        <div
          className="fixed inset-0 z-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(#3ea6ff11 1px, transparent 1px), linear-gradient(90deg, #3ea6ff11 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="fixed inset-0 z-0 pointer-events-none">
          {particles.map((p) => (
            <div
              key={p.id}
              style={{
                left: `${p.x}px`,
                top: `${p.y}px`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: "#4dabf7",
                opacity: p.opacity,
                position: "fixed",
                borderRadius: "50%",
                boxShadow: "0 0 6px #4dabf7",
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          {/* NAV — single row on every breakpoint; "skills" link hides on mobile
              since the skills section is one scroll away from about anyway. */}
          <header className="fixed top-0 w-full z-50 bg-[#05070c]/80 backdrop-blur-md border-b border-[#1a2233] select-none">
            <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-[72px] flex items-center justify-between gap-2">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-code text-sm sm:text-xl md:text-2xl font-bold text-[#eaf4ff] whitespace-nowrap shrink-0"
              >
                <span className="text-[#3ea6ff]">~/</span>yashwanth535
                <span className="text-[#3ea6ff] animate-pulse">_</span>
              </motion.h1>

              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex flex-nowrap items-center gap-0.5 sm:gap-1 font-code text-[11px] sm:text-sm overflow-x-auto no-scrollbar"
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-1.5 sm:px-3 py-1.5 rounded text-[#8fa3bf] hover:text-[#3ea6ff] hover:bg-[#3ea6ff0f] transition-colors duration-200 whitespace-nowrap ${
                      item.hideOnMobile ? "hidden sm:inline-block" : ""
                    }`}
                  >
                    <span className="text-[#3ea6ff]/60">&lt;</span>
                    {item.text}
                    <span className="text-[#3ea6ff]/60">/&gt;</span>
                  </button>
                ))}
              </motion.nav>
            </div>
          </header>

          <main className="flex-grow p-4 sm:p-5 md:p-10 max-w-6xl mx-auto w-full mt-[72px] sm:mt-[88px] z-10">
            {/* ABOUT */}
            <motion.section
              id="about"
              ref={aboutRef}
              initial="hidden"
              animate={aboutVisible ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="rounded-xl mb-8 sm:mb-10 border border-[#1a2233] bg-[#0a0e17] overflow-hidden shadow-[0_0_40px_-15px_#3ea6ff33]"
            >
              <SectionChrome label="about.jsx" />
              <div className="p-5 sm:p-6 md:p-8 flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={aboutVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="w-full lg:w-1/3 flex flex-col items-center text-center"
                >
                  <div className="w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-[#3ea6ff] shadow-[0_0_40px_-8px_#3ea6ff88]">
                    <img
                      src={profilePhoto}
                      alt="Yashwanth Munikuntla"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <p className="font-code text-xs text-[#3ea6ff] mt-4">
                    &gt; whoami
                  </p>
                  <p className="font-code text-base sm:text-lg font-semibold text-[#eaf4ff] mt-1">
                    Yashwanth Munikuntla
                  </p>
                </motion.div>

                <div className="w-full lg:w-2/3">
                  <motion.p
                    initial={{ opacity: 0, x: 15 }}
                    animate={aboutVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 15 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-[#b9c6d9] leading-relaxed text-sm sm:text-base"
                  >
                    Hello! I'm a full-stack developer who loves building
                    user-friendly applications and creative solutions. My goal
                    is to combine design thinking and development skills to
                    create impactful digital experiences.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, x: 15 }}
                    animate={aboutVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 15 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                    className="mt-6 space-y-3 font-code text-xs sm:text-sm"
                  >
                    {[
                      "Full-stack development with modern technologies",
                      "UI/UX design and user experience optimization",
                      "Problem-solving and creative thinking",
                    ].map((line, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[#3ea6ff]">$</span>
                        <span className="text-[#b9c6d9]">{line}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* SKILLS */}
            <motion.section
              id="skills"
              ref={skillsRef}
              initial="hidden"
              animate={skillsVisible ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="rounded-xl mb-8 sm:mb-10 border border-[#1a2233] bg-[#0a0e17] overflow-hidden shadow-[0_0_40px_-15px_#3ea6ff33]"
            >
              <SectionChrome label="skills.json" />
              <div className="p-5 sm:p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                  {[
                    {
                      name: "Programming Languages",
                      skills: ["Java", "Python", "C#"],
                    },
                    {
                      name: "Web Development",
                      skills: ["React", "Express.js", "MongoDB", "Tailwind CSS"],
                    },
                    {
                      name: "Mobile Development",
                      skills: ["React Native", "Kotlin", "Jetpack Compose", "Android"],
                    },
                    {
                      name: "DevOps & Tools",
                      skills: ["Docker", "Git", "GitHub", "CI/CD"],
                    },
                    {
                      name: "Cloud & Infrastructure",
                      skills: ["Google Cloud", "Supabase", "Linux"],
                    },
                  ].map((category, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ borderColor: "#3ea6ff", y: -2 }}
                      className="rounded-lg border border-[#1a2233] bg-[#0d1220] p-4 sm:p-5 transition-colors duration-200"
                    >
                      <p className="font-code text-xs text-[#3ea6ff] mb-3">
                        // {category.name.toLowerCase()}
                      </p>
                      <ul className="space-y-2">
                        {category.skills.map((skill, idx) => (
                          <li key={idx} className="font-code text-sm text-[#dbe6f2] flex items-center">
                            <span className="text-[#3ea6ff] mr-2">›</span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* EXPERIENCE */}
            <motion.section
              id="experience"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl mb-8 sm:mb-10 border border-[#1a2233] bg-[#0a0e17] overflow-hidden shadow-[0_0_40px_-15px_#3ea6ff33]"
            >
              <SectionChrome label="experience.log" />
              <div className="p-5 sm:p-6 md:p-8 space-y-5">
                {experience.map((job, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ borderColor: "#3ea6ff", y: -2 }}
                    className="rounded-lg border border-[#1a2233] bg-[#0d1220] p-4 sm:p-5 transition-colors duration-200"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="font-code text-base sm:text-lg font-semibold text-[#eaf4ff]">
                        {job.role}
                        <span className="text-[#3ea6ff]"> @ </span>
                        {job.company}
                      </h3>
                      <span className="font-code text-[11px] px-2 py-0.5 rounded-full border border-[#3ea6ff77] text-[#3ea6ff] bg-[#3ea6ff14]">
                        {job.type}
                      </span>
                    </div>

                    <p className="font-code text-xs text-[#5c6b83] mb-3">{job.duration}</p>

                    <p className="text-sm text-[#b9c6d9] leading-relaxed mb-4">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {job.skills?.map((s) => (
                        <span
                          key={s}
                          className="font-code text-[11px] px-2 py-0.5 rounded border border-[#3ea6ff33] text-[#3ea6ff] bg-[#3ea6ff0d]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* PROJECTS */}
            <motion.section
              id="projects"
              ref={projectsRef}
              initial="hidden"
              animate={projectsVisible ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="rounded-xl mb-8 sm:mb-10 border border-[#1a2233] bg-[#0a0e17] overflow-hidden shadow-[0_0_40px_-15px_#3ea6ff33]"
            >
              <SectionChrome label="projects.map()" />
              <div className="p-5 sm:p-6 md:p-8">
                {/* Major / Minor toggle */}
                <div className="flex justify-center mb-6 sm:mb-8">
                  <div className="inline-flex rounded-full border border-[#1a2233] bg-[#0d1220] p-1 font-code text-sm">
                    {["major", "minor"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setProjectFilter(type)}
                        className={`relative px-4 sm:px-5 py-2 rounded-full transition-colors duration-200 ${
                          projectFilter === type ? "text-[#05070c]" : "text-[#8fa3bf] hover:text-[#dbe6f2]"
                        }`}
                      >
                        {projectFilter === type && (
                          <motion.span
                            layoutId="projectTogglePill"
                            className="absolute inset-0 rounded-full bg-[#3ea6ff]"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10 capitalize">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={projectFilter}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
                  >
                    {filteredProjects.map((project) => (
                      <motion.div
                        key={project.name}
                        whileHover={{ y: -4, borderColor: "#3ea6ff" }}
                        onClick={() => setSelectedProject(project)}
                        className="cursor-pointer rounded-lg border border-[#1a2233] bg-[#0d1220] p-4 sm:p-5 flex flex-col transition-colors duration-200 hover:shadow-[0_0_25px_-8px_#3ea6ff88]"
                      >
                        <h3 className="font-code text-base sm:text-lg font-semibold text-[#eaf4ff] mb-2">
                          {project.name}
                        </h3>
                        <p className="text-sm text-[#8fa3bf] leading-relaxed mb-4 flex-grow">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.stack?.map((s) => (
                            <span
                              key={s}
                              className="font-code text-[11px] px-2 py-0.5 rounded border border-[#3ea6ff33] text-[#3ea6ff] bg-[#3ea6ff0d]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3 pt-3 border-t border-[#1a2233]">
                          {project.link && (
                            <FaExternalLinkAlt className="text-[#8fa3bf] hover:text-[#3ea6ff] text-sm transition-colors" />
                          )}
                          {project.frontendRepo && (
                            <FaGithub className="text-[#8fa3bf] hover:text-[#3ea6ff] text-sm transition-colors" />
                          )}
                          {project.githubRepo && (
                            <FaGithub className="text-[#8fa3bf] hover:text-[#3ea6ff] text-sm transition-colors" />
                          )}
                          {(project.vercellink || project.cloudflarelink) && (
                            <FaCloud className="text-[#8fa3bf] hover:text-[#3ea6ff] text-sm transition-colors" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.section>

            {/* CONTACT */}
            <motion.section
              id="contact"
              ref={contactRef}
              initial="hidden"
              animate={contactVisible ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="rounded-xl mb-8 sm:mb-10 border border-[#1a2233] bg-[#0a0e17] overflow-hidden shadow-[0_0_40px_-15px_#3ea6ff33]"
            >
              <SectionChrome label="contact.sh" />
              <div className="p-5 sm:p-6 md:p-8 space-y-3 font-code text-sm">
                {[
                  { label: "email", link: "mailto:yashwanthmunikuntla@gmail.com", text: "yashwanthmunikuntla@gmail.com" },
                  { label: "linkedin", link: "https://www.linkedin.com/in/yashwanth-munikuntla-370666281", text: "yashwanth-munikuntla" },
                  { label: "github", link: "https://github.com/yashwanth535", text: "yashwanth535" },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-wrap items-center gap-2 sm:gap-3 group"
                  >
                    <span className="text-[#3ea6ff]">$</span>
                    <span className="text-[#8fa3bf]">{item.label} --open</span>
                    <span className="text-[#dbe6f2] group-hover:text-[#3ea6ff] transition-colors break-all">
                      {item.text}
                    </span>
                  </a>
                ))}
              </div>
            </motion.section>
          </main>

          <footer className="text-center py-6 border-t border-[#1a2233] font-code text-xs text-[#5c6b83]">
            © 2025 Yashwanth Munikuntla
          </footer>
        </div>

        {/* PROJECT MODAL */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
              onClick={() => setSelectedProject(null)}
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border border-[#1a2233] bg-[#0a0e17] shadow-[0_0_60px_-15px_#3ea6ff55]"
                onClick={(e) => e.stopPropagation()}
              >
                <SectionChrome label={`${selectedProject.name.toLowerCase().replace(/\s+/g, "-")}.jsx`} />

                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-3 right-4 text-[#8fa3bf] hover:text-[#3ea6ff] font-code text-lg transition-colors z-10"
                >
                  ✕
                </button>

                <div className="p-5 sm:p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h2 className="font-code text-xl sm:text-2xl font-bold text-[#eaf4ff]">
                      {selectedProject.name}
                    </h2>
                    <span
                      className={`font-code text-[11px] px-2 py-0.5 rounded-full border ${
                        selectedProject.type === "major"
                          ? "border-[#3ea6ff77] text-[#3ea6ff] bg-[#3ea6ff14]"
                          : "border-[#5c6b8377] text-[#8fa3bf] bg-[#5c6b8314]"
                      }`}
                    >
                      {selectedProject.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 my-4">
                    {selectedProject.stack?.map((s) => (
                      <span
                        key={s}
                        className="font-code text-[11px] px-2 py-0.5 rounded border border-[#3ea6ff33] text-[#3ea6ff] bg-[#3ea6ff0d]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 mb-6 font-code text-sm">
                    {selectedProject.link && (
                      <ModalLink href={selectedProject.link} icon={<FaExternalLinkAlt />} text="live demo" />
                    )}
                    {selectedProject.vercellink && (
                      <ModalLink href={selectedProject.vercellink} icon={<FaCloud />} text="vercel" />
                    )}
                    {selectedProject.cloudflarelink && (
                      <ModalLink href={selectedProject.cloudflarelink} icon={<FaCloud />} text="cloudflare" />
                    )}
                    {selectedProject.frontendRepo && (
                      <ModalLink href={selectedProject.frontendRepo} icon={<FaGithub />} text="frontend" />
                    )}
                    {selectedProject.backendRepo && (
                      <ModalLink href={selectedProject.backendRepo} icon={<FaGithub />} text="backend" />
                    )}
                    {selectedProject.githubRepo && (
                      <ModalLink href={selectedProject.githubRepo} icon={<FaGithub />} text="github" />
                    )}
                  </div>

                  <div className="rounded-lg border border-[#1a2233] bg-[#0d1220] p-4 sm:p-5">
                    <p className="text-[#b9c6d9] leading-relaxed whitespace-pre-line text-sm">
                      {selectedProject.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// Small "editor tab" chrome shown at the top of each section — reinforces the dev/IDE feel.
const SectionChrome = ({ label }) => (
  <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1a2233] bg-[#0d1220]">
    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
    <span className="font-code text-xs text-[#5c6b83] ml-2 truncate">{label}</span>
  </div>
);

const ModalLink = ({ href, icon, text }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1a2233] text-[#8fa3bf] hover:text-[#3ea6ff] hover:border-[#3ea6ff] transition-colors duration-200"
  >
    {icon} {text}
  </a>
);

export default Portfolio;