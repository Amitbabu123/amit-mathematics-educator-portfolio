
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight, Download, Menu, X, GraduationCap, BookOpen,
  Calculator, Award, Code2, Mail, MapPin, Linkedin, Github,
  ExternalLink, CheckCircle2, Sparkles, Brain, FileText, Send,
  LockKeyhole
} from 'lucide-react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const nav = [
  ['About', 'about'],
  ['Experience', 'experience'],
  ['Expertise', 'expertise'],
  ['Work', 'work'],
  ['Contact', 'contact']
]

function SectionTitle({ eyebrow, title, sub }) {
  return (
    <div className="section-title">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus('')

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Unable to send message.')
      }

      setStatus('Thank you! Your message has been received.')
      setForm({ name: '', email: '', message: '' })

    } catch (err) {
      setStatus(
        err.message === 'Failed to fetch'
          ? 'Contact service is not connected yet. Please email me directly.'
          : err.message
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="site-shell">

      {/* NAVBAR */}
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-mark">A<span>.</span></span>
          <span>
            AMIT KUMAR
            <small>MATHEMATICS EDUCATOR</small>
          </span>
        </a>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {nav.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}

          <a className="nav-cta" href="#contact">
            Let's Connect <ArrowUpRight size={15} />
          </a>
        </nav>

        <button
          className="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>

        {/* HERO SECTION */}
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="availability"
            >
              <span /> OPEN TO TEACHING OPPORTUNITIES
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.65 }}
            >
              Making Mathematics
              <br />
              <em>clear, logical</em> & meaningful.
            </motion.h1>

            <motion.p
              className="hero-lead"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              Hello, I'm <strong>Amit Kumar</strong> — a Mathematics Educator
              and Subject Matter Expert passionate about making complex
              concepts easier to understand.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <a className="btn btn-gold" href="#contact">
                Discuss an Opportunity <ArrowUpRight size={17} />
              </a>

              <a
                className="btn btn-outline"
                href="/Amit-Kumar-Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <Download size={16} /> Download Resume
              </a>
            </motion.div>

            <div className="hero-meta">
              <span><MapPin size={15} /> Noida, Uttar Pradesh</span>
              <span><GraduationCap size={16} /> B.Tech, Information Technology</span>
            </div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />

            <div className="portrait-frame">
              <img
                className="portrait-photo"
                src="/amit-kumar-profile.jpg"
                alt="Amit Kumar, Mathematics Educator"
              />
            </div>

            <div className="floating-note note-top">
              <Calculator size={18} />
              <span>Mathematics<br /><b>Made intuitive</b></span>
            </div>

            <div className="floating-note note-bottom">
              <Award size={19} />
              <span>NPTEL<br /><b>Silver Medal</b></span>
            </div>

            <div className="visual-caption">
              EDUCATION • CLARITY • IMPACT
            </div>
          </motion.div>

          <div className="hero-bottom">
            <span>SCROLL TO EXPLORE</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* STATS */}
        <section className="stats-strip">
          <div><strong>6–12</strong><span>School-level focus</span></div>
          <div><strong>JEE · CUET</strong><span>Competitive exam content</span></div>
          <div><strong>3+ yrs</strong><span>Teaching & academic work*</span></div>
          <div><strong>B.Tech</strong><span>Information Technology</span></div>
        </section>

        {/* ABOUT */}
        <section className="section-wrap section-pad" id="about">
          <SectionTitle
            eyebrow="A LITTLE ABOUT ME"
            title="Education with purpose."
            sub="A blend of subject knowledge, academic content development and a technology-oriented mindset."
          />

          <div className="about-grid">
            <div className="about-text">
              <p className="large-copy">
                I believe every student can understand Mathematics when
                concepts are explained with the right logic, structure
                and examples.
              </p>

              <p>
                My work brings together classroom teaching, mathematics
                content development and quality-focused academic resources.
                I enjoy turning complex topics into clear explanations,
                well-structured questions and meaningful learning experiences.
              </p>

              <p>
                With an Information Technology background, I also bring
                a digital-first approach to educational content and learning tools.
              </p>

              <a className="text-link" href="#experience">
                Explore my journey <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="education-card">
              <div className="card-icon"><GraduationCap /></div>
              <span className="eyebrow">EDUCATION</span>
              <h3>Bachelor of Technology</h3>
              <p>Information Technology</p>
              <div className="education-foot">
                <b>KNIT Sultanpur</b>
                <span>2022 · CGPA 7.57/10</span>
              </div>
              <div className="education-line" />
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="dark-section section-pad" id="experience">
          <div className="section-wrap">
            <SectionTitle
              eyebrow="PROFESSIONAL JOURNEY"
              title="Experience that shapes my work."
              sub="Teaching, academic content creation and a commitment to quality learning resources."
            />

            <div className="timeline">

              <article className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-date">JUNE 2024 — PRESENT</div>

                <div className="timeline-content">
                  <span className="tag">MATHEMATICS · CONTENT DEVELOPMENT</span>
                  <h3>Universal Books</h3>
                  <h4>
                    Mathematics Subject Matter Expert
                  
                  </h4>

                  <p>
                    Contributing to mathematics learning content and academic
                    resources, with a focus on clear explanations, accurate
                    solutions and structured educational material.
                  </p>

                  <ul>
                    <li>Developing and reviewing mathematics questions and solutions.</li>
                    <li>Supporting worksheets, question banks and exam-oriented learning material.</li>
                    <li>Checking mathematical accuracy, notation, completeness and presentation quality.</li>
                  </ul>
                </div>
              </article>

              <article className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-date">2019 — 2022</div>

                <div className="timeline-content">
                  <span className="tag">TEACHING · VOLUNTEERING</span>
                  <h3>Koshish Educational and Welfare Society</h3>
                  <h4>Teaching Volunteer & Team Leader</h4>

                  <p>
                    Supported students through mathematics teaching,
                    doubt-solving and academic guidance.
                  </p>

                  <ul>
                    <li>Teaching support for Classes 5–12.</li>
                    <li>Mathematics preparation for JEE Main and other entrance examinations.</li>
                    <li>Coordinating learning activities and supporting students' progress.</li>
                  </ul>
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* EXPERTISE */}
        <section className="section-wrap section-pad" id="expertise">
          <SectionTitle
            eyebrow="WHAT I BRING"
            title="Areas of expertise."
            sub="Academic strengths and complementary technical capabilities."
          />

          <div className="expertise-grid">

            <div className="expertise-card featured">
              <div className="expertise-icon"><Calculator /></div>
              <span className="eyebrow">01 / SUBJECT EXPERTISE</span>
              <h3>Mathematics</h3>
              <p>Concept-based teaching, problem-solving and structured academic content.</p>
              <div className="pills">
                <span>Algebra</span><span>Geometry</span><span>Trigonometry</span>
                <span>Calculus</span><span>Statistics</span>
              </div>
            </div>

            <div className="expertise-card">
              <div className="expertise-icon"><BookOpen /></div>
              <span className="eyebrow">02 / TEACHING</span>
              <h3>School & Competitive Exams</h3>
              <p>Learning resources and teaching support aligned to student level and exam goals.</p>
              <div className="pills">
                <span>Classes 6–12</span><span>JEE</span><span>CUET</span><span>Foundation</span>
              </div>
            </div>

            <div className="expertise-card">
              <div className="expertise-icon"><FileText /></div>
              <span className="eyebrow">03 / CONTENT</span>
              <h3>Academic Development</h3>
              <p>Question design, solution writing, proofreading and educational material review.</p>
              <div className="pills">
                <span>Worksheets</span><span>Question Banks</span><span>Solutions</span><span>Content QA</span>
              </div>
            </div>

            <div className="expertise-card">
              <div className="expertise-icon"><Code2 /></div>
              <span className="eyebrow">04 / TECHNOLOGY</span>
              <h3>Digital Skills</h3>
              <p>Technology skills that support modern educational workflows and digital learning.</p>
              <div className="pills">
                <span>Python</span><span>HTML/CSS/JS</span><span>React</span>
                <span>Node.js</span><span>SQL</span><span>Git</span>
              </div>
            </div>

          </div>
        </section>

        {/* WORK */}
        <section className="work-section section-pad" id="work">
          <div className="section-wrap">
            <SectionTitle
              eyebrow="SELECTED WORK"
              title="The work behind the learning."
              sub="A few examples of the academic work and resources I focus on. Add approved samples before publishing."
            />

            <div className="work-grid">

              <article className="work-card">
                <div className="work-art art-one">
                  <span>01</span>
                  <div className="math-symbol">∑<sub>n=1</sub><sup>∞</sup></div>
                </div>
                <div className="work-info">
                  <span className="eyebrow">MATHEMATICS CONTENT</span>
                  <h3>Concepts & Worked Solutions</h3>
                  <p>Step-by-step solutions designed to build understanding and accuracy.</p>
                </div>
              </article>

              <article className="work-card">
                <div className="work-art art-two">
                  <span>02</span>
                  <div className="worksheet">
                    MATHS<br /><b>WORKSHEET</b>
                    <hr />
                    Q. 01 — Q. 20<br />
                    Practice • Revise • Learn
                  </div>
                </div>
                <div className="work-info">
                  <span className="eyebrow">ACADEMIC RESOURCES</span>
                  <h3>Worksheets & Question Banks</h3>
                  <p>Structured practice material for school and competitive exam preparation.</p>
                </div>
              </article>

              <article className="work-card">
                <div className="work-art art-three">
                  <span>03</span>
                  <div className="quality-stamp">
                    <CheckCircle2 />
                    <b>ACCURACY<br />MATTERS</b>
                  </div>
                </div>
                <div className="work-info">
                  <span className="eyebrow">CONTENT QUALITY</span>
                  <h3>Academic Review & QA</h3>
                  <p>Reviewing equations, notation, diagrams, grammar and solution completeness.</p>
                </div>
              </article>

            </div>

            <p className="small-note">
              *These are work categories, not claims of publicly released projects.
              Add only samples you are permitted to share.
            </p>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="section-wrap section-pad" id="achievements">
          <SectionTitle
            eyebrow="LEARNING & DEVELOPMENT"
            title="Always learning. Always improving."
          />

          <div className="achievement-grid">

            <div className="achievement">
              <Award />
              <div>
                <b>NPTEL — Cloud Computing</b>
                <span>Silver Medal · IIT Kharagpur</span>
              </div>
            </div>

            <div className="achievement">
              <Brain />
              <div>
                <b>NPTEL — Machine Learning</b>
                <span>IIT Madras · Course completed (confirm certificate details)</span>
              </div>
            </div>

            <div className="achievement">
              <Code2 />
              <div>
                <b>Crio.do Fellowship</b>
                <span>Software development learning programme</span>
              </div>
            </div>

            <div className="achievement">
              <Sparkles />
              <div>
                <b>Continuous Skill Development</b>
                <span>Programming, problem-solving and digital tools</span>
              </div>
            </div>

          </div>
        </section>

        {/* CONTACT */}
        <section className="contact-section section-pad" id="contact">
          <div className="section-wrap contact-grid">

            <div>
              <SectionTitle
                eyebrow="LET'S CONNECT"
                title="Let's make learning better."
                sub="Open to opportunities in Mathematics teaching, subject matter expertise and academic content development."
              />

              <div className="contact-details">

                <a href="mailto:amitkumar823906@gmail.com">
                  <Mail /> amitkumar823906@gmail.com
                </a>

                <span>
                  <MapPin /> Noida, Uttar Pradesh, India
                </span>

                <a
                  href="https://www.linkedin.com/in/amit-kumar-522180201/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin /> LinkedIn profile <ExternalLink size={13} />
                </a>

                <a
                  href="https://github.com/Amitbabu123"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github /> GitHub profile <ExternalLink size={13} />
                </a>

                <a
                  href="https://www.crio.do/learn/portfolio/amitkumar823906/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink /> Crio.do portfolio <ExternalLink size={13} />
                </a>

              </div>
            </div>

            <form className="contact-form" onSubmit={submit}>
              <h3>Send an enquiry</h3>
              <p>I'd be glad to hear from you.</p>

              <label>
                Your name
                <input
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </label>

              <label>
                Email address
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </label>

              <label>
                Message
                <textarea
                  required
                  rows="4"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the opportunity..."
                />
              </label>

              <button className="btn btn-gold submit-btn" disabled={sending}>
                {sending ? 'Sending...' : 'Send Message'} <Send size={15} />
              </button>

              {status && <p className="form-status">{status}</p>}
            </form>

          </div>
        </section>

      </main>

      {/* FOOTER WITH ADMIN LOGIN */}
      <footer className="footer">

        <a className="brand" href="#home">
          <span className="brand-mark">A<span>.</span></span>
          <span>
            AMIT KUMAR
            <small>MATHEMATICS EDUCATOR</small>
          </span>
        </a>

        <span>
          © {new Date().getFullYear()} Amit Kumar. Built with purpose.
        </span>

        <div className="footer-links">
          <a href="#home">Back to top ↑</a>

          <a href="/admin" className="admin-footer-link">
            <LockKeyhole size={14} />
            Admin Login
          </a>
        </div>

      </footer>

    </div>
  )
}

export default App
