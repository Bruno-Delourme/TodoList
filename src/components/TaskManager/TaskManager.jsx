import { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskManager.css';

function TaskManager({ 
    selectedGroup = null, 
    onAddTask, 
    tasks, 
    onDeleteTask, 
    onToggleTask 
}) {
    const [newTask, setNewTask] = useState('');

    // Filtrer les tâches en fonction du groupe sélectionné
    const filteredTasks = selectedGroup 
        ? tasks.filter(task => task.groupId === selectedGroup)
        : tasks;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTask.trim()) {
            onAddTask(newTask.trim());
            setNewTask('');
        }
    };

    return (
        <div className="task-manager">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Nouvelle tâche"
                />
                <button type="submit">Ajouter</button>
            </form>

            <div className="tasks-list">
                {filteredTasks.map(task => (
                    <div key={task.id} className="task-item">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggleTask(task.id)}
                        />
                        <span style={{ 
                            textDecoration: task.completed ? 'line-through' : 'none' 
                        }}>
                            {task.text}
                        </span>
                        <button 
                            onClick={() => onDeleteTask(task.id)}
                            className="delete-task-btn"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

TaskManager.propTypes = {
    selectedGroup: PropTypes.string,
    onAddTask: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    onToggleTask: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
            groupId: PropTypes.string
        })
    ).isRequired
};

export default TaskManager; 