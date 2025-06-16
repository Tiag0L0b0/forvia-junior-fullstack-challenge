import {useState, useEffect, FormEvent} from 'react';
import {Project} from '../types/project';
import styles from '../styles/home.module.css';


export default function Home() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [form, setForm] = useState({title: '', description: '', status: 'Backlog', techStack: []});
    const [editForm, setEditForm] = useState({title: '', description: '', status: 'Backlog', techStack: []});
    const [editingId, setEditingId] = useState<string | null>(null);


    useEffect(() => {
        fetch('/api/projects')
            .then((r) => r.json())
            .then(setProjects);
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/projects', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...form, techStack: form.techStack.split(',').map((s: string) => s.trim())}),
        });
        if (res.ok) {
            const newProject = await res.json();
            setProjects((prev) => [...prev, newProject]);
            setForm({title: '', description: '', status: 'Backlog', techStack: []});
        }
    };

    const handleEditSubmit = async (e: FormEvent, projectId: string) => {
        e.preventDefault();
        const res = await fetch(`/api/projects/${projectId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...editForm, techStack: editForm.techStack.split(',').map((s: string) => s.trim())}),
        });
        if (res.ok) {
            const updatedProject = await res.json();
            setProjects(prev => prev.map(p =>
                p.id === projectId ? updatedProject : p
            ));
            setEditingId(null);
            setForm({
                title: '',
                description: '',
                status: 'Backlog',
                techStack: []
            });
        }
    };

    const handleDelete = async (projectId: string) => {
        const res = await fetch(`/api/projects/${projectId}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            setProjects(prev => prev.filter(p => p.id !== projectId));
        }
    };



    return (
        <main style={{maxWidth: 600, margin: '0 auto', padding: 16}}>
            <h1>Dev Projects Tracker</h1>

            {/* TODO: Improve the form styling and responsiveness */}

            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        className={styles.input}
                        placeholder="Title"
                        value={form.title}
                        onChange={(e) => setForm({...form, title: e.target.value})}
                        required
                    />
                </div>

                <div className={`${styles.formGroup} ${styles.textareaGroup}`}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        className={styles.textarea}
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) => setForm({...form, description: e.target.value})}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Status:</label>
                    <div className={styles.radioGroup}>
                        <div>
                            <input
                                type="radio"
                                id="backlog"
                                name="status"
                                value="Backlog"
                                checked={form.status === 'Backlog'}
                                onChange={(e) => setForm({...form, status: e.target.value})}
                            />
                            <label htmlFor="backlog">Backlog</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="inProgress"
                                name="status"
                                value="In Progress"
                                checked={form.status === 'In Progress'}
                                onChange={(e) => setForm({...form, status: e.target.value})}
                            />
                            <label htmlFor="inProgress">In Progress</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="completed"
                                name="status"
                                value="Completed"
                                checked={form.status === 'Completed'}
                                onChange={(e) => setForm({...form, status: e.target.value})}
                            />
                            <label htmlFor="completed">Completed</label>
                        </div>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="techStack">Tech Stack:</label>
                    <input
                        id="techStack"
                        className={styles.input}
                        placeholder="Tech stack (comma separated)"
                        value={form.techStack}
                        onChange={(e) => setForm({...form, techStack: e.target.value})}
                    />
                </div>

                <div className={styles.submitGroup}>
                    <div></div>
                    <button type="submit">Add Project</button>
                </div>
            </form>

            <hr className={styles.divider} />


            {projects.map((p) => (
                <div key={p.id}>
                    <div className={styles.projectCard}>
                        <h3>{p.title}</h3>
                        <p>{p.description}</p>
                        <p><strong>Status:</strong> {p.status}</p>
                        <p><strong>Tech:</strong> {p.techStack.join(', ')}</p>
                        <div className={styles.cardButtons}>
                            <button
                                className={styles.editButton}
                                onClick={() => {
                                    setEditingId(p.id);
                                    setEditForm({
                                        title: p.title,
                                        description: p.description,
                                        status: p.status,
                                        techStack: p.techStack.join(', ')
                                    });
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className={styles.deleteButton}
                                onClick={() => handleDelete(p.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>


                    {editingId === p.id && (
                        <form
                            onSubmit={(e) => handleEditSubmit(e, p.id)}
                            className={styles.editForm}
                        >
                            <div className={styles.formGroup}>
                                <label htmlFor={`title-${p.id}`}>Title:</label>
                                <input
                                    id={`title-${p.id}`}
                                    className={styles.input}
                                    placeholder="Title"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                    required
                                />
                            </div>

                            <div className={`${styles.formGroup} ${styles.textareaGroup}`}>
                                <label htmlFor={`description-${p.id}`}>Description:</label>
                                <textarea
                                    id={`description-${p.id}`}
                                    className={styles.textarea}
                                    placeholder="Description"
                                    value={editForm.description}
                                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Status:</label>
                                <div className={styles.radioGroup}>
                                    <div>
                                        <input
                                            type="radio"
                                            id={`backlog-${p.id}`}
                                            name={`status-${p.id}`}
                                            value="Backlog"
                                            checked={editForm.status === 'Backlog'}
                                            onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                                        />
                                        <label htmlFor={`backlog-${p.id}`}>Backlog</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id={`inProgress-${p.id}`}
                                            name={`status-${p.id}`}
                                            value="In Progress"
                                            checked={editForm.status === 'In Progress'}
                                            onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                                        />
                                        <label htmlFor={`inProgress-${p.id}`}>In Progress</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id={`completed-${p.id}`}
                                            name={`status-${p.id}`}
                                            value="Completed"
                                            checked={editForm.status === 'Completed'}
                                            onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                                        />
                                        <label htmlFor={`completed-${p.id}`}>Completed</label>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor={`techStack-${p.id}`}>Tech Stack:</label>
                                <input
                                    id={`techStack-${p.id}`}
                                    className={styles.input}
                                    placeholder="Tech stack (comma separated)"
                                    value={editForm.techStack}
                                    onChange={(e) => setEditForm({...editForm, techStack: e.target.value})}
                                />
                            </div>

                            <div className={styles.buttonGroup}>
                                <button type="submit">Save</button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setEditForm({
                                            title: '',
                                            description: '',
                                            status: 'Backlog',
                                            techStack: ''
                                        });
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            ))}

        </main>
    );
}
