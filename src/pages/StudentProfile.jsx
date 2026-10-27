import { useState } from 'react';
import './StudentProfile.css';

const defaultProfile = {
  name: '',
  email: '',
  course: '',
  college: '',
  year: '1st Year',
  bio: '',
  skills: [],
  interests: [],
};

const availableSkills = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Python',
  'Java',
  'SQL',
  'UI/UX Design',
  'Data Analysis',
  'Communication',
];

const availableInterests = [
  'Web Development',
  'Mobile Apps',
  'Artificial Intelligence',
  'Social Impact',
  'Data Science',
  'Education',
  'Environment',
  'Healthcare',
];

function StudentProfile() {
  const [profile, setProfile] = useState(() => {
    try {
      const savedProfile = localStorage.getItem('skillbridge-profile');
      return savedProfile
        ? { ...defaultProfile, ...JSON.parse(savedProfile) }
        : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [message, setMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage('');
  }

  function toggleItem(field, item) {
    setProfile((previous) => ({
      ...previous,
      [field]: previous[field].includes(item)
        ? previous[field].filter((value) => value !== item)
        : [...previous[field], item],
    }));

    setMessage('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    try {
      localStorage.setItem(
        'skillbridge-profile',
        JSON.stringify(profile)
      );

      setMessage('Your profile has been saved successfully!');
    } catch {
      setMessage('Unable to save your profile. Please try again.');
    }
  }

  const initials = profile.name.trim()
    ? profile.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
        .toUpperCase()
    : 'ST';

  return (
    <div className="student-profile-page">
      <section className="profile-hero">
        <span className="profile-eyebrow">YOUR SKILLBRIDGE JOURNEY</span>
        <h1>Build your <span>student profile.</span></h1>
        <p>
          Tell us about yourself, showcase your skills, and discover
          opportunities that match your interests.
        </p>
      </section>

      <main className="profile-content">
        <aside className="profile-sidebar">
          <div className="profile-summary">
            <div className="profile-avatar">{initials}</div>

            <h2>{profile.name.trim() || 'Your Name'}</h2>

            <p>{profile.course || 'Your Course'}</p>

            <span className="profile-status">Student Profile</span>
          </div>

          <div className="profile-progress-card">
            <h3>Profile checklist</h3>

            {[
              ['Name', profile.name],
              ['Email', profile.email],
              ['Education', profile.course && profile.college],
              ['About you', profile.bio],
              ['Skills', profile.skills.length],
              ['Interests', profile.interests.length],
            ].map(([label, value]) => (
              <div className="checklist-item" key={label}>
                <span>{label}</span>
                <span className={value ? 'check-complete' : 'check-pending'}>
                  {value ? '✓' : '○'}
                </span>
              </div>
            ))}
          </div>
        </aside>

        <form className="profile-form" onSubmit={handleSubmit}>
          <section className="profile-form-section">
            <div className="profile-section-heading">
              <span className="profile-section-number">01</span>
              <div>
                <h2>Basic information</h2>
                <p>Let's get to know you.</p>
              </div>
            </div>

            <div className="profile-fields">
              <label>
                Full name *
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </label>

              <label>
                Email address *
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label>
                Course / Degree *
                <input
                  type="text"
                  name="course"
                  value={profile.course}
                  onChange={handleChange}
                  placeholder="e.g. B.Sc. Computer Science"
                  required
                />
              </label>

              <label>
                College / Institution *
                <input
                  type="text"
                  name="college"
                  value={profile.college}
                  onChange={handleChange}
                  placeholder="Enter your institution"
                  required
                />
              </label>

              <label>
                Current year
                <select
                  name="year"
                  value={profile.year}
                  onChange={handleChange}
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                  <option>Graduate</option>
                </select>
              </label>

              <label className="profile-full-width">
                About you
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="Tell organizations what you enjoy learning and building..."
                  rows="4"
                />
              </label>
            </div>
          </section>

          <section className="profile-form-section">
            <div className="profile-section-heading">
              <span className="profile-section-number">02</span>
              <div>
                <h2>Your skills</h2>
                <p>Select the skills you currently have.</p>
              </div>
            </div>

            <div className="profile-choice-grid">
              {availableSkills.map((skill) => (
                <button
                  type="button"
                  key={skill}
                  className={`profile-choice ${
                    profile.skills.includes(skill) ? 'selected' : ''
                  }`}
                  onClick={() => toggleItem('skills', skill)}
                  aria-pressed={profile.skills.includes(skill)}
                >
                  <span>
                    {profile.skills.includes(skill) ? '✓' : '+'}
                  </span>
                  {skill}
                </button>
              ))}
            </div>
          </section>

          <section className="profile-form-section">
            <div className="profile-section-heading">
              <span className="profile-section-number">03</span>
              <div>
                <h2>Your interests</h2>
                <p>Choose the areas you would like to explore.</p>
              </div>
            </div>

            <div className="profile-choice-grid">
              {availableInterests.map((interest) => (
                <button
                  type="button"
                  key={interest}
                  className={`profile-choice ${
                    profile.interests.includes(interest) ? 'selected' : ''
                  }`}
                  onClick={() => toggleItem('interests', interest)}
                  aria-pressed={profile.interests.includes(interest)}
                >
                  <span>
                    {profile.interests.includes(interest) ? '✓' : '+'}
                  </span>
                  {interest}
                </button>
              ))}
            </div>
          </section>

          <div className="profile-save-area">
            {message && (
              <p className="profile-message" role="status">
                {message}
              </p>
            )}

            <button className="profile-save-button" type="submit">
              Save My Profile <span>↗</span>
            </button>

            <p>Your profile is saved in this browser on this device.</p>
          </div>
        </form>
      </main>
    </div>
  );
}

export default StudentProfile;