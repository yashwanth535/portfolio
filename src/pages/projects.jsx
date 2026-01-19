import React from "react";
import { motion } from "framer-motion";

const projects = [
  // TeamSync
  {
    name: "TeamSync",
    description: "A real-time team collaboration platform for seamless project management.",
    image: "/teamsync.png",
    frontendRepo: "https://github.com/yashwanth535/teamsync-frontend",
    backendRepo: "https://github.com/yashwanth535/teamsync-backend",
    type: "major",
    hidden: true
  },
  // PrintEase (keep data, do not show)
  {
    name: "PrintEase",
    description: "A website to share PDFs with printing shops for streamlined printing.",
    image: "/printease.png",
    link: "https://printease.yashwanth.online/",
    type: "major",
    hidden: true
  },
  // Smartfeast
  {
    name: "Smartfeast",
    description: "A QR menu scanner and ordering system for restaurants to provide contactless dining experiences.",
    image: "/smartfeast.png",
    link: "https://smartfeast.yashwanth.online",
    vercellink: "https://smartfeast-frontend.vercel.app/",
    frontendRepo: "https://github.com/smartfeastt/Smartfeast-frontend",
    backendRepo: "https://github.com/smartfeastt/Smartfeast-backend",
    type: "major",
    hidden: true
  },
  // Flavour Fusion (show, update link and image)
  {
    name: "Flavour Fusion",
    description: "Discover and share unique recipes with a vibrant food community.",
    image: "/fusion.png",
    link: "https://fusion.yashwanth.online",
    type: "minor"
  },
  // Kriya (url pinger, show, update name, link, image)
  {
    name: "Kriya",
    description: "Monitor the uptime and response time of your favorite URLs.",
    image: "/kriya.png",
    link: "https://kriya.yashwanth.online",
    type: "minor"
  },
  // InShareX (show, update image if needed)
  {
    name: "InShareX",
    description: "A fast and secure file sharing platform for all your needs.",
    image: "/insharex.png",
    link: "https://insharex.yashwanth.online/",
    type: "minor"
  },
  // SyncHub (keep data, do not show)
  {
    name: "SyncHub",
    description: "Centralized hub for syncing data across multiple devices and platforms.",
    image: "/synchub.png",
    link: "https://synchub.yashwanth.online/",
    type: "minor",
    hidden: true
  },
  // SkyWatch (show as minor)
  {
    name: "SkyWatch",
    description: "A weather monitoring and alert system for your local area.",
    image: "/skywatch.png",
    link: "https://skywatch.yashwanth.online/",
    type: "minor"
  },
  // MoneyMind (show as minor)
  {
    name: "MoneyMind",
    description: "A website to track your finances, create budgets, savings, etc.",
    image: "/moneymind.png",
    link: "https://moneymind.yashwanth.online/",
    type: "minor"
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 relative overflow-hidden">
      <style jsx global>{`
        .gradient-text {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-image: linear-gradient(to right, #f97316, #fb923c);
          font-weight: bold;
        }
        .project-card {
          scroll-snap-align: center;
          scroll-snap-stop: always;
          min-width: 0;
          margin-bottom: 2rem;
          padding: 1.5rem;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.3);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
          transition: box-shadow 0.3s, background 0.3s;
        }
        .project-card:hover {
          box-shadow: 0 30px 40px -10px rgba(0,0,0,0.15), 0 15px 20px -10px rgba(0,0,0,0.08);
          background: rgba(255,255,255,0.4);
        }
        .card-content {
          padding: 0.5rem;
        }
      `}</style>
      <header className="relative bg-white/10 backdrop-blur-md text-gray-800 text-center py-8 border-b border-white/20 select-none z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent pointer-events-none"
        >
          Projects
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl mt-2 text-gray-700 pointer-events-none"
        >
          Major & Minor Projects Showcase
        </motion.p>
      </header>
      <main className="flex-grow p-0 w-full z-10">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-lg bg-white/20 rounded-2xl p-8 mb-12 shadow-xl border border-white/30 w-full"
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent"
            transition={{ duration: 0.2 }}
          >
            Major Projects
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full px-4 md:px-8">
            {projects.filter(p => p.type === "major" && !p.hidden).map((project, idx) => (
              <motion.div
                key={project.name}
                className="project-card bg-white/30 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300"
                whileHover={{ 
                  boxShadow: "0 30px 40px -10px rgba(0,0,0,0.15), 0 15px 20px -10px rgba(0,0,0,0.08)",
                  background: "rgba(255,255,255,0.4)"
                }}
              >
                <img
                  src={project.image}
                  alt={project.name + " Preview"}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  style={{ background: '#f97316', objectFit: 'cover' }}
                  onError={e => { e.target.onerror = null; e.target.src = '/printease.png'; }}
                />
                <div className="p-6">
                  <div className="card-content">
                    <h3 className="text-2xl gradient-text mb-2">
                      {project.name}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {project.description}
                    </p>
                    <motion.a
                      whileHover={{ backgroundColor: "#ea580c" }}
                      whileTap={{ scale: 0.95 }}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg transition-all duration-300"
                    >
                      Visit Project
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-lg bg-white/20 rounded-2xl p-8 mb-12 shadow-xl border border-white/30 w-full"
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent"
            transition={{ duration: 0.2 }}
          >
            Minor Projects
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full px-4 md:px-8">
            {projects.filter(p => p.type === "minor" && !p.hidden).map((project, idx) => (
              <motion.div
                key={project.name}
                className="project-card bg-white/30 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300"
                whileHover={{ 
                  boxShadow: "0 30px 40px -10px rgba(0,0,0,0.15), 0 15px 20px -10px rgba(0,0,0,0.08)",
                  background: "rgba(255,255,255,0.4)"
                }}
              >
                <img
                  src={project.image}
                  alt={project.name + " Preview"}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  style={{ background: '#f97316', objectFit: 'cover' }}
                  onError={e => { e.target.onerror = null; e.target.src = '/printease.png'; }}
                />
                <div className="p-6">
                  <div className="card-content">
                    <h3 className="text-2xl gradient-text mb-2">
                      {project.name}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {project.description}
                    </p>
                    <motion.a
                      whileHover={{ backgroundColor: "#ea580c" }}
                      whileTap={{ scale: 0.95 }}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg transition-all duration-300"
                    >
                      Visit Project
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
      <footer className="backdrop-blur-md bg-white/10 text-gray-800 text-center py-6 border-t border-white/20">
        <p className="text-lg">© 2025 Yashwanth Munikuntla </p>
      </footer>
    </div>
  );
};

export default Projects; 