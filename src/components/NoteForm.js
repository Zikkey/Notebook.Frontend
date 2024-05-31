import React, { useState } from 'react';
import { createNote, updateNote } from '../api';

const NoteForm = ({ note, onSave }) => {
    const [title, setTitle] = useState(note ? note.title : '');
    const [description, setDescription] = useState(note ? note.description : '');
    const [tags, setTags] = useState(note ? note.tags : []);
    const [isDone, setIsDone] = useState(note ? note.isDone : false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNote = { title, description, tags, isDone };
        if (note) {
            updateNote({ ...newNote, id: note.id }).then(() => {
                onSave();
            }).catch(error => {
                console.error("There was an error updating the note!", error);
            });
        } else {
            createNote(newNote).then((response) => {
                setTitle('');
                setDescription('');
                setTags([]);
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
                value={tags.join(', ')}
                onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
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
