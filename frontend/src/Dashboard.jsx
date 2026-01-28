import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api.js';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('active');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', category: '' });

  useEffect(() => {
    fetchNotes();
  }, [filter, category]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      let endpoint = '/notes';

      if (filter === 'active') {
        endpoint = '/notes/active';
      } else if (filter === 'archived') {
        endpoint = '/notes/archived';
      }

      if (category) {
        endpoint = `/notes/category/${category}`;
      }

      const response = await api.get(endpoint);
      setNotes(response.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.patch(`/notes/${editingId}`, formData);
      } else {
        await api.post('/notes', formData);
      }
      setFormData({ title: '', content: '', category: '' });
      setEditingId(null);
      setShowForm(false);
      fetchNotes();
    } catch (err) {
      console.error('Error saving note:', err);
    }
  };

  const handleEdit = (note) => {
    setFormData({ title: note.title, content: note.content, category: note.category });
    setEditingId(note.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this note?')) {
      try {
        await api.delete(`/notes/${id}`);
        fetchNotes();
      } catch (err) {
        console.error('Error deleting note:', err);
      }
    }
  };

  const handleToggleArchive = async (id) => {
    try {
      await api.patch(`/notes/${id}/toggle`);
      fetchNotes();
    } catch (err) {
      console.error('Error toggling archive:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>My Notes</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <div className="controls">
        <div className="filters">
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => { setFilter('active'); setCategory(''); }}
          >
            Active
          </button>
          <button
            className={filter === 'archived' ? 'active' : ''}
            onClick={() => { setFilter('archived'); setCategory(''); }}
          >
            Archived
          </button>
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => { setFilter('all'); setCategory(''); }}
          >
            All
          </button>
        </div>

        <input
          type="text"
          placeholder="Filter by category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-filter"
        />

        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ title: '', content: '', category: '' }); }} className="new-btn">
          + New Note
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="note-form">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={4}
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
          <div className="form-buttons">
            <button type="submit">{editingId ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="notes-grid">
          {notes.length === 0 ? (
            <p className="no-notes">No notes found</p>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="note-card">
                <h3>{note.title}</h3>
                {note.category && <span className="category-badge">{note.category}</span>}
                <p>{note.content}</p>
                <div className="note-actions">
                  <button onClick={() => handleEdit(note)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleToggleArchive(note.id)} className="archive-btn">
                    {note.archived ? 'Unarchive' : 'Archive'}
                  </button>
                  <button onClick={() => handleDelete(note.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
