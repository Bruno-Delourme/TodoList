import PropTypes from 'prop-types';
import './TodoItem.css';


function TodoItem({ todo, deleteTodo }) {
    return (
        <li>
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
}

// Validation des props avec PropTypes
TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired,
    deleteTodo: PropTypes.func.isRequired
};

export default TodoItem;