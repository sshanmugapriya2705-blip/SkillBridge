import { useState, useEffect } from 'react';
import './SkillMatching.css';

const sampleProjects = [
  {
    id: 1,
    title: 'Local Business Website',
    organization: 'Community Connect',
    description: 'Build a responsive website for local businesses.',
    skills: ['HTML', 'CSS', 'JavaScript'],
    category: 'Web Development',
  },
  {
    id: 2,
    title: 'Student Learning Portal',
    organization: 'EduTech Foundation',
    description: 'Create an interactive learning platform for students.',
    skills: ['React', 'CSS', 'JavaScript'],
    category: 'Education',
  },
  {
    id: 3,
    title: 'Sales Data Dashboard',
    organization: 'Data Insights',
    description: 'Analyze sales data and present useful insights.',
    skills: ['Python', 'SQL', 'Data Analysis'],
    category: 'Data Science',
  },
  {
    id: 4,
    title: 'Environmental Awareness App',
    organization: 'Green Earth',
    description: 'Build an application promoting environmental awareness.',
    skills: ['React', 'UI/UX Design', 'JavaScript'],
    category: 'Social Impact',
  },
  {
    id: 5,
    title: 'Database Management System',
    organization: 'Digital Solutions',
    description: 'Create a system to organize and manage records.',
    skills: ['SQL', 'Java', 'Python'],
    category: 'Software Development',
  },
  {
    id: 6,
    title: 'Mobile Learning Experience',
    organization: 'Future Learners',
    description: 'Design a mobile-friendly learning experience.',
    skills: ['UI/UX Design', 'React', 'Communication'],
    category: 'Mobile Apps',
  },
];

function SkillMatching() {
  const [studentSkills, setStudentSkills] = useState([]);
  const [postedProjects, setPostedProjects] = useState([]);

  useEffect(() => {
    const loadData = () => {
      try {
        // Load the student's saved skills.
        const savedProfile = localStorage.getItem(
          'skillbridge-profile'
        );

        if (savedProfile) {
          const profile = JSON.parse(savedProfile);

          setStudentSkills(
            Array.isArray(profile.skills) ? profile.skills : []
          );
        } else {
          setStudentSkills([]);
        }

        // Load projects posted through the Post a Project page.
        const savedProjects = localStorage.getItem(
          'skillbridge-projects'
        );

        if (savedProjects) {
          const parsedProjects = JSON.parse(savedProjects);

          setPostedProjects(
            Array.isArray(parsedProjects)
              ? parsedProjects.filter(
                  (project) =>
                    project &&
                    typeof project.title === 'string' &&
                    Array.isArray(project.skills)
                )
              : []
          );
        } else {
          setPostedProjects([]);
        }
      } catch (error) {
        console.error('Unable to load SkillBridge data:', error);
      }
    };

    loadData();

    // Refresh data when the user returns to this browser tab.
    window.addEventListener('focus', loadData);

    return () => {
      window.removeEventListener('focus', loadData);
    };
  }, []);

  // Combine the sample projects with projects posted by users.
  const allProjects = [...sampleProjects, ...postedProjects];

  const matchedProjects = allProjects
    .map((project) => {
      const projectSkills = project.skills.filter(
        (skill) => typeof skill === 'string' && skill.trim() !== ''
      );

      const matchingSkills = projectSkills.filter((skill) =>
        studentSkills.some(
          (studentSkill) =>
            typeof studentSkill === 'string' &&
            studentSkill.toLowerCase().trim() ===
              skill.toLowerCase().trim()
        )
      );

      const missingSkills = projectSkills.filter(
        (skill) => !matchingSkills.includes(skill)
      );

      const matchPercentage =
        projectSkills.length > 0
          ? Math.round(
              (matchingSkills.length / projectSkills.length) * 100
            )
          : 0;

      return {
        ...project,
        matchingSkills,
        missingSkills,
        matchPercentage,
      };
    })
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  return (
    <div className="skill-matching-page">
      <section className="matching-hero">
        <span className="matching-label">SKILLBRIDGE MATCHING</span>

        <h1>Find Your Perfect Project</h1>

        <p>
          Discover projects that match your skills and explore
          opportunities to learn something new.
        </p>

        <div className="your-skills">
          <h3>Your Skills</h3>

          {studentSkills.length > 0 ? (
            <div className="skill-list">
              {studentSkills.map((skill, index) => (
                <span className="skill-badge" key={`${skill}-${index}`}>
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p>
              You haven't added any skills yet. Update your Student
              Profile to discover your matches.
            </p>
          )}
        </div>
      </section>

      <section className="matching-projects">
        <div className="matching-heading">
          <div>
            <span className="matching-label">YOUR OPPORTUNITIES</span>
            <h2>Recommended Projects</h2>
          </div>

          <span className="project-count">
            {matchedProjects.length} Projects
          </span>
        </div>

        {matchedProjects.length > 0 ? (
          <div className="matching-grid">
            {matchedProjects.map((project) => (
              <article
                className="matching-card"
                key={`${project.id}-${project.title}`}
              >
                <span className="project-category">
                  {project.category}
                </span>

                <div className="match-score">
                  <strong>{project.matchPercentage}%</strong>
                  <span>Match</span>
                </div>

                <h3>{project.title}</h3>

                <p className="project-organization">
                  {project.organization}
                </p>

                <p className="project-description">
                  {project.description}
                </p>

                <div className="match-progress">
                  <div
                    className="match-progress-fill"
                    style={{
                      width: `${project.matchPercentage}%`,
                    }}
                  />
                </div>

                <div className="matching-skills">
                  <h4>✓ Skills You Have</h4>

                  {project.matchingSkills.length > 0 ? (
                    project.matchingSkills.map((skill) => (
                      <span className="matched-skill" key={skill}>
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>No matching skills yet.</p>
                  )}
                </div>

                <div className="missing-skills">
                  <h4>＋ Skills to Learn</h4>

                  {project.missingSkills.length > 0 ? (
                    project.missingSkills.map((skill) => (
                      <span className="missing-skill" key={skill}>
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>You have all the listed skills!</p>
                  )}
                </div>

                <div className="matching-footer">
                  {project.matchPercentage >= 70
                    ? '🎯 Strong Match'
                    : project.matchPercentage >= 40
                      ? '🌱 Good Learning Opportunity'
                      : '💡 Opportunity to Grow'}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p>No projects available yet. Check back soon!</p>
        )}
      </section>
    </div>
  );
}

export default SkillMatching;