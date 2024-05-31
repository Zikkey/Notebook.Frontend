import React from 'react';
import { updateNote } from '../api';

const NoteItem = ({ note, onDelete, onUpdate, onEdit }) => {
    const handleToggleDone = () => {
        updateNote({ ...note, isDone: !note.isDone }).then(() => {
            onUpdate();
        }).catch(error => {
            console.error("There was an error updating the note!", error);
        });
    };

    return (
        <tr className="note-item">
            <td>{note.title}</td>
            <td>{note.description}</td>
            <td>{note.tags.map(tag => <span key={tag} className="badge">{tag}</span>)}</td>
            <td>
                <input
                    type="checkbox"
                    checked={note.isDone}
                    onChange={handleToggleDone}
                />
            </td>
            <td>
                <button onClick={() => onEdit(note)}>Edit</button>
                <button onClick={() => onDelete(note.id)}>Delete</button>
            </td>
        </tr>
    );
};

export default NoteItem;
