import './App.css';
import { useState } from 'react';

import TodoInput from './components/TodoInput/TodoInput';
import TodoList from './components/TodoList/TodoList';
import TodoFilter from './components/TodoFilter/TodoFilter';

function App() {
    // Déclaration de l'état pour stocker les tâches
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    // Fonction pour ajouter une nouvelle tâche
    const addTodo = (text) => {
        // Création d'un objet représentant une tâche avec un identifiant unique, un texte, et un statut non terminé
        const newTodo = { id: Date.now(), text, completed: false };
        // Mise à jour de l'état en ajoutant la nouvelle tâche à la liste existante
        setTodos([...todos, newTodo]);
    };

    // Renommer deleteTodo en markAsDone
    const markAsDone = (id) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: true } : todo
            )
        );
    };

    // Ajouter une nouvelle fonction pour la suppression définitive
    const permanentDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map(todo => 
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // Filtrer les tâches selon le critère sélectionné
    const filteredTodos = todos.filter(todo => {
        switch(filter) {
            case 'completed':
                return todo.completed === true;
            case 'incomplete':
                return todo.completed === false;
            default:
                return true;
        }
    });

    return (
        <div className="App">
            <h1>My ToDo List</h1>
            {/* Composant pour entrer de nouvelles tâches */}
            <TodoInput addTodo={addTodo} />
            {/* Composant pour filtrer les tâches */}
            <TodoFilter filter={filter} setFilter={setFilter} />
            {/* Composant pour afficher et suppprimer des tâches */}
            <TodoList 
                todos={filteredTodos} 
                markAsDone={markAsDone}
                permanentDelete={permanentDelete}
                toggleTodo={toggleTodo}
                showDeleteButton={filter === 'completed'} 
            />
        </div>
    );
}

export default App;

