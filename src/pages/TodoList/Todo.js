import { useEffect, useRef, useState } from "react";
import { usePrevious } from "../../hooks";


function Todo(props) {
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    const [isEditing, setEditing] = useState(false)
    const [newName, setNewName] = useState('')
    const { name, completed, id, toggleTaskCompleted, deleteTodo, editTodo } = props;

    const wasEditing = usePrevious(isEditing);

    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing])

    const handleChange = (e) => {
        setNewName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editTodo(id, newName);
        setEditing(false);
        setNewName('');
    }

    const handleCancel = () => {
        setEditing(false);
        setNewName('');
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={id}>
                    New name for {name}
                </label>
                <input
                    id={id}
                    className="todo-text"
                    type="text"
                    value={newName}
                    onChange={handleChange}
                    ref={editFieldRef}
                />
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={handleCancel}
                >
                    Cancel
                    <span className="visually-hidden">renaming {name}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    Save <span className="visually-hidden">new name for {name}</span>
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={id}
                    type="checkbox"
                    defaultChecked={completed}
                    onChange={() => toggleTaskCompleted(id)}
                />
                <label className="todo-label" htmlFor={id}>
                    {name}
                </label>
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={() => setEditing(true)}
                    ref={editButtonRef}
                >
                    Edit <span className="visually-hidden">{name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => deleteTodo(id)}
                >
                    Delete <span className="visually-hidden">{name}</span>
                </button>
            </div>
        </div>
    );

    return (
        <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
    )
}

export default Todo