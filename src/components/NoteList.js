import React, { useEffect, useState } from 'react';
import { getNotes, deleteNote } from '../api';
import NoteItem from './NoteItem';
import NoteForm from './NoteForm';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    setLoading(true);
    getNotes()
        .then(response => {
          const data = response.data;
          setNotes(data || []);
          console.log(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
  };

  const handleDelete = (id) => {
    deleteNote(id).then(() => {
      fetchNotes();
    });
  };

  const handleUpdate = () => {
    fetchNotes();
  };

  const handleSave = (newNote) => {
    if (currentNote) {
      setNotes(notes.map(note => (note.id === newNote.id ? newNote : note)));
    } else {
      setNotes([newNote, ...notes]);
    }
    setCurrentNote(null);
  };

  const handleEdit = (note) => {
    setCurrentNote(note);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div>
        <NoteForm note={currentNote} onSave={handleSave} />
        <table className="note-table">
          <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Tags</th>
            <th>Done</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {notes.length > 0 ? (
              notes.map(note => (
                  <NoteItem key={note.id} note={note} onDelete={handleDelete} onUpdate={handleUpdate} onEdit={handleEdit} />
              ))
          ) : (
              <tr>
                <td colSpan="5">No notes available</td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
  );
};

export default NoteList;
