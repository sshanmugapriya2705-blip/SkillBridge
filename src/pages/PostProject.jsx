import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostProject.css';

function PostProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    category: '',
    description: '',
    skills: '',
    deadline: '',
  });

  const [message, setMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const existingProjects = JSON.parse(
      localStorage.getItem('skillbridge-projects') || '[]'
    );

    const newProject = {
      id: Date.now(),
      title: formData.title.trim(),
      organization: formData.organization.trim(),
      category: formData.category,
      description: formData.description.trim(),
      skills: formData.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),
      deadline: formData.deadline,
    };

    localStorage.setItem(
      'skillbridge-projects',
      JSON.stringify([...existingProjects, newProject])
    );

    setMessage('Your project has been posted successfully!');

    setFormData({
      title: '',
      organization: '',
      category: '',
      description: '',
      skills: '',
      deadline: '',
    });
  }

  return (
    <main className="post-project-page">
      <section className="post-project-header">
        <span className="post-project-label">GROW WITH SKILLBRIDGE</span>

        <h1>Post a Project</h1>

        <p>
          Share a real-world challenge and connect with students
          who have the skills to make a difference.
        </p>
      </section>

      <section className="post-project-container">
        <div className="post-project-intro">
          <h2>Project Details</h2>
          <p>Fill in the information below to publish your project.</p>
        </div>

        {message && (
          <div className="post-project-success" role="status">
            ✓ {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="post-project-form">
          <div className="form-group">
            <label htmlFor="title">Project Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. Community Learning Website"
              value={formData.title}
              onChange={handleChange}
              required
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="organization">Organization Name *</label>
            <input
              id="organization"
              name="organization"
              type="text"
              placeholder="Enter your organization name"
              value={formData.organization}
              onChange={handleChange}
              required
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Project Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Apps">Mobile Apps</option>
              <option value="Data Science">Data Science</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Education">Education</option>
              <option value="Social Impact">Social Impact</option>
              <option value="Environment">Environment</option>
              <option value="Software Development">
                Software Development
              </option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Project Description *</label>
            <textarea
              id="description"
              name="description"
              placeholder="Explain the problem and what you want students to build..."
              value={formData.description}
              onChange={handleChange}
              required
              minLength={20}
              maxLength={1000}
              rows={5}
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills">Required Skills *</label>
            <input
              id="skills"
              name="skills"
              type="text"
              placeholder="React, JavaScript, CSS"
              value={formData.skills}
              onChange={handleChange}
              required
            />
            <small>Separate each skill with a comma.</small>
          </div>

          <div className="form-group">
            <label htmlFor="deadline">Project Deadline *</label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              min={new Date().toLocaleDateString('en-CA')}
              required
            />
          </div>

          <div className="post-project-actions">
            <button type="submit" className="post-project-submit">
              Publish Project →
            </button>

            <button
              type="button"
              className="post-project-cancel"
              onClick={() => navigate('/projects')}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default PostProject;