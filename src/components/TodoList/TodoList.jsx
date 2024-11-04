import PropTypes from 'prop-types';
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';
// Composant pour afficher la liste des tâches
function TodoList({ todos, deleteTodo }) {
    return (
        <ul>
            {/* Boucle sur chaque tâche dans le tableau 'todos', et rend un composant TodoItem pour chaque tâche */}
            {todos.map(todo => (
                <TodoItem 
                    key={todo.id} // Utilisation d'une clé unique pour chaque tâche
                    todo={todo} // Passe la tâche actuelle en tant que prop au composant TodoItem
                    deleteTodo={deleteTodo} // Passe la fonction deleteTodo en prop pour supprimer une tâche
                />
            ))}
        </ul>
    );
}
TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    deleteTodo: PropTypes.func.isRequired
};

export default TodoList;
