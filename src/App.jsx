import { Routes,Route,Link }from'react-router-dom';
import ExploreProjects from './pages/ExploreProjects';
import StudentProfile from './pages/StudentProfile';
import SkillMatching from './pages/SkillMatching';
import './App.css';
import PostProject from './pages/PostProject';

function App() {
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <Link to="/"className="logo">Skill<span>Bridge</span><span className="logo-dot">.</span>
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <a href="/#hoe-it-works">How It works</a>
          <Link to="/profile">Profile</Link>
          <Link to="/matching">Skill Matching</Link>
          <Link to="/post-project">Post Projects</Link>
        </div>
        
        
        
        </nav>     

      {/* Hero Section */}
      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="announcement">
              <span className="status-dot"></span>
              Bridging student talent with real-world needs
            </div>

            <h1>
              Your skills.
              <br />
              <span>Real impact.</span>
              <br />
              Endless possibilities.
            </h1>

            <p className="hero-description">
              Connect your classroom knowledge with real-world challenges.
              Discover meaningful projects, collaborate with organizations,
              and turn your skills into something that matters.
            </p>

            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary btn-large">
              Explore Projects<span></span></Link>
            

              <button className="btn btn-outline btn-large">
                Post a Project
              </button>
            </div>

            <div className="hero-note">
              <span className="note-icon">✳</span>
              Built for students. Designed for real-world impact.
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card">
              <div className="visual-header">
                <div>
                  <span className="card-label">OPPORTUNITY SPOTLIGHT</span>
                  <h3>Projects that matter.</h3>
                </div>
                <span className="sparkle">✳</span>
              </div>

              <div className="project-preview">
                <div className="project-icon">🌱</div>
                <div className="project-info">
                  <h4>Community Garden Portal</h4>
                  <p>Help a local community grow.</p>
                </div>
                <span className="match-badge">92% match</span>
              </div>

              <div className="skill-list">
                <span>React</span>
                <span>CSS</span>
                <span>UI/UX</span>
              </div>

              <div className="match-section">
                <div className="match-heading">
                  <span>Your skill match</span>
                  <strong>92%</strong>
                </div>
                <div className="progress-track">
                  <div className="progress-fill"></div>
                </div>
              </div>

              <div className="visual-footer">
                <div className="avatar-stack">
                  <span>A</span>
                  <span>M</span>
                  <span>S</span>
                </div>
                <p>Great ideas start with <strong>you.</strong></p>
              </div>
            </div>

            <div className="floating-badge">
              <span>✦</span>
              Skills meet opportunity
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="intro-strip" id="how-it-works">
          <div>
            <span className="intro-number">01</span>
            <h3>Discover</h3>
            <p>Find projects that match your interests.</p>
          </div>

          <div>
            <span className="intro-number">02</span>
            <h3>Match</h3>
            <p>Understand your skills and skill gaps.</p>
          </div>

          <div>
            <span className="intro-number">03</span>
            <h3>Make an impact</h3>
            <p>Apply what you learn to real problems.</p>
          </div>
        </section>

        {/* Projects Preview */}
        <section className="projects-section" id="projects">
          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR NEXT OPPORTUNITY</span>
              <h2>Real problems. <span>Real projects.</span></h2>
            </div>

            <button className="btn btn-outline">
              View All Projects ↗
            </button>
          </div>

          <p className="section-description">
            Put your skills to work on challenges that make a difference.
          </p>

          <div className="project-grid">
            <article className="project-card">
              <div className="project-card-top">
                <span className="category">WEB DEVELOPMENT</span>
                <span className="project-arrow">↗</span>
              </div>
              <h3>Local Business Website</h3>
              <p>
                Help a small business establish its online presence with a
                modern, responsive website.
              </p>
              <div className="card-skills">
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
              </div>
              <div className="card-bottom">
                <span>Beginner friendly</span>
                <span>3 students needed</span>
              </div>
            </article>

            <article className="project-card featured-card">
              <div className="project-card-top">
                <span className="category">SOCIAL IMPACT</span>
                <span className="project-arrow">↗</span>
              </div>
              <h3>Community Registration System</h3>
              <p>
                Create a simple digital registration system for a local
                community organization.
              </p>
              <div className="card-skills">
                <span>React</span>
                <span>Database</span>
                <span>UI/UX</span>
              </div>
              <div className="card-bottom">
                <span>Intermediate</span>
                <span>4 students needed</span>
              </div>
            </article>

            <article className="project-card">
              <div className="project-card-top">
                <span className="category">DATA MANAGEMENT</span>
                <span className="project-arrow">↗</span>
              </div>
              <h3>Inventory Tracker</h3>
              <p>
                Help a small organization manage its inventory with a
                straightforward digital tool.
              </p>
              <div className="card-skills">
                <span>Python</span>
                <span>SQL</span>
                <span>Logic</span>
              </div>
              <div className="card-bottom">
                <span>Intermediate</span>
                <span>2 students needed</span>
              </div>
            </article>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <a href="#home" className="logo">
          Skill<span>Bridge</span><span className="logo-dot">.</span>
        </a>
        <p>Connecting student skills with real-world problems.</p>
        <span>© 2026 SkillBridge</span>
      </footer>
    </div>
  );
}
function AppRoutes(){
  return(
    <Routes>
      <Route path="/"element={<App/>}/>
      <Route path="/projects"element={<ExploreProjects/>}/>
      <Route path="/profile"element={<StudentProfile/>}/>
      <Route path="/matching"element={<SkillMatching/>}/>
      <Route path="/post-project"element={<PostProject/>}/>
    </Routes>
  );
}

export default AppRoutes;