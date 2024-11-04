import { useState } from 'react';
import './TodoInput.css';

import PropTypes from 'prop-types';

// Composant pour saisir une nouvelle tâche
function TodoInput({ addTodo }) {
    // Déclaration de l'état pour stocker le texte de la nouvelle tâche
    const [text, setText] = useState('');

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le rafraîchissement de la page
        if (text) { // Vérifie que le champ de texte n'est pas vide
            addTodo(text); // Appelle la fonction addTodo du composant parent pour ajouter la tâche
            setText(''); // Réinitialise le champ de texte
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Champ de texte pour entrer la tâche */}
            <input 
                type="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)} // Met à jour l'état avec le texte saisi
                placeholder="Add a new task" 
            />
            {/* Bouton pour soumettre la tâche */}
            <button type="submit">Add</button>
        </form>
    );
}
TodoInput.propTypes = {
    addTodo: PropTypes.func.isRequired
};

export default TodoInput;
