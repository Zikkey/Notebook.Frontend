import React, { useState, useEffect } from 'react';
import { createNote, updateNote } from '../api';

const NoteForm = ({ note, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
      setTags(note.tags.join(', '));
      setIsDone(note.isDone);
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = { title, description, tags: tags.split(',').map(tag => tag.trim()), isDone };
    if (note) {
      updateNote({ ...newNote, id: note.id }).then(() => {
        onSave({ ...newNote, id: note.id });
      }).catch(error => {
        console.error("There was an error updating the note!", error);
      });
    } else {
      createNote(newNote).then((response) => {
        setTitle('');
        setDescription('');
        setTags('');
        setIsDone(false);
        onSave(response.data);
      }).catch(error => {
        console.error("There was an error creating the note!", error);
      });
    }
  };

  return (
      <form onSubmit={handleSubmit} className="note-form">
        <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
        />
        <label>
          <input
              type="checkbox"
              checked={isDone}
              onChange={(e) => setIsDone(e.target.checked)}
          />
          Done
        </label>
        <button type="submit">{note ? 'Update Note' : 'Add Note'}</button>
      </form>
  );
};

export default NoteForm;
