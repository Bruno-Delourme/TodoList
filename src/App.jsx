import './App.css';
import { useState } from 'react';

import TodoInput from './components/TodoInput/TodoInput';
import TodoList from './components/TodoList/TodoList';


function App() {
    // Déclaration de l'état pour stocker les tâches
    const [todos, setTodos] = useState([]);

    // Fonction pour ajouter une nouvelle tâche
    const addTodo = (text) => {
        // Création d'un objet représentant une tâche avec un identifiant unique, un texte, et un statut non terminé
        const newTodo = { id: Date.now(), text, completed: false };
        // Mise à jour de l'état en ajoutant la nouvelle tâche à la liste existante
        setTodos([...todos, newTodo]);
    };

    // Fonction pour supprimer une tâche en filtrant les tâches avec un ID différent de celui de la tâche supprimée
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="App">
            <h1>To-do List</h1>
            {/* Composant pour entrer de nouvelles tâches */}
            <TodoInput addTodo={addTodo} />
            {/* Composant pour afficher la liste des tâches */}
            <TodoList todos={todos} deleteTodo={deleteTodo} />
        </div>
    );
}

export default App;

