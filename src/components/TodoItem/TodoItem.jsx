import PropTypes from 'prop-types';
import './TodoItem.css';


function TodoItem({ todo, deleteTodo, toggleTodo }) {
    return (
        <li>
            {/* Permet de cliquer sur la tâche pour marquer comme complétée */}
            <span 
                onClick={() => toggleTodo(todo.id)} 
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
                {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
}

// Validation des props avec PropTypes
TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired
};

export default TodoItem;