import React, { useEffect, useState } from 'react';
import { getNotes, deleteNote } from '../api';
import NoteItem from './NoteItem';
import NoteForm from './NoteForm';

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotes(page);
    }, [page]);

    const fetchNotes = (page) => {
        setLoading(true);
        getNotes(page, 10)
            .then(response => {
                const data = response.data;
                setNotes(data || []);
                setTotalPages(Math.ceil((data && data.length) ? data.length / 10 : 1));
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        deleteNote(id).then(() => {
            fetchNotes(page);
        });
    };

    const handleUpdate = () => {
        fetchNotes(page);
    };

    const handleSave = (newNote) => {
        setNotes([newNote, ...notes]);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <NoteForm onSave={handleSave} />
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
                {notes && notes.length > 0 ? (
                    notes.map(note => (
                        <NoteItem key={note.id} note={note} onDelete={handleDelete} onUpdate={handleUpdate} />
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">No notes available</td>
                    </tr>
                )}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i + 1} onClick={() => setPage(i + 1)} disabled={page === i + 1}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default NoteList;
