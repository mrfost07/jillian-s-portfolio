import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Facebook, Mail, Phone, MapPin, ExternalLink, Code, Database, Palette, Smartphone, Server, Globe } from 'lucide-react';
import ScrollReveal from './components/ScrollReveal';
import StaggeredReveal from './components/StaggeredReveal';
import SmoothScroll from './components/SmoothScroll';
import ParallaxSection from './components/ParallaxSection';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showWelcome, setShowWelcome] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [isWelcomeComplete, setIsWelcomeComplete] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const welcomeText = '_kmyyyy';

  useEffect(() => {
    // Enhanced scroll tracking for performance
    let ticking = false;
    const updateScrollY = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', updateScrollY, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollY);
  }, []);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      setShowWelcome(true);
      sessionStorage.setItem('hasVisited', 'true');
      
      // Start typewriter effect after a brief delay
      setTimeout(() => {
        let currentIndex = 0;
        const typeInterval = setInterval(() => {
          if (currentIndex <= welcomeText.length) {
            setTypewriterText(welcomeText.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(typeInterval);
            // Hold the complete text for a moment, then fade out
            setTimeout(() => {
              setIsWelcomeComplete(true);
              // Hide welcome screen after fade out animation
              setTimeout(() => {
                setShowWelcome(false);
              }, 800);
            }, 1000);
          }
        }, 150); // Typewriter speed
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (!showWelcome) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.3 }
      );

      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => observer.observe(section));

      return () => observer.disconnect();
    }
  }, [showWelcome]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const skills = [
    { 
      name: 'Frontend', 
      icon: Code, 
      description: 'Modern web interfaces with React, TypeScript, and responsive design',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      color: '#E34F26'
    },
    { 
      name: 'Backend', 
      icon: Server, 
      description: 'Scalable server solutions with Python, Node.js, and APIs',
      technologies: ['Python', 'Node.js', 'Express', 'FastAPI'],
      color: '#3776AB'
    },
    { 
      name: 'Database', 
      icon: Database, 
      description: 'Data management with SQL, NoSQL, and cloud databases',
      technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase'],
      color: '#336791'
    },
    { 
      name: 'Design', 
      icon: Palette, 
      description: 'User-centered design with modern tools and principles',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      color: '#FF7262'
    },
    { 
      name: 'Mobile', 
      icon: Smartphone, 
      description: 'Cross-platform mobile apps with React Native',
      technologies: ['React Native', 'Expo', 'Flutter', 'iOS/Android'],
      color: '#61DAFB'
    },
    { 
      name: 'DevOps', 
      icon: Globe, 
      description: 'Deployment, CI/CD, and cloud infrastructure',
      technologies: ['Docker', 'AWS', 'Vercel', 'GitHub Actions'],
      color: '#4CAF50'
    },
  ];

  const experiences = [
    {
      position: 'Freelance Full Stack Developer',
      company: 'Self-Employed',
      date: '2023 - Present',
      description: 'Developing custom web applications for small businesses and startups. Specializing in React frontends with Python/PHP backends, delivering responsive designs and scalable solutions. Successfully completed 15+ projects with 100% client satisfaction rate.',
      achievements: ['Built e-commerce platforms handling $50K+ monthly transactions', 'Reduced client website load times by 60% through optimization', 'Implemented automated testing reducing bugs by 80%']
    },
    {
      position: 'Frontend Developer Intern',
      company: 'TechStart Solutions',
      date: '2022 - 2023',
      description: 'Collaborated with senior developers to build user interfaces using React and modern CSS frameworks. Gained experience in version control, agile development, and responsive design principles.',
      achievements: ['Contributed to 3 major product releases', 'Improved component reusability by 40%', 'Mentored 2 junior interns in React best practices']
    },
    {
      position: 'Web Development Assistant',
      company: 'University IT Department',
      date: '2021 - 2022',
      description: 'Assisted in maintaining university websites and learning management systems. Developed skills in HTML, CSS, JavaScript, and basic database operations while supporting student and faculty needs.',
      achievements: ['Maintained 10+ university department websites', 'Reduced support ticket resolution time by 30%', 'Created documentation improving team efficiency']
    },
  ];

  // Welcome Screen Component
  if (showWelcome) {
    return (
      <div className={`welcome-screen ${isWelcomeComplete ? 'fade-out' : ''}`}>
        <div className="welcome-content">
          <div className="typewriter-container">
            <span className="typewriter-text">{typewriterText}</span>
            <span className="cursor">|</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-white">
        {/* Enhanced Navigation with scroll effects */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 
            ? 'bg-white/95 backdrop-blur-lg border-b border-purple-100 shadow-lg' 
            : 'bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <ScrollReveal direction="left" delay={0.1}>
                <div className="flex-shrink-0">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                    Jillian
                  </span>
                </div>
              </ScrollReveal>
              
              {/* Desktop Menu */}
              <div className="hidden md:block">
                <ScrollReveal direction="right" delay={0.2}>
                  <div className="flex space-x-8">
                    {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map((item) => (
                      <button
                        key={item}
                        onClick={() => scrollToSection(item)}
                        className={`capitalize px-3 py-2 text-sm font-medium transition-all duration-300 relative hover:scale-105 ${
                          activeSection === item
                            ? 'text-purple-600'
                            : 'text-gray-600 hover:text-purple-600'
                        }`}
                      >
                        {item}
                        {activeSection === item && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full animate-scale-in"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </ScrollReveal>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 text-gray-600 hover:text-purple-600 transition-all duration-300 hover:scale-110"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          <div className={`md:hidden transition-all duration-500 ease-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 translate-y-0' 
              : 'max-h-0 opacity-0 -translate-y-4'
          } overflow-hidden bg-white/98 backdrop-blur-lg border-b border-purple-100`}>
            <div className="px-4 py-2 space-y-1">
              {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize block w-full text-left px-3 py-2 text-base font-medium transition-all duration-300 rounded-lg hover:scale-105 ${
                    activeSection === item
                      ? 'text-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                  style={{ 
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms' 
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Enhanced Hero Section */}
        <section id="home" className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-white to-purple-50 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="fade" delay={0.2}>
              <div className="mb-8">
                <div className="w-72 h-72 mx-auto mb-8 rounded-full overflow-hidden border-4 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-purple-300">
                  <img 
                    src="/assets/images/profile.jpg" 
                    alt="Jillian C. Atuel" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400";
                    }}
                  />
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.4}>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 bg-clip-text text-transparent mb-4 hover:scale-105 transition-transform duration-300">
                Jillian C. Atuel
              </h1>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.6}>
              <p className="text-2xl md:text-3xl text-gray-600 mb-8 font-light">
                Full Stack Developer & UI/UX Designer
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.8}>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://github.com/404"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-purple-600 transition-all duration-300 hover:scale-125 hover:rotate-12"
                >
                  <Github size={28} />
                </a>
                <a
                  href="https://www.facebook.com/jillian.atuel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-purple-600 transition-all duration-300 hover:scale-125 hover:-rotate-12"
                >
                  <Facebook size={28} />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Enhanced About Section with Right-Aligned Header */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            {/* Content Grid with Header in Right Column */}
            <div className="grid md:grid-cols-2 gap-20 items-start">
              <ScrollReveal direction="left" delay={0.3}>
                <div className="order-2 md:order-1">
                  <ParallaxSection speed={0.2}>
                    <img 
                      src="/assets/images/about.jpg" 
                      alt="Jillian at work" 
                      className="rounded-lg shadow-xl w-full h-auto hover:shadow-2xl transition-all duration-500 hover:scale-105"
                    />
                  </ParallaxSection>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="right" delay={0.1}>
                <div className="order-1 md:order-2">
                  {/* Header positioned in right column */}
                  <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Me</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full"></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Summary</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Hi, I'm Jillian! As a Computer Science student and budding Software Engineer, I love blending elegant design with rock‑solid code. On the front end, I craft intuitive interfaces using HTML, CSS, and JavaScript; on the back end, I build scalable solutions in Python and PHP, backed by SQL databases.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    When I'm not coding, you'll find me exploring the latest UI trends or tinkering with interactive web effects. I'm passionate about creating digital experiences that are both beautiful and functional.
                  </p>
                  
                  <StaggeredReveal staggerDelay={0.1} baseDelay={0.7}>
                    <div className="flex items-center hover:translate-x-2 transition-transform duration-300 mb-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">Full Stack Web Development</span>
                    </div>
                    <div className="flex items-center hover:translate-x-2 transition-transform duration-300 mb-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">UI/UX Design & Prototyping</span>
                    </div>
                    <div className="flex items-center hover:translate-x-2 transition-transform duration-300 mb-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">Database Design & Management</span>
                    </div>
                    <div className="flex items-center hover:translate-x-2 transition-transform duration-300 mb-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-4 flex-shrink-0"></div>
                      <span className="text-gray-700">Responsive Web Design</span>
                    </div>
                  </StaggeredReveal>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Enhanced Skills Section */}
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-purple-800 mx-auto rounded-full"></div>
                <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
                  A comprehensive toolkit of modern technologies and frameworks that I use to bring ideas to life.
                </p>
              </div>
            </ScrollReveal>
            
            <StaggeredReveal 
              staggerDelay={0.15} 
              baseDelay={0.3}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {skills.map((skill, index) => (
                <div key={index} className="bg-white p-8 rounded-xl border border-purple-100 text-center hover:shadow-xl transition-all duration-500 hover:scale-105 group hover:border-purple-200 hover:-translate-y-2">
                  <div className="relative mb-6">
                    <skill.icon 
                      size={48} 
                      className="text-purple-600 mx-auto transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" 
                      style={{ color: skill.color }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl scale-150"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">{skill.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{skill.description}</p>
                  <div className="space-y-2">
                    <div className="flex flex-wrap justify-center gap-2">
                      {skill.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium hover:bg-purple-200 transition-all duration-300 hover:scale-110"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </StaggeredReveal>
          </div>
        </section>

        {/* Enhanced Experience Section */}
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Professional Experience</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-purple-800 mx-auto rounded-full"></div>
                <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
                  My journey in software development, from learning the fundamentals to building real-world applications.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-purple-300 hidden md:block"></div>
              <StaggeredReveal 
                staggerDelay={0.2} 
                baseDelay={0.3}
                className="space-y-12"
              >
                {experiences.map((exp, index) => (
                  <div key={index} className="relative md:ml-16 group">
                    <div className="absolute -left-20 top-2 w-4 h-4 bg-purple-600 rounded-full hidden md:block shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors duration-300">{exp.position}</h3>
                          <h4 className="text-lg text-gray-700 font-medium">{exp.company}</h4>
                        </div>
                        <span className="text-purple-600 font-semibold bg-purple-100 px-4 py-2 rounded-full text-sm mt-2 md:mt-0 self-start hover:bg-purple-200 transition-colors duration-300">
                          {exp.date}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed mb-4">{exp.description}</p>
                      {exp.achievements && (
                        <div className="space-y-2">
                          <h5 className="font-semibold text-gray-800 text-sm">Key Achievements:</h5>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="text-sm text-gray-600 flex items-start hover:translate-x-2 transition-transform duration-300">
                                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </StaggeredReveal>
            </div>
          </div>
        </section>

        {/* Enhanced Projects Section */}
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Projects</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-purple-800 mx-auto rounded-full"></div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="scale" delay={0.3}>
              <div className="text-center py-20">
                <div className="mb-8">
                  <Code size={64} className="text-purple-300 mx-auto mb-4 hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-semibold text-gray-600 mb-2">Projects Coming Soon</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    I'm currently working on some exciting projects that will be showcased here soon. 
                    Stay tuned for updates!
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Enhanced Contact Section */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-purple-800 mx-auto rounded-full"></div>
              </div>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-12">
              <ScrollReveal direction="left" delay={0.3}>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's Connect</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    I'm always interested in hearing about new opportunities, creative projects, 
                    or just chatting about technology. Feel free to reach out!
                  </p>
                  
                  <StaggeredReveal staggerDelay={0.1} baseDelay={0.5}>
                    <div className="flex items-center p-3 rounded-lg hover:bg-white transition-all duration-300 hover:scale-105 hover:translate-x-2">
                      <Mail className="text-purple-600 mr-4" size={20} />
                      <span className="text-gray-700">ji******@gmail.com</span>
                    </div>
                    <div className="flex items-center p-3 rounded-lg hover:bg-white transition-all duration-300 hover:scale-105 hover:translate-x-2">
                      <Phone className="text-purple-600 mr-4" size={20} />
                      <span className="text-gray-700">+639**********</span>
                    </div>
                    <div className="flex items-center p-3 rounded-lg hover:bg-white transition-all duration-300 hover:scale-105 hover:translate-x-2">
                      <MapPin className="text-purple-600 mr-4" size={20} />
                      <span className="text-gray-700">Kitcharao, Agusan del Norte</span>
                    </div>
                  </StaggeredReveal>
                </div>
              </ScrollReveal>
              
              <ScrollReveal direction="right" delay={0.5}>
                <div>
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="max-w-6xl mx-auto text-center">
              <p className="text-gray-400 mb-4">
                © 2024 Jillian C. Atuel. All rights reserved.
              </p>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://github.com/404"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 hover:rotate-12"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.facebook.com/jillian.atuel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 hover:-rotate-12"
                >
                  <Facebook size={24} />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </footer>
      </div>
    </SmoothScroll>
  );
}

export default App;