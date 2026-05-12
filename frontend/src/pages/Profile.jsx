import { useEffect, useState } from 'react';
import api from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/auth/profile');

        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          role: response.data.role || user?.role || 'user',
        });
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [user?.role]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const response = await api.put('/auth/profile', {
        name: formData.name,
        email: formData.email,
      });

      updateUser(
        {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role || user?.role || 'user',
        },
        response.data.token
      );

      setFormData((prev) => ({
        ...prev,
        name: response.data.name || prev.name,
        email: response.data.email || prev.email,
        role: response.data.role || prev.role,
      }));

      setSuccess('Display name updated successfully.');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loadingProfile) {
    return <div className="profile-card">Loading profile...</div>;
  }

  const roleLabel = formData.role === 'admin' ? 'Admin / IT Support' : 'User';

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <h1>Account Settings</h1>
          <p>
            Update your display name and review your account access information.
          </p>
        </div>

        {error && <div className="error-text">{error}</div>}
        {success && <div className="success-text">{success}</div>}

        <form onSubmit={handleSubmit} className="ticket-form">
          <div className="form-group">
            <label>Display Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your display name"
              required
            />
            <small className="field-note">
              This is the only profile detail users can update in this version.
            </small>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input value={formData.email} readOnly className="readonly-input" />
            <small className="field-note">
              Email is used for login and cannot be changed from this page.
            </small>
          </div>

          <div className="form-group">
            <label>Role</label>
            <input value={roleLabel} readOnly className="readonly-input" />
            <small className="field-note">
              Role controls system access and can only be managed by the system owner.
            </small>
          </div>

          <button type="submit" className="account-update-btn" disabled={saving}>
            {saving ? 'Updating...' : 'Update Display Name'}
          </button>
        </form>

        <div className="profile-security-box">
          <h3>Password Management</h3>
          <p>
            Password update is not enabled in this version. A secure password-change
            feature should require current password verification before allowing a new
            password to be saved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;