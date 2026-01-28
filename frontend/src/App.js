import React, { useEffect, useState } from "react";
import "./App.css";

const BACKEND_URL = "http://localhost:3001/notes"; // Ajusta el puerto si tu backend es otro

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [error, setError] = useState("");
uti
  // Obtener notas desde backend
  const fetchNotes = async () => {
    try {
      let url = showArchived ? `${BACKEND_URL}/archived` : `${BACKEND_URL}/active`;
      if (categoryFilter) url = `${BACKEND_URL}/category/${categoryFilter}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Error al obtener las notas");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [showArchived, categoryFilter]);

  // Crear nota
  const createNote = async (e) => {
    e.preventDefault();
    if (!title) return alert("El título es obligatorio");
    try {
      await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category }),
      });
      setTitle("");
      setContent("");
      setCategory("");
      fetchNotes();
    } catch (err) {
      setError(err.message);
    }
  };

  // Borrar nota
  const deleteNote = async (id) => {
    await fetch(`${BACKEND_URL}/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  // Archivar / desarchivar
  const toggleArchive = async (id) => {
    await fetch(`${BACKEND_URL}/${id}/toggle`, { method: "PATCH" });
    fetchNotes();
  };

  // Categorías únicas para el filtro
  const uniqueCategories = [...new Set(notes.map(n => n.category).filter(Boolean))];

  return (
    <div className="App">
      <h1>📝 Mis Notas</h1>

      {error && <p className="error">{error}</p>}

      {/* Formulario para crear nota */}
      <form className="note-form" onSubmit={createNote}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Agregar Nota</button>
      </form>

      {/* Filtros */}
      <div className="filters">
        <label>
          <input
            type="checkbox"
            checked={showArchived}
            onChange={() => setShowArchived(!showArchived)}
          />
          Mostrar archivadas
        </label>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Lista de notas */}
      <ul className="notes-list">
        {notes.map((note) => (
          <li key={note.id} className={note.archived ? "archived" : ""}>
            <h3>{note.title} {note.category && <em>({note.category})</em>}</h3>
            <p>{note.content}</p>
            <div className="actions">
              <button onClick={() => toggleArchive(note.id)}>
                {note.archived ? "Desarchivar" : "Archivar"}
              </button>
              <button onClick={() => deleteNote(note.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;