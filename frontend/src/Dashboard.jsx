import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api.js';
import './Dashboard.css';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('active');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', category: '' });
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const params = {};
      if (filter === 'active') params.archived = false;
      if (filter === 'archived') params.archived = true;
      if (category) params.category = category;

      const response = await api.get('/notes', { params });
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, category]);

  const handleCreate = async () => {
    if (!formData.title.trim()) return;

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
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar esta nota?')) {
      try {
        await api.delete(`/notes/${id}`);
        fetchNotes();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleEdit = (note) => {
    setFormData({ title: note.title, content: note.content, category: note.category || '' });
    setEditingId(note.id);
    setShowForm(true);
  };

  const handleToggleArchive = async (id, archived) => {
    try {
      await api.patch(`/notes/${id}`, { archived: !archived });
      fetchNotes();
    } catch (error) {
      console.error('Error toggling archive:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) return <div className="dashboard-container"><p>Cargando...</p></div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Mis Notas</h1>
        <button onClick={handleLogout} className="logout-btn">Salir</button>
      </header>

      <div className="controls">
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Cancelar' : 'Nueva Nota'}
        </button>

        <div className="filters">
          <button
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Activas
          </button>
          <button
            className={filter === 'archived' ? 'active' : ''}
            onClick={() => setFilter('archived')}
          >
            Archivadas
          </button>
          <input
            type="text"
            placeholder="Filtrar por categoría..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      {showForm && (
        <div className="form-container">
          <input
            type="text"
            placeholder="Título..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <textarea
            placeholder="Contenido..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
          <input
            type="text"
            placeholder="Categoría..."
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
          <button onClick={handleCreate} className="btn-primary">
            {editingId ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      )}

      <div className="notes-grid">
        {notes.length === 0 ? (
          <p>No hay notas</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-card">
              <h3>{note.title}</h3>
              {note.category && <span className="category-badge">{note.category}</span>}
              <p>{note.content}</p>
              <div className="note-actions">
                <button onClick={() => handleEdit(note)} className="btn-edit">Editar</button>
                <button onClick={() => handleDelete(note.id)} className="btn-delete">Eliminar</button>
                <button
                  onClick={() => handleToggleArchive(note.id, note.archived)}
                  className="btn-archive"
                >
                  {note.archived ? 'Desarchivar' : 'Archivar'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
