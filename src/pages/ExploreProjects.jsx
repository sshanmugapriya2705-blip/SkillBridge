import { useState, useEffect } from 'react';
import './ExploreProjects.css';

const projects = [
  {
    id: 1,
    title: 'Local Business Website',
    organization: 'Community Business',
    category: 'Web Development',
    description:
      'Build a modern, responsive website to help a local business establish its online presence.',
    skills: ['HTML', 'CSS', 'JavaScript'],
    difficulty: 'Beginner',
    duration: '3 weeks',
    students: 3,
  },
  {
    id: 2,
    title: 'Community Registration System',
    organization: 'Community Organization',
    category: 'Web Development',
    description:
      'Create a digital registration system that makes community event management easier.',
    skills: ['React', 'Database', 'UI/UX'],
    difficulty: 'Intermediate',
    duration: '4 weeks',
    students: 4,
  },
  {
    id: 3,
    title: 'Inventory Management Tool',
    organization: 'Small Business',
    category: 'Python',
    description:
      'Develop a simple tool to help a small business organize and track its inventory.',
    skills: ['Python', 'SQL'],
    difficulty: 'Intermediate',
    duration: '3 weeks',
    students: 2,
  },
  {
    id: 4,
    title: 'NGO Website Redesign',
    organization: 'Community NGO',
    category: 'UI/UX',
    description:
      'Improve an NGO website to make its information easier to find and its services easier to access.',
    skills: ['UI/UX', 'Figma', 'CSS'],
    difficulty: 'Beginner',
    duration: '2 weeks',
    students: 2,
  },
  {
    id: 5,
    title: 'Student Attendance Dashboard',
    organization: 'Education Initiative',
    category: 'Data Management',
    description:
      'Design a dashboard that presents attendance information in a clear and useful format.',
    skills: ['JavaScript', 'SQL', 'Charts'],
    difficulty: 'Intermediate',
    duration: '4 weeks',
    students: 3,
  },
  {
    id: 6,
    title: 'Community Feedback Portal',
    organization: 'Local Community',
    category: 'Web Development',
    description:
      'Build a simple portal where community members can share feedback and suggestions.',
    skills: ['HTML', 'CSS', 'React'],
    difficulty: 'Beginner',
    duration: '3 weeks',
    students: 3,
  },
];

const defaultCategories = [
  'All Projects',
  'Web Development',
  'Python',
  'UI/UX',
  'Data Management',
];

function ExploreProjects() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [postedProjects, setPostedProjects] = useState([]);

  useEffect(() => {
    function loadPostedProjects() {
      try {
        const savedProjects = JSON.parse(
          localStorage.getItem('skillbridge-projects') || '[]'
        );

        setPostedProjects(
          Array.isArray(savedProjects) ? savedProjects : []
        );
      } catch (error) {
        console.error('Unable to load posted projects:', error);
        setPostedProjects([]);
      }
    }

    loadPostedProjects();

    window.addEventListener('focus', loadPostedProjects);

    return () => {
      window.removeEventListener('focus', loadPostedProjects);
    };
  }, []);

  const allProjects = [...projects, ...postedProjects];

  const categories = [
    ...defaultCategories,
    ...new Set(
      postedProjects
        .map((project) => project.category)
        .filter(
          (category) =>
            category && !defaultCategories.includes(category)
        )
    ),
  ];

  const filteredProjects = allProjects.filter((project) => {
    const matchesCategory =
      activeCategory === 'All Projects' ||
      project.category === activeCategory;

    const searchableText = [
      project.title,
      project.organization,
      project.description,
      project.category,
      ...(Array.isArray(project.skills) ? project.skills : []),
    ]
      .join(' ')
      .toLowerCase();

    const matchesSearch = searchableText.includes(
      search.toLowerCase()
    );

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="explore-page">
      <section className="explore-hero">
        <span className="explore-eyebrow">
          YOUR NEXT OPPORTUNITY
        </span>

        <h1>
          Find projects.
          <br />
          <span>Make an impact.</span>
        </h1>

        <p>
          Discover real-world challenges, apply your skills, and gain
          experience by working on projects that matter.
        </p>

        <div className="project-search">
          <span aria-hidden="true">⌕</span>

          <input
            type="search"
            placeholder="Search projects, skills, or organizations..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search projects"
          />

          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearch('')}
            >
              Clear
            </button>
          )}
        </div>
      </section>

      <section className="explore-content">
        <div className="explore-heading">
          <div>
            <h2>Explore opportunities</h2>
            <p>Find a project that matches your interests.</p>
          </div>

          <span className="result-count">
            {filteredProjects.length}{' '}
            {filteredProjects.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        <div
          className="category-filters"
          aria-label="Filter by category"
        >
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={`category-button ${
                activeCategory === category ? 'active' : ''
              }`}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="explore-grid">
            {filteredProjects.map((project) => (
              <article className="explore-card" key={project.id}>
                <div className="explore-card-top">
                  <span className="explore-category">
                    {project.category}
                  </span>

                  <span className="difficulty">
                    {project.difficulty || 'New Project'}
                  </span>
                </div>

                <h3>{project.title}</h3>

                <p className="organization-name">
                  {project.organization}
                </p>

                <p className="explore-description">
                  {project.description}
                </p>

                <div className="explore-skills">
                  {(Array.isArray(project.skills)
                    ? project.skills
                    : []
                  ).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <div className="explore-card-footer">
                  <span>
                    ◷{' '}
                    {project.duration ||
                      (project.deadline
                        ? `Deadline: ${project.deadline}`
                        : 'Duration flexible')}
                  </span>

                  <span>
                    ♧{' '}
                    {Number.isFinite(project.students)
                      ? `${project.students} students needed`
                      : 'Open to students'}
                  </span>
                </div>

                <button
                  type="button"
                  className="project-details-button"
                  onClick={() =>
                    alert(
                      `Project: ${project.title}\n\n` +
                        `Organization: ${project.organization}\n` +
                        `Category: ${project.category}\n` +
                        `Required skills: ${
                          Array.isArray(project.skills)
                            ? project.skills.join(', ')
                            : 'Not specified'
                        }\n` +
                        `Duration: ${
                          project.duration ||
                          (project.deadline
                            ? `Deadline: ${project.deadline}`
                            : 'Not specified')
                        }\n\n` +
                        `${project.description}`
                    )
                  }
                >
                  View Project Details <span>↗</span>
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-projects">
            <span>⌕</span>
            <h3>No matching projects found</h3>
            <p>
              Try another search term or choose a different category.
            </p>

            <button
              type="button"
              className="reset-filters"
              onClick={() => {
                setSearch('');
                setActiveCategory('All Projects');
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default ExploreProjects;