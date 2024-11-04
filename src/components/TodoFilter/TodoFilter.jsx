import PropTypes from 'prop-types';
import './TodoFilter.css';

// Composant de filtre pour les tâches
function TodoFilter({ filter, setFilter }) {
    return (
        <div className="todo-filter">
            {/* Boutons pour sélectionner le filtre */}
            <button 
                onClick={() => setFilter('all')} 
                className={filter === 'all' ? 'active' : ''}
            >
                All
            </button>
            <button 
                onClick={() => setFilter('completed')} 
                className={filter === 'completed' ? 'active' : ''}
            >
                Completed
            </button>
            <button 
                onClick={() => setFilter('incomplete')} 
                className={filter === 'incomplete' ? 'active' : ''}
            >
                Incomplete
            </button>
        </div>
    );
}
TodoFilter.propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired
};


export default TodoFilter;
