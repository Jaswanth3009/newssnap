import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { updatePreferences } from '../services/api';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiSave, FiCheck } from 'react-icons/fi';

const ALL_CATEGORIES = ['Technology', 'Sports', 'Business', 'Entertainment', 'Politics', 'Health', 'General'];

const Profile = () => {
  const { user, refreshProfile } = useAuth();
  const [selected, setSelected] = useState(user?.preferences || []);
  const [saving, setSaving] = useState(false);

  const toggleCategory = (cat) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePreferences({ preferences: selected });
      await refreshProfile();
      toast.success('Preferences saved!');
    } catch {
      toast.error('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-display text-2xl font-bold text-white mb-8">Profile & Preferences</h1>

      {/* User Info Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-black text-2xl font-bold">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">{user?.username}</h2>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-xl">
            <FiUser className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Username</p>
              <p className="text-sm text-white">{user?.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-xl">
            <FiMail className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm text-white">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h3 className="text-base font-semibold text-white mb-1">News Preferences</h3>
        <p className="text-sm text-gray-400 mb-5">Select categories you're interested in</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {ALL_CATEGORIES.map((cat) => {
            const active = selected.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  active
                    ? 'bg-amber-500/10 border-amber-500/50 text-amber-400'
                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                }`}
              >
                {cat}
                {active && <FiCheck className="w-4 h-4" />}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <FiSave className="w-4 h-4" />
              Save Preferences
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Profile;
