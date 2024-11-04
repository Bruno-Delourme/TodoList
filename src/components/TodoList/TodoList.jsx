import PropTypes from 'prop-types';
import './TodoList.css';
// Composant pour afficher la liste des tâches
function TodoList({ todos, markAsDone, permanentDelete, toggleTodo, showDeleteButton }) {
    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                    <span onClick={() => toggleTodo(todo.id)}>
                        {todo.text}
                    </span>
                    {!todo.completed && (
                        <button onClick={() => markAsDone(todo.id)}>
                            Done
                        </button>
                    )}
                    {showDeleteButton && (
                        <button onClick={() => permanentDelete(todo.id)}>
                            Delete
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );
}
TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    markAsDone: PropTypes.func.isRequired,
    permanentDelete: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    showDeleteButton: PropTypes.bool.isRequired
};

export default TodoList;
